
import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import { useAuthStore } from "~~/store/auth";

const authLink = setContext((_, {headers}) => {
    const store = useAuthStore();
    const token = store.getAuthToken();
    
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : null
        }
    }
})

const httpLink = createHttpLink({
    uri: 'https://lottie-backend.absolutagentur.ch/graphql'
  });

// Cache implementation
const cache = new InMemoryCache()

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


export default cmsClient
