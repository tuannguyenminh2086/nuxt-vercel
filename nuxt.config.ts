import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  typescript: {
    strict: true,
    shim: false,
  },
  modules: [
    '@pinia/nuxt',
    // Doc: https://github.com/nuxt-community/color-mode-module
    '@nuxtjs/color-mode',
    // Doc: https://github.com/vueuse/vueuse
    '@vueuse/nuxt',
    // Doc: https://github.com/nuxt-community/pwa-module
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/localforage-module
  ],
  buildModules: [
    '@nuxtjs/tailwindcss',
    [
      'unplugin-icons/nuxt',
      {
        /* options */
      },
    ],
  ],
  components: {
    global: true,
    dirs: ['~/components'],
  },
  css: ['~/assets/scss/app.scss'],
  localforage: {
    /* module options */
  },
  vueuse: {
    ssrHandlers: true,
  },
  publicRuntimeConfig: {
    CMS_URL: process.env.CMS_URL,
    GRAPHQL_URL: process.env.GRAPHQL_URL,
    API_URL: process.env.API_URL,
    PUSHER_APP_KEY: process.env.PUSHER_APP_KEY,
    PUSHER_APP_CLUSTER: process.env.PUSHER_APP_CLUSTER,
    GQL_HOST: process.env.GRAPHQL_URL,
  },
})
