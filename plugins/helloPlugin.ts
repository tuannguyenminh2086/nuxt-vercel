export default defineNuxtPlugin((_nuxtApp) => {
  // Doing something with nuxtApp
  return {
    provide: {
      hello: () => 'world  TUNA',
    },
  }
})
