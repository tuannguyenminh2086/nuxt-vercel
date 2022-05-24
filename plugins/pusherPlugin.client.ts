import { defineNuxtPlugin } from '#app';
import Pusher from 'pusher-js';
import Echo from 'laravel-echo';
import { useAuthStore } from '~~/store/auth';


export default defineNuxtPlugin(nuxtApp => {

      const authStore = useAuthStore()
      const token = authStore.getAuthToken()
      const config = useRuntimeConfig()

      if (config && token) {
        const echoConfig = {
          broadcaster: 'pusher',
          key: config.public.PUSHER_APP_KEY,
          cluster: config.public.PUSHER_APP_CLUSTER,
          authEndpoint: config.public.CMS_URL +  '/broadcasting/auth',
          auth: {
            headers: {
              Authorization: `Bearer ${token}`,
             'Accept': 'application/json'
            }
          },
          forceTLS: false
        };
    
        const pusher = new Pusher(config.public.PUSHER_APP_KEY, 
          {
            cluster: config.public.PUSHER_APP_CLUSTER,
            authEndpoint: config.public.CMS_URL + '/broadcasting/auth'
          }
        );
    
        const echo = new Echo(echoConfig);
    
        nuxtApp.provide("pusherClient", pusher)
        nuxtApp.provide("echoClient", echo)
    
        nuxtApp.vueApp.provide("pusherClient", pusher)
        nuxtApp.vueApp.provide("echoClient", echo)
      }
  
    
  
})


