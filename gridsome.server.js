// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.loadSource(store => {
    // Use the Data store API here: https://gridsome.org/docs/data-store-api
    const Config = store.addContentType('Config')
    const Sections = store.addContentType('Sections')
    const WelcomePost = store.addContentType('WelcomePost')
    const ProfilePost = store.addContentType('ProfilePost')
    const ProductPost = store.addContentType('ProductPost')
    const ProductList = store.addContentType('ProductList')

    Config.addNode({
      title: 'User Config',
      id: 1,
      fields: {
        use_icons: false,
        content_title: 'My Website',
        use_products: true,
        product_section_id: 2,
        use_contacts: true,
        contact_summary: 'For further inquiries, please drop us an email if you like!',
        contact_section_id: 3
      }
    })

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
    Sections.addNode({
      title: 'Product Secition',
      fields: {
        id: 3,
        name: 'products'
      }
    })
    Sections.addNode({
      title: 'Contact Section',
      fields: {
        id: 4,
        name: 'contacts'
      }
    })

    WelcomePost.addNode({
      title: 'Welcome Post',
      fields: {
        title: 'Welcome',
        content: '<p>Hello World!</p><p>Some initial <strong>bold</strong> text</p><p><br></p><p>pancen oye~~~~~</p>',
        cover_image: 'http://newschoolkaidan.com/wp-content/uploads/2018/04/pyxis-profile-20180406.jpg'
      }
    })

    ProfilePost.addNode({
      title: 'Profile Post',
      fields: {
        title: 'About Us',
        content: '<p>Hello World!</p><p>Some initial <strong>bold</strong> text</p><p><br></p><p>pancen oye~~~~~</p>',
        cover_image: 'https://vignette.wikia.nocookie.net/jpop/images/f/ff/Pikkushi.jpg/revision/latest?cb=20181005082741'
      }
    })
  })
}
