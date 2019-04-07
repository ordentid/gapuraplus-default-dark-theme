<template>
  <v-flex
    xs12
    pa-0
    ma-0
  >
  <div id="app">
    <ksvuefp :options="options" :sections="sections">
      <v-toolbar
        :clipped-left="clipped"
        :color="'#1C1B20'"
        fixed
        app
        flat
        height='70%'
      >
        <v-layout xs12 justify-center align-center>
          <template v-if="item.use_icons">
            <v-btn
              icon
              @click.stop="miniVariant = !miniVariant"
            >
              <v-icon>{{ `chevron_${miniVariant ? 'right' : 'left'}` }}</v-icon>
            </v-btn>
          </template>
          <template v-else>
            <v-toolbar-title class="title default-color" @click.prevent="$ksvuefp.$emit('ksvuefp-nav-click', {nextIndex: 0})">{{ item.content_title }}</v-toolbar-title>
          </template>
          <v-btn flat depressed color="white" @click.prevent="$ksvuefp.$emit('ksvuefp-nav-click', {nextIndex: 1})">
            ABOUT US
          </v-btn>
          <template v-if="item.use_products">
            <v-btn flat depressed color="white" @click.prevent="$ksvuefp.$emit('ksvuefp-nav-click', {nextIndex: item.product_section_id})">
              PRODUCTS
            </v-btn>
          </template>
           <template v-if="item.use_contacts">
            <v-btn flat depressed color="white" @click.prevent="$ksvuefp.$emit('ksvuefp-nav-click', {nextIndex: item.contact_section_id})">
              CONTACT US
            </v-btn>
          </template>
        </v-layout>
      </v-toolbar>
      <ksvuefp-section
        v-for="(s,index) in sections"
        :section="s"
        :key="s.id"
        :section-index="index">
        <template v-if="s.id % 2 == 1">
          <v-layout fluid fill-height fill-width ma-0 pt-5 odd-content>
            <template v-if="s.name == 'home'">
              <template v-if="welcomePost.cover_image !== null && welcomePost.cover_image !== undefined">
                <v-parallax
                  dark
                  :src="welcomePost.cover_image"
                  class="cover-image-full"
                  height="100%">
                    <v-layout column wrap justify-center align-center>
                      <span class="display-3 font-weight-strong mb-5">{{ welcomePost.title}}</span>
                      <span class="subheading text-xs-center" v-html="welcomePost.content" />
                    </v-layout>
                </v-parallax>
              </template>
              <template v-else>
                <v-layout column wrap justify-center align-center>
                  <span class="display-3 font-weight-strong mb-5">{{ welcomePost.title}}</span>
                  <span class="subheading text-xs-center" v-html="welcomePost.content" />
                </v-layout>
              </template>
            </template>
            <template v-if="s.name == 'profile'">
              <v-layout row>
                <v-layout column wrap justify-left align-left pl-4 pt-5>
                  <span class="display-3 font-weight-strong mb-5">{{ profilePost.title}}</span>
                  <span class="subheading" v-html="profilePost.content" />
                </v-layout>
                <v-parallax
                  dark
                  :src="profilePost.cover_image"
                  class="cover-image-not-full"
                  height="100%"/>
              </v-layout>
            </template>
            <!-- <template v-if="s.name == 'products'">
              <v-layout column fluid justify-center>
                <span class="display-1 text-xs-center font-weight-strong pt-4">{{ productPost.title}}</span>
                <span class="body-1 text-xs-center pt-4 mb-3" v-html="productPost.content"></span>
                <v-container fluid layout align-center>
                  <v-layout row wrap product-detail justify-center fill-height fill-width align-start pl-3>
                    <v-flex
                      xs3 md3 lg3 sm6 fill-width pb-2 pt-2 px-2 mx-1
                      v-for="product in productList"
                      :items="product"
                      v-bind:key="product.id">
                        <v-card tile flat color="#1C1B20" style="color: whitesmoke;">
                          <v-layout row wrap justify-center align-start fill-height>
                            <template v-if="product.as_icon">
                              <v-flex xs2>
                                <v-img :src="product.image_main" max-height="50px" max-width="50px"/>
                              </v-flex>
                              <v-flex xs7>
                                <v-layout column wrap>
                                  <span class="body-2 text-xs-left text-xs-middle font-weight-strong ml-2 mb-1">{{ product.name}}</span>
                                  <span class="caption text-xs-left text-xs-middle ml-2">{{ product.summary }}</span>
                                </v-layout>
                              </v-flex>
                            </template>
                            <template v-else>
                              <v-layout column fixed wrap width="50%">
                                <span class="body-2 text-xs-left text-xs-middle font-weight-strong ml-3 mb-1">{{ product.name}}</span>
                                <span class="caption text-xs-left text-xs-middle ml-3">{{ product.summary }}</span>
                              </v-layout>
                            </template>
                          </v-layout>
                        </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-layout>
            </template>
            <template v-if="s.name == 'contacts'">
              <div class="pt-4">
                Contacts
              </div>
            </template> -->
        </v-layout>
        </template>
        <template v-else>
          <v-layout fluid fill-height fill-width ma-0 pt-5 even-content>
            <template v-if="s.name == 'home'">
              <template v-if="welcomePost.cover_image !== null && welcomePost.cover_image !== undefined">
                <v-parallax
                  dark
                  :src="welcomePost.cover_image"
                  class="cover-image-full"
                  height="100%">
                    <v-layout column wrap justify-center align-center>
                      <span class="display-3 font-weight-strong mb-5">{{ welcomePost.title}}</span>
                      <span class="subheading text-xs-center" v-html="welcomePost.content" />
                    </v-layout>
                </v-parallax>
              </template>
              <template v-else>
                <v-layout column wrap justify-center align-center>
                  <span class="display-3 font-weight-strong mb-5">{{ welcomePost.title}}</span>
                  <span class="subheading text-xs-center" v-html="welcomePost.content" />
                </v-layout>
              </template>
            </template>
            <template v-if="s.name == 'profile'">
              <v-layout row>
                <v-layout column wrap justify-left align-left pl-4 pt-5>
                  <span class="display-3 font-weight-strong mb-5">{{ profilePost.title}}</span>
                  <span class="subheading" v-html="profilePost.content" />
                </v-layout>
                <v-parallax
                  dark
                  :src="profilePost.cover_image"
                  class="cover-image-not-full"
                  height="100%"/>
              </v-layout>
            </template>
            <!-- <template v-if="s.name == 'products'">
              <v-layout column fluid justify-center>
                <span class="display-1 text-xs-center font-weight-strong pt-4">{{ productPost.title}}</span>
                <span class="body-1 text-xs-center pt-4 mb-3" v-html="productPost.content"></span>
                <v-container fluid layout align-center>
                  <v-layout row wrap product-detail justify-center fill-height fill-width align-start pl-3>
                    <v-flex
                      xs3 md3 lg3 sm6 fill-width pb-2 pt-2 px-2 mx-1
                      v-for="product in productList"
                      :items="product"
                      v-bind:key="product.id">
                        <v-card tile flat color="#1C1B20" style="color: whitesmoke;">
                          <v-layout row wrap justify-center align-start fill-height>
                            <template v-if="product.as_icon">
                              <v-flex xs2>
                                <v-img :src="product.image_main" max-height="50px" max-width="50px"/>
                              </v-flex>
                              <v-flex xs7>
                                <v-layout column wrap>
                                  <span class="body-2 text-xs-left text-xs-middle font-weight-strong ml-2 mb-1">{{ product.name}}</span>
                                  <span class="caption text-xs-left text-xs-middle ml-2">{{ product.summary }}</span>
                                </v-layout>
                              </v-flex>
                            </template>
                            <template v-else>
                              <v-layout column fixed wrap width="50%">
                                <span class="body-2 text-xs-left text-xs-middle font-weight-strong ml-3 mb-1">{{ product.name}}</span>
                                <span class="caption text-xs-left text-xs-middle ml-3">{{ product.summary }}</span>
                              </v-layout>
                            </template>
                          </v-layout>
                        </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-layout>
            </template>
            <template v-if="s.name == 'contacts'">
              <v-container column fluid justify-center align-start wrap mt-5 pa-0>
                <v-toolbar color="#1C1B20" flat fill-width depressed mt-5 style="color:whitesmoke; position: relative;">
                  <v-layout row wrap fill-width justify-center>
                    <v-toolbar-title class="title text-xs-header mr-5" v-text="item.contact_summary" />
                    <v-toolbar-items>
                       <v-btn>Contact Us</v-btn>
                    </v-toolbar-items>
                  </v-layout>
                </v-toolbar>
              </v-container>
            </template> -->
          </v-layout>
        </template>
      </ksvuefp-section>
    </ksvuefp>
  </div>
  </v-flex>
