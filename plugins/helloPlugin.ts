export default defineNuxtPlugin(nuxtApp => {
  // Doing something with nuxtApp
  return {
    provide: {
      hello: () => 'world  TUNA'
    }
  }
})
