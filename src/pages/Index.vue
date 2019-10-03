<template>
  <v-layout column wrap fill-height fill-width pa-0 style="max-width: 100%;">
    <ksvuefp :options="options" :sections="contentSections" style="height: 100%; width: 100%;">
       <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app dark floating class="hidden-sm-and-up" width="225px">
         <v-layout column wrap fill-height align-end justify-center>
          <v-list>
              <v-list-tile @click.prevent="$ksvuefp.$emit('ksvuefp-nav-click', {nextIndex: 0})" @click="drawer = false" class="my-3">
                  <v-list-tile-content>
                      <v-list-tile-title v-text="'Beranda'" justify-end/>
                  </v-list-tile-content>
              </v-list-tile>
              <v-list-tile @click.prevent="$ksvuefp.$emit('ksvuefp-nav-click', {nextIndex: 1})" @click="drawer = false" class="my-3">
                  <v-list-tile-content>
                      <v-list-tile-title v-text="'Profil'" justify-end/>
                  </v-list-tile-content>
              </v-list-tile>
              <v-list-tile @click.prevent="$ksvuefp.$emit('ksvuefp-nav-click', {nextIndex: 2})" @click="drawer = false" class="my-3">
                  <v-list-tile-content>
                      <v-list-tile-title v-text="'Layanan'" justify-end/>
                  </v-list-tile-content>
              </v-list-tile>
              <v-list-tile @click.prevent="$ksvuefp.$emit('ksvuefp-nav-click', {nextIndex: 3})" @click="drawer = false" class="my-3">
                  <v-list-tile-content>
                      <v-list-tile-title v-text="'Kontak'" justify-end/>
                  </v-list-tile-content>
              </v-list-tile>
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
          <v-btn flat depressed color="white" @click.prevent="$ksvuefp.$emit('ksvuefp-nav-click', {nextIndex: 0})" class="hidden-sm-and-down body-2 font-weight-regular">
            Beranda
          </v-btn>
          <v-btn flat depressed color="white" @click.prevent="$ksvuefp.$emit('ksvuefp-nav-click', {nextIndex: 1})" class="hidden-sm-and-down body-2 font-weight-regular">
            Profil
          </v-btn>
          <v-btn flat depressed color="white" @click.prevent="$ksvuefp.$emit('ksvuefp-nav-click', {nextIndex: 2})" class="hidden-sm-and-down body-2 font-weight-regular">
            Layanan
          </v-btn>
          <v-btn flat depressed color="white" @click.prevent="$ksvuefp.$emit('ksvuefp-nav-click', {nextIndex: 3})" class="hidden-sm-and-down body-2 font-weight-regular">
            Kontak
          </v-btn>
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
        </v-layout>
      </v-toolbar>
      <ksvuefp-section
        class="content-wrapper"
        :section="welcomePost"
        :key="welcomePost.id"
        :section-index=0
      >
        <v-layout name="product" fill-width ma-0 pa-0 hidden-sm-and-down odd-content section-content>
            <v-img
              dark
              :src="welcomePost.cover"
              class="cover-image-full"
              height="100%"
              width="100%"
            >
              <v-layout column wrap justify-center align-center fill-height fill-width style="background-color: rgb(0,0,0,0.4)">
                <span class="display-3 font-weight-strong mb-3 text-xs-center">{{ welcomePost.title}}</span>
                <span class="subheading text-xs-center" v-html="welcomePost.content" />
              </v-layout>
            </v-img>
        </v-layout>
        <v-layout fluid fill-height fill-width ma-0 hidden-sm-and-up pa-0 odd-content section-content-mobile>
            <v-img
              dark
              :src="welcomePost.cover"
              class="cover-image-full"
              height="100%"
              width="100%"
              contain
            >
              <v-layout column wrap justify-center align-center fill-height fill-width style="background-color: rgb(0,0,0,0.4)">
                <span class="display-1 font-weight-strong mb-3 text-xs-center text-xs-center">{{ welcomePost.title}}</span>
                <span class="subheading text-xs-center" v-html="welcomePost.content" />
              </v-layout>
            </v-img>
        </v-layout>
      </ksvuefp-section>
      <ksvuefp-section
        class="content-wrapper"
        :section="profilePost"
        :key="profilePost.id"
        :section-index=1
      >
        <v-layout row fill-width ma-0 pa-0 hidden-sm-and-down even-content section-content>
            <v-layout column wrap justify-left align-left pl-4 pt-5 style="width: 65%;">
              <span class="display-3 font-weight-strong mb-5">{{ profilePost.title}}</span>
              <span class="subheading" v-html="profilePost.content" />
            </v-layout>
            <v-parallax
              :src="profilePost.cover"
              class="cover-image-not-full odd-content"
              style="height: 100%; width: 35%;"
            >
            </v-parallax>
          </v-layout>
          <v-layout column fill-height fill-width ma-0 hidden-sm-and-up pa-0 even-content section-content-mobile>
            <v-layout column wrap justify-left align-left pl-4 pt-3 style="height: 45%;">
              <span class="display-1 font-weight-strong mb-5">{{ profilePost.title}}</span>
              <span class="subheading" v-html="profilePost.content" />
            </v-layout>
            <v-img
              dark
              :src="profilePost.cover"
              class="cover-image-full odd-content"
              height="55%"
              width="100%"
              contain
            />
          </v-layout>
      </ksvuefp-section>
      <ksvuefp-section
        class="content-wrapper"
        :section="productPost"
        :key="productPost.id"
        :section-index=2
      >
        <v-layout column fill-width ma-0 pa-0 hidden-sm-and-down odd-content section-content>
            <v-layout fill-width ma-0 style="height: 45%;">
              <v-parallax
                dark
                :src="productPost.cover"
                class="cover-image-full"
                height="100%">
                  <v-layout column wrap justify-center align-center>
                    <span class="display-1 text-xs-center font-weight-strong pt-4">{{ productPost.title}}</span>
                    <span class="body-1 text-xs-center pt-4 mb-3" v-html="productPost.content"></span>
                  </v-layout>
              </v-parallax>
            </v-layout>
            <v-carousel hide-delimiters dark style="height: 55%; width: 100%;">
              <v-carousel-item
                v-for="(carousel, index) in productCarousel"
                :key="index"
              >
                  <v-layout row wrap product-detail justify-center fill-width fill-height align-center pa-0>
                    <v-flex
                      xs5
                      v-for="item in carousel.carouselItems"
                      :items="item"
                      v-bind:key="item.id">
                        <v-card tile flat color="#1C1B20" style="color: whitesmoke; height: 100%; width: 90%;">
                          <v-layout row wrap align-start justify-end style="height: 100%;">
                            <v-img :src="item.image" max-height="50%" max-width="50%" contain/>
                            <v-layout column wrap style="width: 60%; height: 100%;">
                              <span class="body-2 text-xs-left font-weight-strong ml-2 mb-1">{{ item.name}}</span>
                              <span class="caption text-xs-left ml-2">{{ item.description }}</span>
                            </v-layout>
                          </v-layout>
                        </v-card>
                    </v-flex>
                  </v-layout>
              </v-carousel-item>
            </v-carousel>
          </v-layout>
          <v-layout column fill-height fill-width ma-0 hidden-sm-and-up pa-0 odd-content section-content-mobile>
            <v-layout fill-width ma-0 style="height: 50%;">
              <v-parallax
                dark
                :src="productPost.cover"
                class="cover-image-full"
                height="100%">
                  <v-layout column wrap justify-center align-center>
                    <span class="display-1 text-xs-center font-weight-strong pt-4">{{ productPost.title}}</span>
                    <span class="body-1 text-xs-center pt-4 mb-3" v-html="productPost.content"></span>
                  </v-layout>
              </v-parallax>
            </v-layout>
            <v-carousel hide-delimiters dark style="height: 50%; width: 100%;">
              <v-carousel-item
                v-for="(carousel, index) in productCarousel"
                :key="index"
              >
                  <v-layout column wrap product-detail justify-center fill-width fill-height align-center pa-0>
                    <v-flex
                      xs6
                      v-for="item in carousel.carouselItems"
                      :items="item"
                      v-bind:key="item.id"
                      style="width: 80%;">
                        <v-card tile flat color="#1C1B20" style="color: whitesmoke; height: 100%; width: 100;" class="justify-center align-center">
                          <v-layout row wrap align-center justify-center style="height: 100%;">
                            <v-img :src="item.image" max-height="50%" max-width="50%" contain/>
                            <v-layout column wrap>
                              <span class="body-2 text-xs-left font-weight-strong ml-2 mb-1">{{ item.name}}</span>
                              <span class="caption text-xs-left ml-2">{{ item.description }}</span>
                            </v-layout>
                          </v-layout>
                        </v-card>
                    </v-flex>
                  </v-layout>
              </v-carousel-item>
            </v-carousel>
          </v-layout>
      </ksvuefp-section>
      <ksvuefp-section
        class="content-wrapper"
        :section="socialMedia"
        :key="'contact'"
        :section-index=3
      >
        <v-layout column fill-width ma-0 pa-0 hidden-sm-and-down odd-content section-content>
          <v-toolbar color="#1C1B20" flat fill-width depressed style="color:whitesmoke; position: relative; height: 5%;">
            <v-layout row wrap fill-width fill-height justify-center align-center>
              <v-toolbar-title class="title strong text-xs-center mr-5 pr-5 align-center" v-text="'Send email to us for further inquiry'" />
              <v-toolbar-items class="ml-5 pl-5">
                <v-btn :href="'test@mail.co'" style="height: 80%">Contact Us</v-btn>
              </v-toolbar-items>
            </v-layout>
          </v-toolbar>
          <v-layout row wrap fill-width align-center justify-center> 
            <template v-for="(contact, i) in socialMedia">
              <v-avatar size="44px" :key="i" color="grey" class="mx-3 clickable" @click="goToLink(contact.url)">
                <v-img :src="contact.icon_src" max-height="30" max-width="30"></v-img>
              </v-avatar>
            </template>
          </v-layout>
          <v-toolbar color="#1C1B20" flat fill-width depressed style="color:whitesmoke; height: 5%;">
            <v-layout row wrap fill-width justify-center>
              <v-toolbar-title class="body-2" v-text="'Created by Ordent'" />
            </v-layout>
          </v-toolbar>
        </v-layout>
        <v-layout column fill-height fill-width ma-0 hidden-sm-and-up pa-0 even-content section-content-mobile>
          <v-toolbar color="#1C1B20" flat depressed style="color:whitesmoke;height: 15%;" class="py-1">
            <v-layout column wrap fill-width justify-center>
              <v-toolbar-title class="subheading strong text-xs-center pb-2" v-text="'Send email to us for further inquiry'" />
              <v-toolbar-items class="justify-center pb-3">
                <v-btn :href="'test@mail.co'">Contact Us</v-btn>
              </v-toolbar-items>
            </v-layout>
          </v-toolbar>
          <v-layout row wrap fill-width align-center justify-center>
            <template v-for="(contact, i) in socialMedia">
              <v-avatar size="44px" :key="i" color="grey" class="mx-3 clickable" @click="goToLink(contact.url)">
                <v-img :src="contact.icon_src" max-height="30" max-width="30"></v-img>
              </v-avatar>
            </template>
          </v-layout>
          <v-toolbar color="#1C1B20" flat fill-width depressed style="color:whitesmoke; height: 5%;">
            <v-layout xs12 row wrap fill-width justify-center>
              <v-toolbar-title class="caption" v-text="'Created by Ordent'" />
            </v-layout>
          </v-toolbar>
        </v-layout>
      </ksvuefp-section>
    </ksvuefp>
  </v-layout>
