import Pusher from 'pusher-js';
import Echo from 'laravel-echo';
import { defineNuxtPlugin } from '#app';
import { useAuthStore } from '~~/store/auth';


export default defineNuxtPlugin(nuxtApp => {

      const authStore = useAuthStore()
      const token = authStore.getAuthToken()
      const config = useRuntimeConfig()

      if (!token) {
        navigateTo('/login')
        return;
      }

      const echoConfig = {
        broadcaster: 'pusher',
        key: config.public.PUSHER_APP_KEY,
        cluster: config.public.PUSHER_APP_CLUSTER,
        forceTLS: true,
        authEndpoint: config.public.CMS_URL + '/broadcasting/auth',
        encrypted: true,
        auth: {
          headers: {
            Authorization: `Bearer ${token}`,
            'Accept': 'application/json'
          }
        }
      };
  
      const pusher = new Pusher(config.public.PUSHER_APP_KEY, 
        {
          cluster: config.public.PUSHER_APP_CLUSTER,
          authEndpoint: config.public.CMS_URL + '/broadcasting/auth',
          auth: {
            headers: {
              Authorization: `Bearer ${token}`,
              'Accept': 'application/json'
            }
          },
        }
      );
  
      const echo = new Echo(echoConfig);
        
      nuxtApp.provide("pusherClient", pusher)
      nuxtApp.provide("echoClient", echo)
  
      // nuxtApp.vueApp.provide("pusherClient", pusher)
      // nuxtApp.vueApp.provide("echoClient", echo)
    
})


