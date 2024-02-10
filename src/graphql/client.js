import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { createFragmentRegistry } from '@apollo/client/cache';
import fragments from '@graphql/fragments';

export const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache({
    fragments: createFragmentRegistry(...fragments),
  }),
});
