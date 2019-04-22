# Gapura+ Default Dark Theme

This is a default dark theme for Gapura+, build using Gridsome. This guidelines is for creating a new standard theme for Gapura+.

### 1. Gridsome Overview

Gridsome is a static site renderer framework, that made to work with Vue.JS. Gridsome consist of server side process, and client side process. Gridsome server side is tasked to generate static html site from `.vue` files, and the main file for server side processing is `gridsome.server.js`. As for Gridsome client side, it is tasked to do any process inside the client, mainly put in `.vue` files, and also `main.js` file.

### 2. Install Gridsome CLI tool if you don't have

`npm install --global @gridsome/cli`

### 3. Create a Gridsome project

1. `gridsome create my-gridsome-site` to install default starter
2. `cd my-gridsome-site` to open the folder
3. `gridsome develop` to start a local dev server at `http://localhost:8080`

### 4. Gapura+ Environment Variable

Gapura+ utilizes Environment Variables to define some default settings like API Url and Project ID. These variables are defined when user is creating a new subscription. The Variables are separated by server side and client side.
- Server Side Env
  - API_URL
  - PROJECT_ID
  
- Client Side Env
  - GRIDSOME_API_URL
  - GRIDSOME_PROJECT_ID
  - GRIDSOME_SITE_TITLE

Client Side Env is used inside `.vue` files or `main.js` file, and Server Side Env is used inside `gridsome.server.js`

### 5. Gapura+ Server Side Config

Gapura+ config for default theme consist of:
```
{
  site_title: string, // Title for the site
  home_title: string, // Title for page main menu. if use_icons value is false, it consist of text, and locations of icons if use_icons is true
  use_icons: boolean, // Flags for indicating if home_title value is an image source, or text only
  use_profiles: boolean, // Flags for indicating that user is adding profile page for the themes
  use_products: boolean, // Flags for indicating that user is adding product page for the themes
  use_articles: boolean, // Flags for indicating that user is adding articles or blog page for the themes
  use_contacts: boolean, // Flags for indicating that user is adding contact page for the themes
  profile_menu: string, // Text for profile menu button
  product_menu: string, // Text for product menu button
  article_menu: string, // Text for article menu button
  contact_menu: string, // Text for contact menu button
  email: string // email for contact us button
}
```

You can get this config by calling making request to `gapuraplus-public-api`.
```
{
  method: GET
  api_url: /api/config
  headers: {
    Project-ID: insert-project-id-value
  }
}
```

To use these config inside `.vue` files, you need to add the config to Gridsome's Embedded GraphQL. You can add the content to GraphQL like this: 

```
api.loadSource(async store => {
  const Config = store.addContentType('Config')
  
  Config.addNode({
    title: 'User Config',
    id: 1,
    fields: {
      use_icons: configData.use_icons,
      site_title: configData.site_title,
      use_products: configData.use_products,
      product_section_id: productSectionId,
      use_contacts: configData.use_contacts,
      contact_summary: 'For further inquiries, please drop us an email if you like!',
      contact_section_id: contactSectionId,
      mail_link: 'mailto:' + configData.email
    }
  })
})
```

`id` field is quite mandatory, since we need the `id` when we make query to GraphQL. Since the config is only one per theme, we put default `id` with value `1`.

And when you want to access this config in `.vue` files, you need to add `<page-query>` inside the files. The `<page-query>` looks similar like this:

```
  <page-query>
    query getConfigData {
      config: config(id:"1") {
        title
        id
        useIcons
        siteTitle
        useProducts
        productSectionId
        useContacts
        contactSummary
        contactSectionId
        mailLink
      }
    }
  </page-query>
```
After adding the `<page-query>`, you can access the config with `this.$page.config`

### 5. Data API

Even though the page was generated statically, we need to fetch the data dynamically via api. Since i think there's currently no way for gridsome dynamically rehydrates the page from client, only possible from build. 

You can get the data by making requests to API like this:
```
{
  method: GET,
  url: API_URL,
  headers: {
    Project-ID:
  }
}
```

and currently available API_URL value was this:
```
Post List: /api/post
Welcome Post: /api/post/type/single/2
Profile Post: /api/post/type/single/3
Product Summary Post: /api/post/type/single/4
Product List: /api/product
Contact List: /api/contact
```

