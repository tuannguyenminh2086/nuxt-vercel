import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from "@apollo/client/core";

const logLink = new ApolloLink((operation, forward) => {
    // console.log(operation.getContext());

    return forward(operation).map((data)=>{
        // console.log(data)
        return data;
    });
});
export const httpLink = createHttpLink({
    uri: `${process.env.NUXT_API_GRAPHQL_URL}`
});

// Cache implementation
const cache = new InMemoryCache({
    addTypename: false,
  })
const linkFinal = logLink.concat(httpLink);
// Create the apollo client
const graphqlClient = new ApolloClient({
    link: linkFinal,
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


export default graphqlClient
