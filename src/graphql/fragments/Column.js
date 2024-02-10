import { gql } from '@apollo/client';

export const ColumnFragment = gql`
  fragment ColumnDetailsFragment on Column {
    id
    title
    name
  }
`;
