// apollo.js

import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { createApolloProvider } from '@vue/apollo-option';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:8080/v1/graphql',
  cache: new InMemoryCache(),
  headers: {
    'x-hasura-admin-secret': 'your-secret-here' // Replace with your Hasura admin secret
  }
});

export const apolloProvider = createApolloProvider({
  defaultClient: apolloClient
});

export { apolloClient };


// This setup can be used in your main.js or main.ts to provide Apollo Client to your Vue app


// import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';

// const httpLink = createHttpLink({
//   uri: process.env.VITE_HASURA_GRAPHQL_ENDPOINT,
// });

// const apolloClient = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache(),
// });

// export default apolloClient;
