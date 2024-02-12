import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createFragmentRegistry } from '@apollo/client/cache';
import fragments from '@graphql/fragments';

export const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache({
    fragments: createFragmentRegistry(...fragments),
  }),
});
