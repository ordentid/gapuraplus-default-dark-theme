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
          <template v-if="item.useIcons">
            <v-btn
              icon
              @click.stop="miniVariant = !miniVariant"
            >
              <v-icon>{{ `chevron_${miniVariant ? 'right' : 'left'}` }}</v-icon>
            </v-btn>
          </template>
          <template v-else>
            <v-toolbar-title class="title default-color mr-5" @click.prevent="$ksvuefp.$emit('ksvuefp-nav-click', {nextIndex: 0})">{{ item.contentTitle }}</v-toolbar-title>
          </template>
          <v-btn flat depressed color="white" @click.prevent="$ksvuefp.$emit('ksvuefp-nav-click', {nextIndex: 1})" class="hidden-sm-and-down">
            TENTANG KAMI
          </v-btn>
          <template v-if="item.useProducts">
            <v-btn flat depressed color="white" @click.prevent="$ksvuefp.$emit('ksvuefp-nav-click', {nextIndex: item.productSectionId})" class="hidden-sm-and-down">
              PRODUK
            </v-btn>
          </template>
           <template v-if="item.useContacts">
            <v-btn flat depressed color="white" @click.prevent="$ksvuefp.$emit('ksvuefp-nav-click', {nextIndex: item.contactSectionId})" class="hidden-sm-and-down">
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
          <template v-if="item.useIcons">
            <v-btn
              icon
              @click.stop="miniVariant = !miniVariant"
            >
              <v-icon>{{ `chevron_${miniVariant ? 'right' : 'left'}` }}</v-icon>
            </v-btn>
          </template>
          <template v-else>
            <v-toolbar-title class="title default-color" @click.prevent="$ksvuefp.$emit('ksvuefp-nav-click', {nextIndex: 0})">{{ item.contentTitle }}</v-toolbar-title>
          </template>
        </v-layout>
      </v-toolbar>
      <ksvuefp-section
        v-for="(s,index) in sections"
        :section="s"
        :key="s.node.id"
        :section-index="index">
        <template v-if="s.node.id % 2 == 1">
          <v-layout fluid fill-height fill-width ma-0 pt-5 odd-content>
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
            <template v-if="s.node.name == 'products'">
              <v-layout column fluid justify-center class="hidden-sm-and-down">
                <span class="display-1 text-xs-center font-weight-strong pt-4">{{ productPost.title}}</span>
                <span class="body-1 text-xs-center pt-4 mb-3" v-html="productPost.content"></span>
                <v-container fluid layout align-center>
                  <v-layout row wrap product-detail justify-center fill-height fill-width align-start pl-3 style="overflow: hidden;">
                    <v-flex
                      xs3 md3 lg3 sm6 fill-width pb-2 pt-2 px-2 mx-1
                      v-for="product in productList"
                      :items="product"
                      v-bind:key="product.node.id">
                        <v-card tile flat color="#1C1B20" style="color: whitesmoke;">
                          <v-layout row wrap justify-center align-start fill-height>
                            <template v-if="product.node.asIcon">
                              <v-flex xs2>
                                <v-img :src="product.node.imageMain" max-height="100px" max-width="100px"/>
                              </v-flex>
                              <v-flex xs7>
                                <v-layout column wrap>
                                  <span class="body-2 text-xs-left text-xs-middle font-weight-strong ml-2 mb-1">{{ product.node.name}}</span>
                                  <span class="caption text-xs-left text-xs-middle ml-2">{{ product.node.summary }}</span>
                                </v-layout>
                              </v-flex>
                            </template>
                            <template v-else>
                              <v-layout column fixed wrap width="50%">
                                <span class="body-2 text-xs-left text-xs-middle font-weight-strong ml-3 mb-1">{{ product.node.name}}</span>
                                <span class="caption text-xs-left text-xs-middle ml-3">{{ product.node.summary }}</span>
                              </v-layout>
                            </template>
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
                      v-bind:key="product.node.id">
                        <v-card tile flat color="#1C1B20" style="color: whitesmoke;" class="hidden-sm-and-up">
                          <v-layout column wrap justify-center align-start fill-height>
                            <template v-if="product.node.asIcon">
                              <v-flex xs12 class="layout fill-width">
                                <v-img :src="product.node.imageMain" height="50px" width="50px"/>
                              </v-flex>
                              <v-flex xs12>
                                <v-layout column wrap>
                                  <span class="body-2 text-xs-center text-xs-middle font-weight-strong mt-2">{{ product.node.name}}</span>
                                </v-layout>
                              </v-flex>
                            </template>
                            <template v-else>
                              <v-layout column fixed wrap>
                                <span class="body-2 text-xs-center text-xs-middle font-weight-strong ml-3 mb-1">{{ product.node.name}}</span>
                                <span class="caption text-xs-center text-xs-middle ml-3">{{ product.node.summary }}</span>
                              </v-layout>
                            </template>
                          </v-layout>
                        </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-layout>
            </template>
            <template v-if="s.node.name == 'contacts'">
              <div class="pt-4">
                Contacts
              </div>
            </template>
        </v-layout>
        </template>
        <template v-else>
          <v-layout fluid fill-height fill-width ma-0 pt-5 even-content>
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
            <template v-if="s.node.name == 'products'">
              <v-layout column fluid justify-center class="hidden-sm-and-down">
                <span class="display-1 text-xs-center font-weight-strong pt-4">{{ productPost.title}}</span>
                <span class="body-1 text-xs-center pt-4 mb-3" v-html="productPost.content"></span>
                <v-container fluid layout align-center>
                  <v-layout row wrap product-detail justify-center fill-height fill-width align-start pl-3 style="overflow: hidden;">
                    <v-flex
                      xs3 md3 lg3 sm6 fill-width pb-2 pt-2 px-2 mx-1
                      v-for="product in productList"
                      :items="product"
                      v-bind:key="product.node.id">
                        <v-card tile flat color="#1C1B20" style="color: whitesmoke;">
                          <v-layout row wrap justify-center align-start fill-height>
                            <template v-if="product.node.asIcon">
                              <v-flex xs2>
                                <v-img :src="product.node.imageMain" max-height="100px" max-width="100px"/>
                              </v-flex>
                              <v-flex xs7>
                                <v-layout column wrap>
                                  <span class="body-2 text-xs-left text-xs-middle font-weight-strong ml-2 mb-1">{{ product.node.name}}</span>
                                  <span class="caption text-xs-left text-xs-middle ml-2">{{ product.node.summary }}</span>
                                </v-layout>
                              </v-flex>
                            </template>
                            <template v-else>
                              <v-layout column fixed wrap width="50%">
                                <span class="body-2 text-xs-left text-xs-middle font-weight-strong ml-3 mb-1">{{ product.node.name}}</span>
                                <span class="caption text-xs-left text-xs-middle ml-3">{{ product.node.summary }}</span>
                              </v-layout>
                            </template>
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
                      v-bind:key="product.node.id">
                        <v-card tile flat color="#1C1B20" style="color: whitesmoke;" class="hidden-sm-and-up">
                          <v-layout column wrap justify-center align-start fill-height>
                            <template v-if="product.node.asIcon">
                              <v-flex xs12 class="layout fill-width">
                                <v-img :src="product.node.imageMain" height="50px" width="50px"/>
                              </v-flex>
                              <v-flex xs12>
                                <v-layout column wrap>
                                  <span class="body-2 text-xs-center text-xs-middle font-weight-strong mt-2">{{ product.node.name}}</span>
                                </v-layout>
                              </v-flex>
                            </template>
                            <template v-else>
                              <v-layout column fixed wrap>
                                <span class="body-2 text-xs-center text-xs-middle font-weight-strong ml-3 mb-1">{{ product.node.name}}</span>
                                <span class="caption text-xs-center text-xs-middle ml-3">{{ product.node.summary }}</span>
                              </v-layout>
                            </template>
                          </v-layout>
                        </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-layout>
            </template>
            <template v-if="s.node.name == 'contacts'">
              <v-container column fluid justify-center align-start wrap mt-5 pa-0>
                <v-toolbar color="#1C1B20" flat fill-width depressed mt-5 style="color:whitesmoke; position: relative;">
                  <v-layout row wrap fill-width justify-center>
                    <v-toolbar-title class="title text-xs-header mr-5" v-text="item.contactSummary" />
                    <v-toolbar-items>
                       <v-btn>Contact Us</v-btn>
                    </v-toolbar-items>
                  </v-layout>
                </v-toolbar>
              </v-container>
            </template>
          </v-layout>
        </template>
      </ksvuefp-section>
    </ksvuefp>
  </div>
  </v-flex>
