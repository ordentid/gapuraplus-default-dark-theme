<template>
  <v-flex
    xs12
    pa-0
    ma-0
  >
  <div id="app">
    <ksvuefp :options="options" :sections="sections">
       <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app dark floating class="hidden-sm-and-up" width="225px">
         <v-layout column wrap fill-height align-end justify-center>
          <v-list>
            <div v-for="(menu, i) in sideMenu" :key="i">
              <v-list-tile @click.prevent="$ksvuefp.$emit('ksvuefp-nav-click', {nextIndex: menu.section_id})" @click="drawer = false" class="my-3">
                  <v-list-tile-content>
                      <v-list-tile-title v-text="menu.name" justify-end/>
                  </v-list-tile-content>
              </v-list-tile>
            </div>
          </v-list>
         </v-layout>
      </v-navigation-drawer>
      <v-toolbar
        :color="'#1C1B20'"
        :clipped-left="clipped"
        fixed
        app
        flat
        height='70%'
        class="hidden-sm-and-down pa-0"
      >
        <v-layout xs12 justify-center align-center>
          <v-toolbar-side-icon @click="drawer = !drawer" class="hover hidden-sm-and-up" style="color: whitesmoke;"/>
          <template v-if="config.useIcons">
            <v-btn
              icon
              @click.stop="miniVariant = !miniVariant"
            >
              <v-icon>{{ `chevron_${miniVariant ? 'right' : 'left'}` }}</v-icon>
            </v-btn>
          </template>
          <template v-else>
            <v-toolbar-title class="title default-color mr-5" @click.prevent="$ksvuefp.$emit('ksvuefp-nav-click', {nextIndex: 0})">{{ config.siteTitle }}</v-toolbar-title>
          </template>
          <v-btn flat depressed color="white" @click.prevent="$ksvuefp.$emit('ksvuefp-nav-click', {nextIndex: 1})" class="hidden-sm-and-down">
            TENTANG KAMI
          </v-btn>
          <template v-if="config.useProducts">
            <v-btn flat depressed color="white" @click.prevent="$ksvuefp.$emit('ksvuefp-nav-click', {nextIndex: config.productSectionId})" class="hidden-sm-and-down">
              PRODUK
            </v-btn>
          </template>
           <template v-if="config.useContacts">
            <v-btn flat depressed color="white" @click.prevent="$ksvuefp.$emit('ksvuefp-nav-click', {nextIndex: config.contactSectionId})" class="hidden-sm-and-down">
              HUBUNGI KAMI
            </v-btn>
          </template>
        </v-layout>
      </v-toolbar>
      <v-toolbar
        :color="'#1C1B20'"
        :clipped-left="clipped"
        fixed
        app
        flat
        class="hidden-sm-and-up"
      >
        <v-layout xs12 justify-left align-center>
          <v-toolbar-side-icon @click="drawer = !drawer" class="hover hidden-sm-and-up" style="color: whitesmoke;"/>
          <template v-if="config.useIcons">
            <v-btn
              icon
              @click.stop="miniVariant = !miniVariant"
            >
              <v-icon>{{ `chevron_${miniVariant ? 'right' : 'left'}` }}</v-icon>
            </v-btn>
          </template>
          <template v-else>
            <v-toolbar-title class="title default-color" @click.prevent="$ksvuefp.$emit('ksvuefp-nav-click', {nextIndex: 0})">{{ config.siteTitle }}</v-toolbar-title>
          </template>
        </v-layout>
      </v-toolbar>
        <ksvuefp-section
          v-for="(s,index) in sections"
          :section="s"
          :key="s.node.id"
          :section-index="index"
        >
          <template v-if="s.node.id % 2 == 1">
            <v-layout fluid fill-height fill-width ma-0 pt-5 odd-content>
              <template v-if="!isLoading">
              <template v-if="s.node.name == 'home'">
                <v-parallax
                  dark
                  :src="welcomePost.coverImage"
                  class="cover-image-full hidden-sm-and-down"
                  height="100%">
                    <v-layout column wrap justify-center align-center>
                      <span class="display-3 font-weight-strong mb-5">{{ welcomePost.title}}</span>
                      <span class="subheading text-xs-center" v-html="welcomePost.content" />
                    </v-layout>
                </v-parallax>
                <v-parallax
                  dark
                  :src="welcomePost.coverImage"
                  class="cover-image-full hidden-sm-and-up"
                  height="100%">
                    <v-layout column wrap justify-center align-center>
                      <span class="display-1 font-weight-strong mb-5">{{ welcomePost.title}}</span>
                      <span class="subheading text-xs-center" v-html="welcomePost.content" />
                    </v-layout>
                </v-parallax>
              </template>
              <template v-if="s.node.name == 'profile'">
                <v-layout row class="hidden-sm-and-down">
                  <v-layout column wrap justify-left align-left pl-4 pt-5>
                    <span class="display-3 font-weight-strong mb-5">{{ profilePost.title}}</span>
                    <span class="subheading" v-html="profilePost.content" />
                  </v-layout>
                  <v-parallax
                    dark
                    :src="profilePost.coverImage"
                    class="cover-image-not-full"
                    height="100%" />
                </v-layout>
                <v-layout column class="hidden-sm-and-up">
                  <v-parallax
                    dark
                    :src="profilePost.coverImage"
                    class="cover-image-not-full-mobile"
                    height="200px"/>
                  <v-layout column wrap justify-center px-0 pt-0>
                    <span class="display-1 font-weight-strong mb-5">{{ profilePost.title}}</span>
                    <span class="subheading" v-html="profilePost.content" />
                  </v-layout>
                </v-layout>
              </template>
              <template v-if="s.node.name == 'products' && config.useProducts">
                <v-layout column fluid justify-center class="hidden-sm-and-down">
                  <span class="display-1 text-xs-center font-weight-strong pt-4">{{ productPost.title}}</span>
                  <span class="body-1 text-xs-center pt-4 mb-3" v-html="productPost.content"></span>
                  <v-container fluid layout align-center>
                    <v-layout row wrap product-detail justify-center fill-height fill-width align-start pl-3 style="overflow: hidden;">
                      <v-flex
                        xs3 md3 lg3 sm6 fill-width pb-2 pt-2 px-2 mx-1
                        v-for="product in productList"
                        :items="product"
                        v-bind:key="product.id">
                          <v-card tile flat color="#1C1B20" style="color: whitesmoke;">
                            <v-layout row wrap justify-center align-start fill-height>
                              <v-flex xs2>
                                <v-img :src="product.imageMain" max-height="100px" max-width="100px"/>
                              </v-flex>
                              <v-flex xs7>
                                <v-layout column wrap>
                                  <span class="body-2 text-xs-left text-xs-middle font-weight-strong ml-2 mb-1">{{ product.name}}</span>
                                  <span class="caption text-xs-left text-xs-middle ml-2">{{ product.summary }}</span>
                                </v-layout>
                              </v-flex>
                            </v-layout>
                          </v-card>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-layout>
                <v-layout column fluid justify-center class="hidden-sm-and-up">
                  <span class="display-1 text-xs-center font-weight-strong pt-2">{{ productPost.title}}</span>
                  <span class="body-1 text-xs-center pt-2 mb-2" v-html="productPost.content"></span>
                  <v-container fluid layout align-center pa-0 ma-0>
                    <v-layout row wrap product-detail justify-center fill-height fill-width align-start pl-0 style="overflow: hidden;">
                      <v-flex
                        xs3 md3 lg3 sm6 fill-width pb-2 pt-2 px-2 mx-1
                        v-for="product in productList"
                        :items="product"
                        v-bind:key="product.id">
                          <v-card tile flat color="#1C1B20" style="color: whitesmoke;" class="hidden-sm-and-up">
                            <v-layout column wrap justify-center align-start fill-height>
                              <v-flex xs12 class="layout fill-width">
                                <v-img :src="product.imageMain" height="50px" width="50px"/>
                              </v-flex>
                              <v-flex xs12>
                                <v-layout column wrap>
                                  <span class="body-2 text-xs-center text-xs-middle font-weight-strong mt-2">{{ product.name}}</span>
                                </v-layout>
                              </v-flex>
                            </v-layout>
                          </v-card>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-layout>
              </template>
              <template v-if="s.node.name == 'contacts'">
                <v-container fluid fill-height pa-0 fill-width>
                  <v-layout column wrap fill-width align-start ma-0 pt-3 hidden-sm-and-down>
                    <v-toolbar color="#1C1B20" flat fill-width depressed mt-5 style="color:whitesmoke; position: relative;">
                      <v-layout xs12 row wrap fill-width justify-center>
                        <v-toolbar-title class="title strong text-xs-header mr-5 pr-5" v-text="'Send email to us for further inquiry'" />
                        <v-toolbar-items class="ml-5 pl-5">
                          <v-btn :href="config.mailLink">Contact Us</v-btn>
                        </v-toolbar-items>
                      </v-layout>
                    </v-toolbar>
                    <v-layout row wrap fill-width align-center justify-center>
                      <template v-for="(contact, i) in contactList">
                        <v-avatar size="44px" :key="i" color="grey" class="mx-3 clickable" @click="goToLink(contact.value)">
                          <v-img :src="contact.iconSrc" max-height="30" max-width="30"></v-img>
                        </v-avatar>
                      </template>
                    </v-layout>
                    <v-toolbar color="#1C1B20" flat fill-width depressed height="60" style="color:whitesmoke;">
                      <v-layout xs12 row wrap fill-width justify-center>
                        <v-toolbar-title class="body-2" v-text="'Created by Ordent'" />
                      </v-layout>
                    </v-toolbar>
                  </v-layout>
                  <v-layout column wrap fill-width fill-height align-start ma-0 pt-2 hidden-sm-and-up>
                    <v-toolbar color="#1C1B20" flat depressed style="color:whitesmoke;" class="py-1">
                      <v-layout xs12 column wrap fill-width justify-center>
                        <v-toolbar-title class="subheading strong text-xs-center pb-2" v-text="'Send email to us for further inquiry'" />
                        <v-toolbar-items class="justify-center pb-3">
                          <v-btn :href="config.mailLink">Contact Us</v-btn>
                        </v-toolbar-items>
                      </v-layout>
                    </v-toolbar>
                    <v-layout row wrap fill-width align-center justify-center>
                      <template v-for="(contact, i) in contactList">
                        <v-avatar size="44px" :key="i" color="grey" class="mx-3 clickable" @click="goToLink(contact.value)">
                          <v-img :src="contact.iconSrc" max-height="30" max-width="30"></v-img>
                        </v-avatar>
                      </template>
                    </v-layout>
                    <v-toolbar color="#1C1B20" flat fill-width depressed height="60" style="color:whitesmoke;">
                      <v-layout xs12 row wrap fill-width justify-center>
                        <v-toolbar-title class="caption" v-text="'Created by Ordent'" />
                      </v-layout>
                    </v-toolbar>
                  </v-layout>
                </v-container>
              </template>
              </template>
          </v-layout>
          </template>
          <template v-else>
            <v-layout fluid fill-height fill-width ma-0 pt-5 even-content>
              <template v-if="!isLoading">
              <template v-if="s.node.name == 'home'">
                <v-parallax
                  dark
                  :src="welcomePost.coverImage"
                  class="cover-image-full hidden-sm-and-down"
                  height="100%">
                    <v-layout column wrap justify-center align-center>
                      <span class="display-3 font-weight-strong mb-5">{{ welcomePost.title}}</span>
                      <span class="subheading text-xs-center" v-html="welcomePost.content" />
                    </v-layout>
                </v-parallax>
                <v-parallax
                  dark
                  :src="welcomePost.coverImage"
                  class="cover-image-full hidden-sm-and-up"
                  height="100%">
                    <v-layout column wrap justify-center align-center>
                      <span class="display-1 font-weight-strong mb-5">{{ welcomePost.title}}</span>
                      <span class="subheading text-xs-center" v-html="welcomePost.content" />
                    </v-layout>
                </v-parallax>
              </template>
              <template v-if="s.node.name == 'profile'">
                <v-layout row class="hidden-sm-and-down">
                  <v-layout column wrap justify-left align-left pl-4 pt-5>
                    <span class="display-3 font-weight-strong mb-5">{{ profilePost.title}}</span>
                    <span class="subheading" v-html="profilePost.content" />
                  </v-layout>
                  <v-parallax
                    dark
                    :src="profilePost.coverImage"
                    class="cover-image-not-full"
                    height="100%" />
                </v-layout>
                <v-layout column class="hidden-sm-and-up">
                  <v-parallax
                    dark
                    :src="profilePost.coverImage"
                    class="cover-image-not-full-mobile"
                    height="200px"/>
                  <v-layout column wrap justify-center px-0 pt-0>
                    <span class="display-1 font-weight-strong mb-5">{{ profilePost.title}}</span>
                    <span class="subheading" v-html="profilePost.content" />
                  </v-layout>
                </v-layout>
              </template>
              <template v-if="s.node.name == 'products' && config.useProducts">
                <v-layout column fluid justify-center class="hidden-sm-and-down">
                  <span class="display-1 text-xs-center font-weight-strong pt-4">{{ productPost.title}}</span>
                  <span class="body-1 text-xs-center pt-4 mb-3" v-html="productPost.content"></span>
                  <v-container fluid layout align-center>
                    <v-layout row wrap product-detail justify-center fill-height fill-width align-start pl-3 style="overflow: hidden;">
                      <v-flex
                        xs3 md3 lg3 sm6 fill-width pb-2 pt-2 px-2 mx-1
                        v-for="product in productList"
                        :items="product"
                        v-bind:key="product.id">
                          <v-card tile flat color="#1C1B20" style="color: whitesmoke;">
                            <v-layout row wrap justify-center align-start fill-height>
                              <v-flex xs2>
                                <v-img :src="product.imageMain" max-height="100px" max-width="100px"/>
                              </v-flex>
                              <v-flex xs7>
                                <v-layout column wrap>
                                  <span class="body-2 text-xs-left text-xs-middle font-weight-strong ml-2 mb-1">{{ product.name}}</span>
                                  <span class="caption text-xs-left text-xs-middle ml-2">{{ product.summary }}</span>
                                </v-layout>
                              </v-flex>
                            </v-layout>
                          </v-card>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-layout>
                <v-layout column fluid justify-center class="hidden-sm-and-up">
                  <span class="display-1 text-xs-center font-weight-strong pt-2">{{ productPost.title}}</span>
                  <span class="body-1 text-xs-center pt-2 mb-2" v-html="productPost.content"></span>
                  <v-container fluid layout align-center pa-0 ma-0>
                    <v-layout row wrap product-detail justify-center fill-height fill-width align-start pl-0 style="overflow: hidden;">
                      <v-flex
                        xs3 md3 lg3 sm6 fill-width pb-2 pt-2 px-2 mx-1
                        v-for="product in productList"
                        :items="product"
                        v-bind:key="product.id">
                          <v-card tile flat color="#1C1B20" style="color: whitesmoke;" class="hidden-sm-and-up">
                            <v-layout column wrap justify-center align-start fill-height>
                              <v-flex xs12 class="layout fill-width">
                                <v-img :src="product.imageMain" height="50px" width="50px"/>
                              </v-flex>
                              <v-flex xs12>
                                <v-layout column wrap>
                                  <span class="body-2 text-xs-center text-xs-middle font-weight-strong mt-2">{{ product.name}}</span>
                                </v-layout>
                              </v-flex>
                            </v-layout>
                          </v-card>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-layout>
              </template>
              <template v-if="s.node.name == 'contacts'">
                <v-container fluid fill-height pa-0 fill-width>
                  <v-layout column wrap fill-width align-start ma-0 pt-3 hidden-sm-and-down>
                    <v-toolbar color="#1C1B20" flat fill-width depressed mt-5 style="color:whitesmoke; position: relative;">
                      <v-layout xs12 row wrap fill-width justify-center>
                        <v-toolbar-title class="title strong text-xs-header mr-5 pr-5" v-text="'Send email to us for further inquiry'" />
                        <v-toolbar-items class="ml-5 pl-5">
                          <v-btn :href="config.mailLink">Contact Us</v-btn>
                        </v-toolbar-items>
                      </v-layout>
                    </v-toolbar>
                    <v-layout row wrap fill-width align-center justify-center>
                      <template v-for="(contact, i) in contactList">
                        <v-avatar size="44px" :key="i" color="grey" class="mx-3 clickable" @click="goToLink(contact.value)">
                          <v-img :src="contact.iconSrc" max-height="30" max-width="30"></v-img>
                        </v-avatar>
                      </template>
                    </v-layout>
                    <v-toolbar color="#1C1B20" flat fill-width depressed height="60" style="color:whitesmoke;">
                      <v-layout xs12 row wrap fill-width justify-center>
                        <v-toolbar-title class="body-2" v-text="'Created by Ordent'" />
                      </v-layout>
                    </v-toolbar>
                  </v-layout>
                  <v-layout column wrap fill-width fill-height align-start ma-0 pt-2 hidden-sm-and-up>
                    <v-toolbar color="#1C1B20" flat depressed style="color:whitesmoke;" class="py-1">
                      <v-layout xs12 column wrap fill-width justify-center>
                        <v-toolbar-title class="subheading strong text-xs-center pb-2" v-text="'Send email to us for further inquiry'" />
                        <v-toolbar-items class="justify-center pb-3">
                          <v-btn :href="config.mailLink">Contact Us</v-btn>
                        </v-toolbar-items>
                      </v-layout>
                    </v-toolbar>
                    <v-layout row wrap fill-width align-center justify-center>
                      <template v-for="(contact, i) in contactList">
                        <v-avatar size="44px" :key="i" color="grey" class="mx-3 clickable" @click="goToLink(contact.value)">
                          <v-img :src="contact.iconSrc" max-height="30" max-width="30"></v-img>
                        </v-avatar>
                      </template>
                    </v-layout>
                    <v-toolbar color="#1C1B20" flat fill-width depressed height="60" style="color:whitesmoke;">
                      <v-layout xs12 row wrap fill-width justify-center>
                        <v-toolbar-title class="caption" v-text="'Created by Ordent'" />
                      </v-layout>
                    </v-toolbar>
                  </v-layout>
                </v-container>
              </template>
              </template>
            </v-layout>
          </template>
        </ksvuefp-section>
    </ksvuefp>
  </div>
  </v-flex>
