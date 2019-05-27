<template>
  <v-layout column wrap fill-height fill-width pa-0 style="max-width: 100%;">
    <ksvuefp :options="options" :sections="contentSections" style="height: 100%; width: 100%;">
       <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app dark floating class="hidden-sm-and-up" width="225px">
         <v-layout column wrap fill-height align-end justify-center>
          <v-list>
            <div v-for="(menu, i) in contentSections" :key="i">
              <v-list-tile @click.prevent="$ksvuefp.$emit('ksvuefp-nav-click', {nextIndex: menu.section_id})" @click="drawer = false" class="my-3">
                  <v-list-tile-content>
                      <v-list-tile-title v-text="menu.section_menu" justify-end/>
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
        class="hidden-sm-and-down pa-0"
        style="height: 10%;"
      >
        <v-layout row wrap justify-center align-center style="height: 100%;">
          <v-toolbar-side-icon @click="drawer = !drawer" class="hover hidden-sm-and-up" style="color: whitesmoke;"/>
          <template v-if="config.use_home">
            <template v-if="homeSection.use_icon">
              <v-btn
                icon
                @click.stop="miniVariant = !miniVariant"
              >
                <v-icon>{{ `chevron_${miniVariant ? 'right' : 'left'}` }}</v-icon>
              </v-btn>
            </template>
            <template v-else>
              <v-toolbar-title class="title default-color text-xs-center mr-5" @click.prevent="$ksvuefp.$emit('ksvuefp-nav-click', {nextIndex: homeSection.section_id})">{{ homeSection.section_menu }}</v-toolbar-title>
            </template>
          </template>
          <template
            v-for="toolbarSection in menuSections"
          >
            <v-btn flat :key="toolbarSection.id" depressed color="white" @click.prevent="$ksvuefp.$emit('ksvuefp-nav-click', {nextIndex: toolbarSection.section_id})" class="hidden-sm-and-down body-2 font-weight-regular">
              {{ toolbarSection.section_menu }}
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
        class="hidden-sm-and-up pa-0"
        style="height: 10%;"
      >
        <v-layout xs12 justify-left align-center>
          <v-toolbar-side-icon @click="drawer = !drawer" class="hover hidden-sm-and-up toolbar"/>
          <template v-if="config.use_icons">
            <v-btn
              icon
              @click.stop="miniVariant = !miniVariant"
            >
              <v-icon>{{ `chevron_${miniVariant ? 'right' : 'left'}` }}</v-icon>
            </v-btn>
          </template>
          <template v-else>
            <v-toolbar-title class="title default-color" @click.prevent="$ksvuefp.$emit('ksvuefp-nav-click', {nextIndex: homeSection.section_id})">{{ homeSection.section_menu }}</v-toolbar-title>
          </template>
        </v-layout>
      </v-toolbar>
      <ksvuefp-section
        v-for="section in contentSections"
        :section="section"
        :key="section.id"
        :section-index="section.section_id"
        class="content-wrapper"
      >
        <template v-if="section.section_name == 'home'">
          <v-layout v-if="!pageLoading" fill-width ma-0 pa-0 hidden-sm-and-down odd-content section-content>
              <v-parallax
                dark
                :src="welcomePost.cover_image"
                class="cover-image-full"
                style="height: 100%;">
                  <v-layout column wrap justify-center align-center>
                    <span class="display-3 font-weight-strong mb-3 text-xs-center">{{ welcomePost.title}}</span>
                    <span class="subheading text-xs-center" v-html="welcomePost.html_content" />
                  </v-layout>
              </v-parallax>
          </v-layout>
          <v-layout v-if="!pageLoading" fluid fill-height fill-width ma-0 hidden-sm-and-up pa-0 odd-content section-content-mobile>
              <v-parallax
                dark
                :src="welcomePost.cover_image"
                class="cover-image-full"
                style="height: 100%;">
                  <v-layout column wrap justify-center align-center>
                    <span class="display-1 font-weight-strong mb-3 text-xs-center text-xs-center">{{ welcomePost.title}}</span>
                    <span class="subheading text-xs-center" v-html="welcomePost.html_content" />
                  </v-layout>
              </v-parallax>
          </v-layout>
        </template>
        <template v-if="section.section_name == 'profile'">
          <v-layout v-if="!pageLoading" row fill-width ma-0 pa-0 hidden-sm-and-down even-content section-content>
            <v-layout column wrap justify-left align-left pl-4 pt-5 style="width: 65%;">
              <span class="display-3 font-weight-strong mb-5">{{ profilePost.title}}</span>
              <span class="subheading" v-html="profilePost.html_content" />
            </v-layout>
            <v-parallax
              :src="profilePost.coverImage"
              class="cover-image-not-full odd-content"
              style="height: 100%; width: 35%;"
            >
            </v-parallax>
          </v-layout>
          <v-layout v-if="!pageLoading" column fill-height fill-width ma-0 hidden-sm-and-up pa-0 even-content section-content-mobile>
            <v-layout column wrap justify-left align-left pl-4 pt-3 style="height: 45%;">
              <span class="display-1 font-weight-strong mb-5">{{ profilePost.title}}</span>
              <span class="subheading" v-html="profilePost.html_content" />
            </v-layout>
            <v-parallax
              :src="profilePost.coverImage"
              class="cover-image-not-full odd-content"
              style="height: 55%; width: 100%;"
            >
            </v-parallax>
          </v-layout>
        </template>
        <template v-if="section.section_name == 'product'">
          <v-layout v-if="!pageLoading" column fill-width ma-0 pa-0 hidden-sm-and-down odd-content section-content>
            <v-layout fill-width ma-0 style="height: 50%;">
              <v-parallax
                dark
                :src="productPost.coverImage"
                class="cover-image-full"
                height="100%">
                  <v-layout column wrap justify-center align-center>
                    <span class="display-1 text-xs-center font-weight-strong pt-4">{{ productPost.title}}</span>
                    <span class="body-1 text-xs-center pt-4 mb-3" v-html="productPost.html_content"></span>
                  </v-layout>
              </v-parallax>
            </v-layout>
            <v-carousel hide-delimiters dark style="height: 50%; width: 100%;" @click.native="carouselClick">
              <v-carousel-item>
                <v-layout row wrap product-detail justify-center fill-width fill-height align-center pa-0>
                  <v-flex
                    xs5
                    v-for="product in productList"
                    :items="product"
                    v-bind:key="product.id">
                      <v-card tile flat color="#1C1B20" style="color: whitesmoke; height: 100%; width: 90%;">
                        <v-layout row wrap align-start justify-end style="height: 100%;">
                          <v-img :src="product.image_main" max-height="50%" max-width="50%" contain/>
                          <v-layout column wrap style="width: 60%; height: 100%;">
                            <span class="body-2 text-xs-left font-weight-strong ml-2 mb-1">{{ product.name}}</span>
                            <span class="caption text-xs-left ml-2">{{ product.summary }}</span>
                          </v-layout>
                        </v-layout>
                      </v-card>
                  </v-flex>
                </v-layout>
              </v-carousel-item>
            </v-carousel>
          </v-layout>
          <v-layout v-if="!pageLoading" column fill-height fill-width ma-0 hidden-sm-and-up pa-0 odd-content section-content-mobile>
            <v-layout fill-width ma-0 style="height: 50%;">
              <v-parallax
                dark
                :src="productPost.coverImage"
                class="cover-image-full"
                height="100%">
                  <v-layout column wrap justify-center align-center>
                    <span class="display-1 text-xs-center font-weight-strong pt-4">{{ productPost.title}}</span>
                    <span class="body-1 text-xs-center pt-4 mb-3" v-html="productPost.html_content"></span>
                  </v-layout>
              </v-parallax>
            </v-layout>
            <v-carousel hide-delimiters dark style="height: 50%; width: 100%;" @click.native="carouselClick">
              <v-carousel-item>
                <v-layout column wrap product-detail justify-center fill-width fill-height align-center pa-0>
                  <v-flex
                    xs6
                    v-for="product in productList"
                    :items="product"
                    v-bind:key="product.id"
                    style="width: 80%; height: 100%;">
                      <v-card tile flat color="#1C1B20" style="color: whitesmoke; height: 100%; width: 100;" class="justify-center align-center">
                        <v-layout row wrap align-center justify-center style="height: 100%;">
                          <v-img :src="product.image_main" max-height="50%" max-width="50%" contain/>
                          <v-layout column wrap>
                            <span class="body-2 text-xs-left font-weight-strong ml-2 mb-1">{{ product.name}}</span>
                            <span class="caption text-xs-left ml-2">{{ product.summary }}</span>
                          </v-layout>
                        </v-layout>
                      </v-card>
                  </v-flex>
                </v-layout>
              </v-carousel-item>
            </v-carousel>
          </v-layout>
        </template>
        <template v-if="section.section_name == 'contact'">
          <v-layout v-if="!pageLoading" column fill-width ma-0 pa-0 hidden-sm-and-down odd-content section-content>
            <v-toolbar color="#1C1B20" flat fill-width depressed style="color:whitesmoke; position: relative; height: 5%;">
              <v-layout row wrap fill-width fill-height justify-center align-center>
                <v-toolbar-title class="title strong text-xs-center mr-5 pr-5 align-center" v-text="'Send email to us for further inquiry'" />
                <v-toolbar-items class="ml-5 pl-5">
                  <v-btn :href="config.mailLink" style="height: 80%">Contact Us</v-btn>
                </v-toolbar-items>
              </v-layout>
            </v-toolbar>
            <v-layout row wrap fill-width align-center justify-center> 
              <template v-for="(contact, i) in contactList">
                <v-avatar size="44px" :key="i" color="grey" class="mx-3 clickable" @click="goToLink(contact.value.value)">
                  <v-img :src="contact.value.icon_src" max-height="30" max-width="30"></v-img>
                </v-avatar>
              </template>
            </v-layout>
            <v-toolbar color="#1C1B20" flat fill-width depressed style="color:whitesmoke; height: 5%;">
              <v-layout row wrap fill-width justify-center>
                <v-toolbar-title class="body-2" v-text="'Created by Ordent'" />
              </v-layout>
            </v-toolbar>
          </v-layout>
          <v-layout v-if="!pageLoading" column fill-height fill-width ma-0 hidden-sm-and-up pa-0 even-content section-content-mobile>
            <v-toolbar color="#1C1B20" flat depressed style="color:whitesmoke;height: 15%;" class="py-1">
              <v-layout column wrap fill-width justify-center>
                <v-toolbar-title class="subheading strong text-xs-center pb-2" v-text="'Send email to us for further inquiry'" />
                <v-toolbar-items class="justify-center pb-3">
                  <v-btn :href="config.mailLink">Contact Us</v-btn>
                </v-toolbar-items>
              </v-layout>
            </v-toolbar>
            <v-layout row wrap fill-width align-center justify-center>
              <template v-for="(contact, i) in contactList">
                <v-avatar size="44px" :key="i" color="grey" class="mx-3 clickable" @click="goToLink(contact.value.value)">
                  <v-img :src="contact.value.icon_src" max-height="30" max-width="30"></v-img>
                </v-avatar>
              </template>
            </v-layout>
            <v-toolbar color="#1C1B20" flat fill-width depressed style="color:whitesmoke; height: 5%;">
              <v-layout xs12 row wrap fill-width justify-center>
                <v-toolbar-title class="caption" v-text="'Created by Ordent'" />
              </v-layout>
            </v-toolbar>
          </v-layout>
        </template>
      </ksvuefp-section>
    </ksvuefp>
  </v-layout>