</template>

<page-query>
query getPageData {
  config: config(id:"1") {
    title
    id
    useIcons
    contentTitle
    useProducts
    productSectionId
    useContacts
    contactSummary
    contactSectionId
  },
  section: allSections(sortBy:"id", order:ASC) {
    edges {
      node {
        id
        title
        name
      }
    }
  },
  welcomePost: welcomePost(id:"1") {
    id
    title
    content
    coverImage
  },
  profilePost: profilePost(id:"1") {
    id
    title
    content
    coverImage
  },
  productPost: productPost(id:"1") {
    id
    title
    content
    coverImage
  },
  productList: allProductList(sortBy:"id", order:ASC) {
    edges {
      node {
        id
        asIcon
        imageMain
        name
        summary
      }
    }
  }
}
</page-query>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
	components: {
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
      miniVariant: false
    }
  },
  computed: {
    sections() {
      return this.$page.section.edges
    },
    item() {
      return this.$page.config
    },
    welcomePost() {
      return this.$page.welcomePost
    },
    profilePost() {
      return this.$page.profilePost
    },
    productPost() {
      return this.$page.productPost
    },
    productList() {
      return this.$page.productList.edges
    },
    sideMenu() {
      let sideMenu = []
      sideMenu.push({section_id: 0, name: 'Beranda'})
      sideMenu.push({section_id: 1, name: 'Tentang Kami'})

      console.log(this.item)

      if (this.item.useProducts){
        sideMenu.push({section_id: this.item.productSectionId, name: 'Produk'})
      }
      if (this.item.useContacts){
        sideMenu.push({section_id: this.item.contactSectionId, name: 'Hubungi Kami'})
      }

      return sideMenu
    }
  },
  mounted() {
    let Velocity = require('velocity-animate')
    let hammerjs = require('hammerjs')

    this.velocity = Velocity
    this.hammerjs = hammerjs
  },
  watch: {
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

</style>