</template>

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
  },
  sections: allSections(sortBy:"id", order:ASC) {
    edges {
      node {
        id
        title
        name
      }
    }
  }
}
</page-query>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import axios from 'axios'

export default {
  metaInfo: {
    title: process.env.GRIDSOME_SITE_TITLE,
    meta: [
      {name: 'author', content: 'John Doe'}
    ]
  },
  computed: {
    currentIndex() {
      return this.$ksvuefp.currentIndex
    },
    config() {
      return this.$page.config
    },
    sections() {
      return this.$page.sections.edges
    },
    sideMenu() {
      let sideMenu = []
      sideMenu.push({section_id: 0, name: 'Beranda'})
      sideMenu.push({section_id: 1, name: 'Tentang Kami'})

      if (this.config.useProducts){
        sideMenu.push({section_id: this.config.productSectionId, name: 'Produk'})
      }
      if (this.config.useContacts){
        sideMenu.push({section_id: this.config.contactSectionId, name: 'Hubungi Kami'})
      }

      return sideMenu      
    }
  },
  data() {
    return {
      options: {
        duration: 1000,
        easing: [1, 0, 0, 1],
        loopBottom: false,
        preloaderEnabled: true,
        preloaderBgColor: '#fff',
        preloaderColor: '#212121',
        preloaderText: 'Loading...',
        dotNavEnabled: false,
        parallax: true
      },
      headers: {
        'Project-ID': process.env.GRIDSOME_PROJECT_ID
      },
      clipped: false,
      drawer: false,
      miniVariant: false,
      isLoading: true,
      productPost: {
        id: 1,
        title: 'Default Product',
        content: '<p>Hello World!</p><p>Some initial <strong>default</strong> product</p>',
        coverImage: 'null'
      },
      welcomePost: {
        id: 1,
        title: 'Default Home',
        content: '<p>Hello World!</p><p>Some initial <strong>Home</strong> text</p>',
        coverImage: 'null'
      },
      profilePost: {
        id: 1,
        title: 'Default Profile',
        content: '<p>Hello World!</p><p>Some initial <strong>default</strong> profile</p>',
        coverImage: 'null'
      },
      contactList: [],
      productList: []
    }
  },
  async mounted() {
    let Velocity = require('velocity-animate')
    let hammerjs = require('hammerjs')

    this.velocity = Velocity
    this.hammerjs = hammerjs

    await this.loadWelcomePost(this.headers)
  },
  methods: {
    goToLink(urlLink) {
      window.open(urlLink, '_blank')
    },
    async loadContactData(headers) {
      let apiUrl = process.env.GRIDSOME_API_URL + '/api/contact'
      let tmpContactList = []

      axios.get(apiUrl, {headers: headers})
      .then((response) => {
        let contactList = response.data.data
        contactList.forEach(contact => {
            let iconSrc = './images/default-contact.png'

            if (contact.type == 'facebook'){
              iconSrc = './images/facebook-icon.png'
            } else if (contact.type == 'instagram'){
              iconSrc = './images/instagram-icon.png'
            } else if (contact.type == 'linkedin'){
              iconSrc = './images/linkedin-icon.png'
            } else if (contact.type == 'twitter'){
              iconSrc = './images/twitter-icon.png'
            }

            contact.iconSrc = iconSrc
            tmpContactList.push(contact)

            this.contactList = tmpContactList
            this.isLoading = false
        });
      })
    },
    async loadProductData(headers) {
      let productPostUrl = process.env.GRIDSOME_API_URL + '/api/post/type/single/4'
      let productPost = await axios.get(productPostUrl, {headers: headers})
      productPost = productPost.data

      if (productPost != null && productPost != undefined && productPost.id != null){
        this.productPost = {
          id: 1,
          title: productPost.title,
          content: productPost.html_content,
          coverImage: productPost.cover_image != null ? productPost.cover_image : 'null'
        }
      }

      await this.loadProductListData(headers)
    },
    async loadProductListData(headers) {
      let tmpProductList = []
      let productListUrl = process.env.GRIDSOME_API_URL + '/api/product?page=1&limit=6'
      let productList = await axios.get(productListUrl, {headers: headers})
      productList = productList.data.data

      if (productList != null && productList != undefined && productList.length > 0){
        productList.forEach(product => {
          tmpProductList.push({
            id: product.id,
            imageMain: product.image_main != null ? product.image_main : 'null',
            name: product.name,
            summary: product.summary
          })
        });
      } else {
        for (let i = 0; i < 6; i++){
          console.log('default called')
          tmpProductList.push({
            id: i,
            imageMain: './images/default-icon-' + i + '.png',
            name: 'Default Product Item',
            summary: 'Default Product item summary'
          })
        }
      }

      this.productList = tmpProductList
      this.isLoading = false
    },
    async loadWelcomePost(headers) {
      try {
        let welcomePostUrl = process.env.GRIDSOME_API_URL + '/api/post/type/single/2'
        let welcomePostData = await axios.get(welcomePostUrl, {headers: headers})
        welcomePostData = welcomePostData.data.data

        if (welcomePostData != null && welcomePostData != undefined){
          this.welcomePost = {
              id: 1,
              title: welcomePostData.title,
              content: welcomePostData.html_content,
              coverImage: welcomePostData.cover_image != null ? welcomePostData.cover_image : 'null'
          }
        }

        this.isLoading = false
      } catch(error) {
        console.log(error)
      }
    },
    async loadProfilePost(headers) {
      try {
        let profilePostUrl = process.env.GRIDSOME_API_URL + '/api/post/type/single/3'
        let profilePostData = await axios.get(profilePostUrl, {headers: headers})
        profilePostData = profilePostData.data.data

        if (profilePostData != null && profilePostData != undefined){
          this.profilePost = {
              id: 1,
              title: profilePostData.title,
              content: profilePostData.html_content,
              coverImage: profilePostData.cover_image != null ? profilePostData.cover_image : 'null'
          }
        }

        this.isLoading = false
      } catch(error) {
        console.log(error)
      }
    }
  },
  watch: {
    currentIndex: async function(newIndex, oldIndex) {
      console.log(oldIndex)
      if (newIndex == 0){
        this.isLoading = true
        await this.loadWelcomePost(this.headers)
      } else if (newIndex == 1) {
        this.isLoading = true
        await this.loadProfilePost(this.headers)
      } else if (newIndex == 2) {
        this.isLoading = true
        await this.loadProductData(this.headers)
      } else if (newIndex == 3) {
        this.isLoading = true
        await this.loadContactData(this.headers)
      }
    }
  }
}
</script>

<style>
body {
  margin: 0;
}
.ksvuefp-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.fade-enter-active, .fade-leave-active {
  transition: all .5s;
  opacity: 1;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
#app {
  overflow: hidden;
}

.ksvuefp-section, .ksvuefp-section__overlay {
  height: 0%;
  width: 0%;
  top: 0;
  left: 0;
}

.ksvuefp-section, .ksvuefp-section__content {
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
}

.section-content {
  position: absolute;
}

.default-color {
  color: whitesmoke
}

.even-content {
  background-color: #24232A;
  color: whitesmoke;
}

.odd-content {
  background-color: #1C1B20;
  color: whitesmoke;
}

.cover-image-full {
  height: 100%;
  width: 100%;
}

.cover-image-not-full {
  height: 100%;
  width: 30%;
  background-color: #1C1B20;
}

.cover-image-not-full-mobile {
  height: 40%;
  width: 100%;
  background-color: #1C1B20;
}

.product-header {
  height: 35%;
  width: 100%
}

.product-detail {
  height: 100%;
  width: 100%
}

.clickable {
  cursor: pointer;
}

</style>