</template>

<page-query>
query getUserConfig {
  config: config {
    useIcons
    contentTitle,
    useProducts
    productSectionId
    useContacts
    contactSummary
    contactSectionId
  }
}
</page-query>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  data() {
    return {
      options: {
        duration: 1000,
        easing: [1, 0, 0, 1],
        loopBottom: false,
        preloaderEnabled: true,
        preloaderBgColor: '#fff',
        preloaderColor: '#212121',
        dotNavEnabled: false,
        parallax: true
      }
    }
  },
  computed: {
    currentIndex() {
      return this.$ksvuefp.currentIndex
    },
    sections() {
      return this.$page.sections
    },
    item() {
      return this.$store.state.config.Item
    },
    welcomePost() {
      return this.$store.state.post.Welcome
    },
    profilePost() {
      return this.$store.state.post.Profile
    },
    productPost() {
      return this.$store.state.post.Product
    },
    productList() {
      return this.$store.state.product.Products
    }
  },
  mounted() {
    // this.$store.dispatch('config/fetchItem')
    // this.$store.dispatch('post/fetchWelcome')
    // console.log(this.$page.config)
  },
  watch: {
    currentIndex: function(newIndex, oldIndex) {
      if (newIndex == 1){
        this.$store.dispatch('post/fetchProfile')
      } else if (newIndex == 0){
        this.$store.dispatch('post/fetchWelcome')
      } else if (newIndex == this.item.product_section_id){
        this.$store.dispatch('post/fetchProduct')
        this.$store.dispatch('product/fetchProducts')
      } else if (newIndex == this.item.contact_section_id){

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
