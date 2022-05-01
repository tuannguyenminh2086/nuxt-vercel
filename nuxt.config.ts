import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  typescript: {
    strict: true,
    shim: false,
  },
  modules: [
    '@pinia/nuxt',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    // Doc: https://github.com/nuxt-community/color-mode-module
    '@nuxtjs/color-mode',
    // Doc: https://github.com/vueuse/vueuse
    '@vueuse/nuxt',
    // Doc: https://github.com/nuxt-community/pwa-module
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/localforage-module
    '@pinia/nuxt',
  ],
  tailwindcss: {
    jit: true,
    // add '~tailwind.config` alias
    exposeConfig: true,
  },
  colorMode: {
    classSuffix: '',
  },
  localforage: {
    /* module options */
  },
  publicRuntimeConfig: {
    CMS_URL: process.env.CMS_URL,
  },
})