</template>
            
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
    meta() {
      return this.$store.state.meta
    },
    config() {
      return this.$store.state.config
    },
    welcomePost() {
      return this.$store.state.welcomePost
    },
    profilePost() {
      return this.$store.state.profilePost
    },
    productPost() {
      return this.$store.state.productPost
    },
    productList() {
      return this.$store.state.productList
    },
    contactList() {
      let socialMedia = Object.assign([], this.$store.state.contactList)

      socialMedia.forEach(element => {
        switch(element.value.name) {
          case 'facebook':
            element.value.icon_src = './images/facebook-icon.png'
            break
          case 'instagram':
            element.value.icon_src = './images/instagram-icon.png'
            break
          case 'twitter':
            element.value.icon_src = './images/twitter-icon.png'
            break
          case 'linkedin':
            element.value.icon_src = './images/linkedin-icon.png'
            break
          case 'whatsapp':
            element.value.icon_src = './images/whatsapp-icon.png'
            element.value.value = 'https://wa.me/62' + element.value.value
            break
          default:
            console.log('No Data')
        }
      })
      return socialMedia
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
      pageLoading: true,
      carouselLoading: true,
      homeSection: {},
      menuSections: [],
      contentSections: [],
      page: 1,
      limit: 2
    }
  },
  async mounted() {
    let Velocity = require('velocity-animate')
    let hammerjs = require('hammerjs')

    this.velocity = Velocity
    this.hammerjs = hammerjs

    let params = this.$route.query
    if (params.preview){
      this.headers.Preview = params.preview
      await this.loadSections(this.headers, params.type)
    } else {
      await this.loadSections(this.headers)
      await this.fetchWelcomePost(this.headers)
    }
  },
  methods: {
    goToLink(urlLink) {
      window.open(urlLink, '_blank')
    },
    async loadSections(headers, section = null) {
      let sections = []
      let contentSections = []
      await this.$store.dispatch('fetchConfig', headers)

      if (headers.Preview){
        if (section == 2){
          this.homeSection = {
            id: 1,
            section_name: 'home',
            section_menu: config.home_menu,
            section_id: sectionId,
            use_icon: config.use_home_icon,
            icon_url: config.home_icon
          }
          contentSections.push(this.homeSection)

          await this.fetchWelcomePost(headers)

          this.config = {
            title: 'User Config',
            id: 1,
            use_products: false,
            use_contacts: false,
            use_home: true,
            use_home_icon: false,
            home_menu: this.config.home_menu,
            use_profiles: false,
          }
        } else if (section == 3) {
          sections.push({
            id: 1, 
            sectionName: 'profile',
            sectionMenu: this.config.profile_menu,
            sectionId: sectionId
          })
          await this.fetchProfilePost(headers)

          this.config = {
            title: 'User Config',
            id: 1,
            use_products: false,
            use_contacts: false,
            use_home: false,
            use_home_icon: false,
            use_profiles: false,
            profile_menu: this.config.profile_menu
          }
        } else if(section == 4) {
          sections.push({
            id: 1, 
            sectionName: 'contacts',
            sectionMenu: this.config.contact_menu,
            sectionId: sectionId
          })
          await this.fetchProductPost(headers)
          await this.fetchProductList(this.page, this.limit, headers)

          this.config = {
            title: 'User Config',
            id: 1,
            use_products: true,
            product_menu: this.config.product_menu,
            use_contacts: false,
            use_home: false,
            use_home_icon: false,
            use_profiles: false
          }
        }
      } else {
        let sectionId = 0
        let config = this.config

        if (config.use_home){
          this.homeSection = {
            id: 1,
            section_name: 'home',
            section_menu: config.home_menu,
            section_id: sectionId,
            use_icon: config.use_home_icon,
            icon_url: config.home_icon
          }

          contentSections.push(this.homeSection)
          sectionId++
        }
        if (config.use_profiles){
          sections.push({
            id: 2, 
            section_name: 'profile',
            section_menu: config.profile_menu,
            section_id: sectionId
          })
          sectionId++
        }
        if (config.use_products){
          sections.push({
            id: 3,
            section_name: 'product',
            section_menu: config.product_menu,
            section_id: sectionId,
          })
          sectionId++
        }
        if (config.use_contacts){
          sections.push({
            id: 4,
            section_name: 'contact',
            section_menu: config.contact_menu,
            section_id: sectionId,
          })
          sectionId++
        }
      }

      this.menuSections = sections
      this.contentSections = contentSections.concat.apply(contentSections, sections)
    },
    async fetchContactList(headers) {
      try {
        await this.$store.dispatch('fetchContactList', headers)
      }catch(error) {
        console.log(error)
      }
      this.pageLoading = false
    },
    async fetchProductPost(headers) {
      try {
        await this.$store.dispatch('fetchProductPost', headers)
      }catch(error) {
        console.log(error)
      }
      this.pageLoading = false
    },
    async fetchProductList(page, limit, headers) {
      try {
        this.page = page
        this.limit = limit

        await this.$store.dispatch('fetchProductList', {
          page: this.page,
          limit: this.limit,
          headers: headers
        })
      }catch(error) {
        console.log(error)
      }
      this.pageLoading = false
    },
    async fetchWelcomePost(headers) {
      try {
        await this.$store.dispatch('fetchWelcomePost', headers)
      } catch(error) {
        console.log(error)
      }
      this.pageLoading = false
    },
    async fetchProfilePost(headers) {
      try {
        await this.$store.dispatch('fetchProfilePost', headers)
      } catch(error) {
        console.log(error)
      }
      this.pageLoading = false
    },
    async carouselClick(param) {
      let halfScreen = Math.floor(screen.width / 2)
      if (param.clientX > halfScreen){
        if (this.page < this.meta.lastPage){
          this.page++
          await this.fetchProductList(this.page, this.limit, this.headers)
        }
      } else {
        if (this.page > 1){
          this.page--
          await this.fetchProductData(this.page, this.limit, this.headers)
        }
      }
    }
  },
  watch: {
    currentIndex: async function(newIndex, oldIndex) {
      if (newIndex == 0){
        this.pageLoading = true
        await this.fetchWelcomePost(this.headers)
      } else if (newIndex == 1) {
        this.pageLoading = true
        await this.fetchProfilePost(this.headers)
      } else if (newIndex == 2) {
        this.pageLoading = true
        await this.fetchProductPost(this.headers)
        await this.fetchProductList(1, 2, this.headers)
      } else if (newIndex == 3) {
        this.pageLoading = true
        await this.fetchContactList(this.headers)
      }
    }
  }
}
</script>

