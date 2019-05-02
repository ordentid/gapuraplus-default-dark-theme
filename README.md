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

