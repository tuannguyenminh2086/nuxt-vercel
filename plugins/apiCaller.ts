import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      makeRequest: async <T = any, R = Awaited<any>>(method: string, target: string, data?: T) => {
        let result: R
        if (method === 'get') {
          result = await $fetch(`${target}`, {
            method: `${method.toUpperCase()}`
          })
        } else if (data) {
          result = await $fetch(`${target}`, {
            method: `${method.toUpperCase()}`,
            body: data
          })
        } else {
          result = await $fetch(`${target}`, {
            method: `${method.toUpperCase()}`
          })
        }
        if (result) {
          return result
        }
        return null;
      }
    }
  }
})


// export const makeRequest = async <T>(method: string, target: string, data?: T) => {
//   await $fetch(`${target}`, {
//     method: `${method.toUpperCase()}`,
//     body: data
//   })
// }
