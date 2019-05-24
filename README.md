# Gapura+ Default Dark Theme

This is a default dark theme for Gapura+, build using Gridsome. This guidelines is for creating a new standard theme for Gapura+.

## Installing Theme
If you want to try this theme locally, you can do that by do the following:

1. Clone this repo to your environment with `git clone https://github.com/ordentid/gapuraplus-default-dark-theme/`.
2. Change directory to the root project
3. `npm install` to install all of the dependency of the project
4. `gridsome develop` to run this project locally, or `gridsome build` to build this project and get the static HTML files.

## Customizing Theme
You can customize this theme, or even create a completely brand new for your Gapura site. Following steps are your guide to how create a custom theme in Gapura platform.

### 1. Gridsome Overview

Gridsome is a static site renderer framework, that made to work with Vue.JS. Gridsome consist of server side process, and client side process. Gridsome server side is tasked to generate static html site from `.vue` files, and the main file for server side processing is `gridsome.server.js`. As for Gridsome client side, it is tasked to do any process inside the client, mainly put in `.vue` files, and also `main.js` file.

### 2. Install Gridsome CLI tool if you don't have

`npm install --global @gridsome/cli`

### 3. Create a Gridsome project

1. `gridsome create my-gridsome-site` to install default starter
2. `cd my-gridsome-site` to open the folder
3. `gridsome develop` to start a local dev server at `http://localhost:8080`

### 4. Gapura+ Environment Variable

Gapura+ utilizes Environment Variables to define some default settings like API Url and Project ID. These variables are defined when user is creating a new subscription. The Variables are separated by server side and client side. Currently, Gapura only supporting Client-Side variables. Those variables are:
  
- Client Side Env
  - GRIDSOME_API_URL
  - GRIDSOME_PROJECT_ID
  - GRIDSOME_SITE_TITLE

Client Side Env is used inside `.vue` files or `main.js` file, and Server Side Env is used inside `gridsome.server.js`

### 5. Gapura+ Site Config
Site Config is used to determine what modules is accessible for user,and config is set up inside Gapura+ Dashboard. Current config consist of:
- Home Module
  - use_home: determine if user is using Home Page or not
  - use_home_icon: true if user set icon as button instead of text
  - home_menu: title for home button
  - home_icon: icon of home button. URL string of icon location
- Blog Module
  - use_articles: determine if user is adding Article Page or not
  - article_menu: title for article page button
- Profile Menu
  - use_profiles: determine if user is adding Profile Page or not
  - profile_menu: title for profile menu button
- Product Menu
  - use_products: determine if user is adding Product Page or not
  - product_menu: title for product menu button
- Contact Menu
  - use_contacts: determine if user is adding Contact Page or not
  - contact_menu: title for contact menu button

These config can differs from theme to theme, e.g in Default Theme, the Blog Module is not supported, so the config value might be null.

### 6. Gapura Contact Type
Gapura currently offers some contact types, to be implemented inside your theme. Supported contacts right now are:

```
[
    {
        "id": "social_media",
        "name": "Media Sosial"
    },
    {
        "id": "address",
        "name": "Alamat"
    },
    {
        "id": "operational_hour",
        "name": "Jam Operasional"
    },
    {
        "id": "location",
        "name": "Lokasi"
    }
]
```

You can get these data by accessing Contact API below.

### 6. Data API

Even though the page was generated statically, we need to fetch the data dynamically via api. Since i think there's currently no way for gridsome dynamically rehydrates the page from client, only possible from build. 

You can get the data by making requests to API like this:
```
{
  method: GET,
  url: API_URL,
  headers: {
    Project-ID: GRIDSOME_PROJECT_ID
  }
}
```

and currently available API_URL value was this:
```
Site Config: /api/config
Post List: /api/post
Welcome Post: /api/post/type/single/2
Profile Post: /api/post/type/single/3
Product Summary Post: /api/post/type/single/4
Product List: /api/product
Contact List: /api/contact
```

## Add Theme to Gapura Theme List

### For Developer

1. Upload your theme to online git repository, preferred GitHub.
2. Make sure your repository is set as public
3. Send your repository url via email to rachmat@ordent.co with subject [Gapura Theme - {THEME_NAME}], and content of your email consist of:
  - Repository Url
  - Short Description of your theme
  - Desirable contact type (social media, location, operational hour, address)
  - Default config (which page you used, e.g Home, Profile, Product, Contact)
4. Wait until you get confirmation from our admin

### For Admin

1. Fork theme repository tou ordent or your own repository
2. Make sure you have access to Ordent Google Source Repository
3. Head to `gapuraplus` project, and select `Source Repositories` from side menu
4. Make sure you have the correct project in Source Repository, which is `gapuraplus`
5. Click button `Add Repository` and then select `Connect External Repository` from selection
6. Make sure you have the correct project inside `Project` drop down. Then, select git repositories and select github
7. Checklist checkbox `I Authorized...` and then click `Connect to Github`
8 List of project will appear. Select your forked theme repo from the list. if you are not connected to the correct account, click `Connect to different account` button.
9. After selecting the correct repository, click `Connect selected repository` button.
10. If successfull, the new project will appear in repository list of Google Cloud Source Repository.
11. Made POST Request via Postman with `https://api-dot-gapuraplus.appspot.com/api/dashboard/theme/upsert` as endpoint
12. Make sure body consist of these values:
```
{
  name: string (mandatory),
  type: string (mandatory),
  repo_name: string (mandatory, copy paste the repo name from Cloud Resource Repository),
  contact_type: json (mandatory),
  default_config: json (mandatory),
  summary: string (optional)
}
```
13. if your request is successfull, the theme will appear in Gapura Theme List
