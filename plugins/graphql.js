import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import { defineNuxtPlugin } from '#app'
import { useAuthStore } from '../store/auth'

export default defineNuxtPlugin(nuxtApp => {
      const authStore = useAuthStore();
      const token = authStore.getAuthToken();

      const config = useRuntimeConfig();
      
      if (!token) return;

      if (config) {
          const authLink = setContext((_, {headers}) => {
            return {
              headers: {
                ...headers,
                Authorization: `Bearer ${token}`
              }
            }
          })
    
          const httpLink = createHttpLink({
            uri: config.graphqlURL ? config.graphqlURL : 'https://lottie-backend.absolutagentur.ch/graphql'
          });
    
        // Cache implementation
          const cache = new InMemoryCache({
            addTypename: false,
          })
    
        // Create the apollo client
          const cmsClient = new ApolloClient({
            link: ApolloLink.from([ authLink, httpLink ]),
            cache,
            defaultOptions: {
              watchQuery: {
                fetchPolicy: 'cache-and-network',
                errorPolicy: 'all',
              },
              query: {
                fetchPolicy: 'network-only',
                errorPolicy: 'all',
              }
            },
            connectToDevTools: true,
            resolvers: {},
          })
    
          nuxtApp.provide('graphqlClient',cmsClient);
      }
      

})
  