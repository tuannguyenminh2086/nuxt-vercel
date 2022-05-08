import { defineNuxtPlugin } from "#app"
import { DefaultApolloClient, provideApolloClient } from "@vue/apollo-composable"
import cmsClient from "~~/apollo/cmsClient";


export default defineNuxtPlugin((nuxtApp) => {

  // const httpLink = createHttpLink({
  //   uri: process.env.GRAPHQL_URL
  // });

  // // Cache implementation
  // const cache = new InMemoryCache()

  // let apolloClient: ApolloClient<any>;

  // // if (process.server) {

  //   apolloClient = new ApolloClient({
  //     link: ApolloLink.from([httpLink]),
  //     cache,
  //     ssrMode: true,
  //     defaultOptions: {
  //       watchQuery: {
  //           fetchPolicy: 'cache-and-network',
  //           errorPolicy: 'all',
  //       },
  //       query: {
  //           fetchPolicy: 'network-only',
  //           errorPolicy: 'all',
  //       }
  //     },
  //     connectToDevTools: true,
  //     resolvers: {},
  //   });

  //   // nuxtApp.hook("app:rendered", () => {
  //   //   nuxtApp.payload.data!.apollo = apolloClient.extract();
  //   // });

  // // } else {
  // //   cache.restore(nuxtApp.payload.data!.apollo)
  // //   apolloClient = new ApolloClient({
  // //     link: httpLink,
  // //     cache,
  // //   })
  // // }

  provideApolloClient(cmsClient);
  nuxtApp.provide("apollo", { DefaultApolloClient, cmsClient });

})