</template>

<page-query>
  query Home {
    welcomePost: allPost(filter: {id: {ne: "dummy"}, type: {eq: "home"}}) {
      edges {
        node {
          id,
          title,
          type,
          content
        }
      }
    },
    profilePost: allPost(filter: {id: {ne: "dummy"}, type: {eq: "profile"}}) {
      edges {
        node {
          id,
          title,
          type,
          content
        }
      }
    },
    productPost: allPost(filter: {id: {ne: "dummy"}, type: {eq: "product"}}) {
      edges {
        node {
          id,
          title,
          type,
          content
        }
      }
    },
    productItem:allProduct (filter:{id: {ne: "dummy"}}) {
      edges {
        node {
          id,
          image,
          name,
          price,
          description
        }
      }
    },
    socialMedia: allSocialMedia (filter: {id: {ne: "dummy"}}) {
      edges {
        node {
          id,
          type,
          url
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
    welcomePost() {
      let welcomePost = {
        id: 1,
        title: 'Default Home',
        content: '<p>Hello World!</p><p>Some initial <strong>Home</strong> text</p>',
        cover: 'null'
      }

      if (this.$page.welcomePost.edges.length > 0){
        welcomePost = this.$page.welcomePost.edges[0].node
      }
      return welcomePost
    },
    profilePost() {
      let profilePost = {
        id: 1,
        title: 'Default Profile',
        content: '<p>Hello World!</p><p>Some initial <strong>Profile</strong> text</p>',
        cover: 'null'
      }

      if (this.$page.profilePost.edges.length > 0){
        profilePost = this.$page.profilePost.edges[0].node
      }
      return profilePost
    },
    productPost() {
      let productPost = {
        id: 1,
        title: 'Default Product',
        content: '<p>Hello World!</p><p>Some initial <strong>Product</strong> text</p>',
        cover: 'null'
      }

      if (this.$page.productPost.edges.length > 0){
        productPost = this.$page.productPost.edges[0].node
      }
      return productPost
    },
    productCarousel() {
      let productEdges = this.$page.productItem.edges
      let productList = []
      let productCarousel = []
      let carouselItems = []

      if (productEdges.length > 0){
        for (let i = 0; i < productEdges.length; i++){
          productList.push(productEdges[i].node)

          if ((i+1) % 2 == 0){
            productCarousel.push({
              carouselItems: carouselItems
            })
            carouselItems = []
          }
        }
      }
      else {
        for(let i = 1; i <= 6; i++) {
          carouselItems.push({
            id: i,
            name: 'Default Product ' + i,
            description: 'Default Description ' + i,
            image: './images/default-icon-' + i + '.png'
          })

          if (i % 2 == 0){
            productCarousel.push({
              carouselItems: carouselItems
            })
            carouselItems = []
          }
        }
      }
      return productCarousel
    },
    socialMedia() {
      let socialMediaModel = this.$page.socialMedia.edges
      let socialMediaList = []

      let currentObject = null
      for (let i = 0; i < socialMediaModel.length; i++){
        currentObject = socialMediaModel[i].node
        switch(currentObject.type) {
          case 'facebook':
            currentObject.icon_src = './images/facebook-icon.png'
            break
          case 'instagram':
            currentObject.icon_src = './images/instagram-icon.png'
            break
          case 'twitter':
            currentObject.icon_src = './images/twitter-icon.png'
            break
          case 'linkedin':
            currentObject.icon_src = './images/linkedin-icon.png'
            break
          case 'whatsapp':
            currentObject.icon_src = './images/whatsapp-icon.png'
            currentObject.url = 'https://wa.me/62' + currentObject.url
            break
          default:
            console.log('No Data')
        }
        socialMediaList.push(currentObject)
      }

      return socialMediaList
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
  mounted() {
    let Velocity = require('velocity-animate')
    let hammerjs = require('hammerjs')

    this.velocity = Velocity
    this.hammerjs = hammerjs
  },
  methods: {
    goToLink(urlLink) {
      window.open(urlLink, '_blank')
    },
  },
}
</script>

<style>
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
.v-window__container {
  height: 100% !important;
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
