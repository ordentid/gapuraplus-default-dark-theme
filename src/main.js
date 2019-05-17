// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import axios from 'axios'
import colors from 'vuetify/es5/util/colors'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import KsVueFullpage from 'ks-vue-fullpage'

import '../node_modules/vuetify/dist/vuetify.min.css'

export default function (Vue, { router, head, isClient, appOptions }) {
  let apiUrl = process.env.GRIDSOME_API_URL

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
  })

  Vue.use(Vuetify, {
    theme: {
      primary: colors.blue.darken2,
      accent: colors.grey.darken3,
      secondary: colors.amber.darken3,
      info: colors.teal.lighten1,
      warning: colors.amber.base,
      error: colors.deepOrange.accent4,
      success: colors.green.accent3
    }
  })
  
  Vue.use(KsVueFullpage)

  Vue.use(Vuex)
  appOptions.store = new Vuex.Store({
    state: {
      meta: {},
      config: {},
      welcomePost: {},
      profilePost: {},
      productPost: {},
      productList: [],
      contactList: [],
    },
    mutations: {
      setMeta(state, val) {
        state.meta = val
      },
      setConfig(state, val) {
        state.config = val
      },
      setWelcomePost(state, val) {
        state.welcomePost = val
      },
      setProfilePost(state, val) {
        state.profilePost = val
      },
      setProductPost(state, val) {
        state.productPost = val
      },
      setProductList(state, val) {
        state.productList = val
      },
      setContactList(state, val) {
        state.contactList = val
      }
    },
    actions: {
      async fetchConfig({commit}, headers) {
        let url = apiUrl + '/api/config'

        try {
          let response = await axios.get(url, {headers: headers})
          commit('setConfig', response.data.data)
        }catch(error) {
          console.log(error)
          return
        }
      },
      async fetchWelcomePost({commit}, headers) {
        let url = apiUrl + '/api/post/type/single/2'
        
        try {
          let response = await axios.get(url, {headers: headers})
          let data = response.data.data

          if (data != null) {
            commit('setWelcomePost', data)
          } else {
            commit('setWelcomePost', {
            id: 1,
            title: 'Default Home',
            html_content: '<p>Hello World!</p><p>Some initial <strong>Home</strong> text</p>',
            cover_image: 'null'
            })
          }
        }catch (error){
          console.log(error)
          return
        }
      },
      async fetchProfilePost({commit}, headers) {
        let url = apiUrl + '/api/post/type/single/3'

        try {
          let response = await axios.get(url, {headers: headers})
          if (response.data.data != null){
            commit('setProfilePost', response.data.data)
          } else {
            commit('setProfilePost', {
              id: 1,
              title: 'Default Profile',
              html_content: '<p>Hello World!</p><p>Some initial <strong>Profile</strong> text</p>',
              cover_image: 'null'
            })
          }
        }catch(error) {
          console.log(error)
          return
        }
      },
      async fetchProductPost({commit}, headers) {
        let url = apiUrl + '/api/post/type/single/4'

        try {
          let response = await axios.get(url, {headers: headers})
          if (response.data.data != null){
            commit('setProductPost', response.data.data)
          } else {
            commit('setProductPost', {
              id: 1,
              title: 'Default Product',
              html_content: '<p>Hello World!</p><p>Some initial <strong>Product</strong> text</p>',
              cover_image: 'null'
            })
          }
        }catch(error) {
          console.log(error)
          return
        }
      },
      async fetchProductList({commit}, params) {
        let page = params.page
        let limit = params.limit
        let url = apiUrl + '/api/product?type=0&orderBy=created_at&page=' + page + '&limit=' + limit

        try {
          let response = await axios.get(url, {headers: params.headers})
          if (response.data.data != null && response.data.data.length > 0){
            commit('setProductList', response.data.data)
            commit('setMeta', response.meta.meta)
          } else {
            let productList = []

            for(let i = 1; i <= limit; i++) {
              productList.push({
                id: i,
                name: 'Default Product ' + i,
                summary: 'Default Summary ' + i,
                image_main: './images/default-icon-' + i + '.png'
              })
            }

            commit('setProductList', productList)
            commit('setMeta', {
              lastPage: page,
              page: page,
              perPage: limit,
              total: limit,
            })
          }
        }catch(error) {
          console.log(error)
        }
      },
      async fetchContactList({commit}, headers) {
        let url = apiUrl + '/api/contact'

        try {
          let response = await axios.get(url, {headers: headers})
          let data = response.data.data

          if (data != null && data.length > 0){
            commit('setContactList', data)
          } else {
            commit('setContactList', [])
          }
        }catch(error) {
          console.log(error)
          return
        }
      }
    }
  })
}
