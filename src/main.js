// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import colors from 'vuetify/es5/util/colors'
import Vuetify from 'vuetify'
import KsVueFullpage from 'ks-vue-fullpage'

import '../node_modules/vuetify/dist/vuetify.min.css'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
  })

  console.log(head.meta)

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
}
