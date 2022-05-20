// import urql, { createClient } from '@urql/vue'
import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import { defineNuxtPlugin } from '#app'
import { useAuthStore } from '@store/auth'

export default defineNuxtPlugin(nuxtApp => {
  const authStore = useAuthStore();
  const token = authStore.getAuthToken();
  const config = useRuntimeConfig();

  const authLink = setContext((_, {headers}) => {
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`
      }
    }
  })

  const httpLink = createHttpLink({
    uri: `${config.public.GRAPHQL_URL}`
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
  // const client = createClient({
  //   url: `${config.public.GRAPHQL_URL}`,
  //   fetchOptions: () => {
  //     return {
  //       headers: { authorization: token ? `Bearer ${token}` : '' }
  //     }
  //   }
  // })
  // nuxtApp.provide('graphqlClient',client);
  // nuxtApp.vueApp.use(urql, {
  //   url: `${config.public.GRAPHQL_URL}`,
  //   fetchOptions: () => {
  //     return {
  //       headers: { authorization: token ? `Bearer ${token}` : '' }
  //     }
  //   }
  // })
})
  