
import {ApolloClient, ApolloLink, createHttpLink, InMemoryCache} from "@apollo/client/core";
// import { setContext} from "@apollo/client/link/context";


// const authLink = setContext(async (_, {headers}) => {
//     const store = useLottiStore();
//     const token = await store.getAuthToken();
    
//     return {
//         headers: {
//             ...headers,
//             Authorization: token ? `Bearer ${token}` : null
//         }
//     }
// })

const httpLink = createHttpLink({
    uri: 'https://lottie-backend.absolutagentur.ch/graphql'
  });

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const cmsClient = new ApolloClient({
    link: ApolloLink.from([httpLink]),
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
