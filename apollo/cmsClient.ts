import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { useAuthStore } from '~~/store/auth';

const authLink = setContext((_, { headers }) => {
  const store = useAuthStore();
  const token = store.getAuthToken();
  if (token !== undefined) {
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }
  return {
    headers: {
      ...headers,
    },
  };
});

const httpLink = createHttpLink({
  uri: 'http://lottie.max26292.tk/graphql',
});

// Cache implementation
const cache = new InMemoryCache({
  addTypename: false,
});

// Create the apollo client
const cmsClient = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
  connectToDevTools: true,
  resolvers: {},
});

export default cmsClient;
