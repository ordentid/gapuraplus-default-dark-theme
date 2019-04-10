// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require('axios')

module.exports = function (api) {
  api.loadSource(async store => {
    // Use the Data store API here: https://gridsome.org/docs/data-store-api
    const projectId = process.env.PROJECT_ID
    const apiUrl = process.env.API_URL

    const Config = store.addContentType('Config')
    const Sections = store.addContentType('Sections')
    const WelcomePost = store.addContentType('WelcomePost')
    const ProfilePost = store.addContentType('ProfilePost')
    const ProductPost = store.addContentType('ProductPost')
    const ProductList = store.addContentType('ProductList')

    const headers = {
      'Project-ID': projectId
    }

    let getConfigUrl = apiUrl + '/api/config'
    let getWelcomePostUrl = apiUrl + '/api/post/type/single/2'
    let getProfilePostUrl = apiUrl + '/api/post/type/single/3'
    let getProductPostUrl = apiUrl + '/api/post/type/single/4'
    let getProductListUrl = apiUrl + '/api/product?page=1&limit=6'

    try {
      let sectionId = 1
      let productSectionId = 0
      let contactSectionId = 0

      let configData = await axios.get(getConfigUrl, {headers: headers})
      configData = configData.data.data

      Sections.addNode({
        title: 'Home Section',
        fields: {
          id: 1,
          name: 'home'
        }
      })
      Sections.addNode({
        title: 'Profile Section',
        fields: {
          id: 2,
          name: 'profile'
        }
      })

      if (configData.use_products){
        sectionId++
        productSectionId = sectionId

        Sections.addNode({
          title: 'Product Secition',
          fields: {
            id: productSectionId + 1,
            name: 'products'
          }
        })

        try {
          let productPost = await axios.get(getProductPostUrl, {headers: headers})
          productPost = productPost.data.data

          if (productPost != null && productPost != undefined && productPost.id != null){
            ProductPost.addNode({
              fields: {
                id: 1,
                title: productPost.title,
                content: productPost.html_content,
                cover_image: productPost.cover_image != null ? productPost.cover_image : 'null'
              }
            })
          } else {
            ProductPost.addNode({
              fields: {
                id: 1,
                title: 'Default Product',
                content: '<p>Hello World!</p><p>Some initial <strong>default</strong> text</p>',
                cover_image: 'null'
              }
            })
          }

          let productList = await axios.get(getProductListUrl, {headers: headers})
          productList = productList.data.data

          if (productList != null && productList != undefined && productList.length > 0){
            productList.forEach(product => {
              ProductList.addNode({
                fields: {
                  id: product.id,
                  as_icon: product.as_icon,
                  image_main: product.image_main != null ? product.image_main : 'null',
                  name: product.name,
                  summary: product_summary
                }
              })
            });
          } else {
            for (i = 0; i < 6; i++){
              ProductList.addNode({
                fields: {
                  id: i,
                  as_icon: true,
                  image_main: 'null',
                  name: 'Default Product Item',
                  summary: 'Default Product item summary'
                }
              })
            }
          }
        } catch(error){
          console.log(error)
        }
      }

      if (configData.use_contacts){
        sectionId++
        contactSectionId = sectionId

        Sections.addNode({
          title: 'Contact Section',
          fields: {
            id: contactSectionId + 1,
            name: 'contacts'
          }
        })
      }

      if (configData != null && configData != null){
        Config.addNode({
          title: 'User Config',
          id: 1,
          fields: {
            use_icons: configData.use_icons,
            content_title: configData.site_title,
            use_products: configData.use_products,
            product_section_id: productSectionId,
            use_contacts: configData.use_contacts,
            contact_summary: 'For further inquiries, please drop us an email if you like!',
            contact_section_id: contactSectionId
          }
        })
      } else {
        Config.addNode({
          title: 'User Config',
          id: 1,
          fields: {
            use_icons: false,
            content_title: 'null',
            use_products: false,
            product_section_id: 0,
            use_contacts: false,
            contact_summary: 'null',
            contact_section_id: 0
          }
        })
      }     
    } catch(error) {
      console.log(error)
    }


    try {
      let welcomePostData = await axios.get(getWelcomePostUrl, {headers: headers})
      welcomePostData = welcomePostData.data.data

      if (welcomePostData != null && welcomePostData != undefined){
        WelcomePost.addNode({
          fields: {
            id: 1,
            title: welcomePostData.title,
            content: welcomePostData.html_content,
            cover_image: welcomePostData.cover_image != null ? welcomePostData.cover_image : 'null'
          }
        })
      } else {
        WelcomePost.addNode({
          fields: {
            id: 1,
            title: 'Default Welcome',
            content: '<p>Hello World!</p><p>Some initial <strong>default</strong> text</p>',
            cover_image: 'null'
          }
        })
      }
    } catch(error) {
      console.log(error)
    }

    try {
      let profilePostData = await axios.get(getProfilePostUrl, {headers: headers})
      profilePostData = profilePostData.data.data

      if (profilePostData != null && profilePostData != undefined){
        ProfilePost.addNode({
          fields: {
            id: 1,
            title: profilePostData.title,
            content: profilePostData.html_content,
            cover_image: profilePostData.cover_image != null ? profilePostData.cover_image : 'null'
          }
        })
      } else {
        ProfilePost.addNode({
          fields: {
            id: 1,
            title: 'Default Profile',
            content: '<p>Hello World!</p><p>Some initial <strong>default</strong> text</p>',
            cover_image: 'null'
          }
        })
      }
    } catch(error){
      console.log(error)
    }
  })
}
