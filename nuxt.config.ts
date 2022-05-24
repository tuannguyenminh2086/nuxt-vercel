import { resolve } from 'path'
import { defineNuxtConfig } from 'nuxt3';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  typescript: {
    strict: true,
    shim: false,
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    // Doc: https://github.com/nuxt-community/color-mode-module
    '@nuxtjs/color-mode',
    // Doc: https://github.com/vueuse/vueuse
    '@vueuse/nuxt',
    // Doc: https://github.com/nuxt-community/pwa-module
    '@nuxtjs/pwa',
    // Doc: https://github.com/cipami/nuxt-lodash#readme
    'nuxt-lodash',
    // Doc: https://github.com/formkit/formkit
    '@formkit/nuxt'
  ],
  build: {
    transpile: [
      '@apollo/client',
      'ts-invariant/process'
    ],
  },
  components: {
    global: true,
    dirs: ['~/components'],
  },
  css: ['~/assets/scss/app.scss'],
  vueuse: {
    ssrHandlers: true,
  },
  lodash: {
    prefix: 'use',
    prefixSkip: ['is'],
    exclude: ['map'],
    alias: [
      ['camelCase', 'stringToCamelCase'], // => useStringToCamelCase
      ['kebabCase', 'stringToKebabCase'], // => useStringToKebabCase
    ]
  },
  router: {
    middleware: [ 'auth' ]
  },
  alias: {
    '@store': resolve(__dirname,'./store')
  },
  publicRuntimeConfig: {
    CMS_URL: process.env.NUXT_API_CMS_URL,
    GRAPHQL_URL: process.env.NUXT_API_GRAPHQL_URL,
    API_URL: process.env.NUXT_API_URL,
    PUSHER_APP_KEY: process.env.NUXT_API_PUSHER_APP_KEY,
    PUSHER_APP_CLUSTER: process.env.NUXT_API_PUSHER_APP_CLUSTER
  }
})
