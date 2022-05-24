import { defineNuxtPlugin } from '#app'
import mitt from 'mitt'


export default defineNuxtPlugin((nuxtApp) => {

  if (process.client) {
    const emitter = mitt()
    nuxtApp.provide('bus', {
      $on: emitter.on,
      $emit: emitter.emit,
    })
  }
  
})