<style>
/* body {
  margin: 0;
  height: 100%;
}
html {
  height: 100%;
  font-family: 'Roboto', sans-serif;
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
  position: relative;
}
.ksvuefp-section, .ksvuefp-section__content, .content-wrapper {
  position: relative;
}

.ksvuefp-sections {
  height: 100%;
}
.default-color {
  color: whitesmoke
}
.v-toolbar__content {
  height: 100% !important;
  padding: 0 0;
}
#app {
  overflow: hidden;
}
.section-content {
  height: 85%; 
  max-width: 100%; 
  width: 100%; 
  position: absolute; 
  bottom: 0;
}
.section-content-mobile {
  height: 90%; 
  max-width: 100%; 
  width: 100%; 
  position: absolute; 
  bottom: 0;
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
} */
body {
  margin: 0;
  height: 100%;
}
html {
  height: 100%;
  font-family: 'Roboto', sans-serif;
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
  position: relative;
}
.ksvuefp-section, .ksvuefp-section__content, .content-wrapper {
  position: relative;
}

.ksvuefp-sections {
  height: 100%;
}
.default-color {
  color: whitesmoke
}
.v-toolbar__content {
  height: 100% !important;
}
#app {
  overflow: hidden;
}
.section-content {
  height: 90%; 
  max-width: 100%; 
  width: 100%; 
  position: absolute; 
  bottom: 0;
}
.section-content-mobile {
  height: 90%; 
  max-width: 100%; 
  width: 100%; 
  position: absolute; 
  bottom: 0;
}
.cover-image-full {
  height: 100%;
  width: 100%;
}
.v-parallax__content, .product-parallax {
  padding: 0 0;
}
.v-btn .v-btn__content .v-icon {
  color: #000;
}
.v-btn .v-btn__content .v-icon, .toolbar {
  color: whitesmoke;
}
.v-tabs {
  height: 100%;
}
.v-tabs__bar {
  height: 10%;
}
.v-tabs__wrapper {
  overflow: hidden;
  contain: content;
  display: flex;
  height: 100%;
}
.v-tabs__container--icons-and-text {
  height: 100%;
}
.v-tabs__slider-wrapper, .minify {
  width: 83px !important;
}
.v-tabs__slider-wrapper, .mobile {
  min-width: 50%;
}
.v-tabs__container--icons-and-text .v-tabs__div, .resize {
  min-width: 83px;
}
.v-tabs__item, .minify {
  max-width: 83px;
}
.v-tabs__item, .mobile {
  max-width: 100%;
  padding: 0 0;
}
.v-window, .tab-content {
  height: 90%;
}
.v-window__container, .tab-content {
  height: 100%;
}
.v-window-item, .tab-content {
  height: 100%;
}
.v-window, .tab-content-mobile {
  width: 100%;
}
.v-window__container, .tab-content-mobile {
  width: 100%;
}
.v-window-item, .tab-content-mobile {
  width: 100%;
}
.v-carousel__item, .menu-content {
  height: 100% !important;
}
.clickable {
  cursor: pointer;
}
#map {
  height: 90%;
  width: 80%;
  background-color: #ffffff;
}
.even-content {
  background-color: #24232A;
  color: whitesmoke;
}
.odd-content {
  background-color: #1C1B20;
  color: whitesmoke;
}
</style>
