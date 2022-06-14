import axios, { AxiosRequestConfig, HeadersDefaults } from 'axios';
import { defineNuxtPlugin, useRuntimeConfig } from '#app';
import { useAuthStore } from '@store/auth';

export default defineNuxtPlugin(() => {
  /**
   * {
   *     baseURL: config.apiURL,
   *     timeout: 1000,
   *     headers: { 'Content-Type': 'application/json' },
   *   }
   */
  const apiClient = axios.create();
  
  return {
    provide: {
      makeRequest: async <T = any, R = Awaited<any>>(
        method: string,
        target: string,
        data?: T
      ) => {
        let result: R;
        if (method === 'get' ) {
         if(data){
          result = await $fetch(`${target}`, {
            method: `${method.toUpperCase()}`,
            params: data
          });
         }else{
          result = await $fetch(`${target}`, {
            method: `${method.toUpperCase()}`
          });
         }

        } else if (data) {
          result = await $fetch(`${target}`, {
            method: `${method.toUpperCase()}`,
            body: data,
          });
        } else {
          result = await $fetch(`${target}`, {
            method: `${method.toUpperCase()}`,
          });
        }
        if (result) {
          return result;
        }
        return null;
      },
      apiClient: async <T = any, R = Awaited<any>>(
        method: string,
        target: string,
        data?: T
      ) => {
        const configApp = useRuntimeConfig();
        const commonHeaders: HeadersDefaults = {
          common: { 'Content-Type': 'application/json' },
          delete: { 'Content-Type': 'application/json' },
          get: { 'Content-Type': 'application/json' },
          head: { 'Content-Type': '*' },
          post: { 'Content-Type': 'application/json' },
          put: { 'Content-Type': 'application/json' },
          patch: { 'Content-Type': 'application/json' },
        };

        apiClient.defaults.baseURL = configApp.public.API_URL;
        apiClient.defaults.headers = commonHeaders;


        let config: AxiosRequestConfig = {};

        const store = useAuthStore();
        const token = store.getAuthToken();
        let headers = null;


        if (token !== undefined) {
          headers = {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          };
        }

        if (method === 'get') {
          if (data) {
            config = {
              url: target,
              method: method.toLowerCase(),
              params: data,
            };
          } else {
            config = {
              url: target,
              method: method.toLowerCase(),
            };
          }
        } else if (data) {
          config = {
            url: target,
            method: method.toLowerCase(),
            data,
          };
        } else {
          config = {
            url: target,
            method: method.toLowerCase(),
          };
        }


        if (headers) {
          config.headers = headers;
        }

        const result: R = await apiClient.request(config);

        await Promise.resolve();

        if (result) {
          return result;
        }
        
        return null;
      },
    },
  };
});

// export const makeRequest = async <T>(method: string, target: string, data?: T) => {
//   await $fetch(`${target}`, {
//     method: `${method.toUpperCase()}`,
//     body: data
//   })
// }
