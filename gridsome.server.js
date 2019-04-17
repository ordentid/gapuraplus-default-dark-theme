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

    const headers = {
      'Project-ID': projectId
    }

    let getConfigUrl = apiUrl + '/api/config'

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

      if (configData != null){
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
  })
}
