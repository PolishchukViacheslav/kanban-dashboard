import { gql } from '@apollo/client';

export const TaskFragment = gql`
  fragment TaskDetailsFragment on Task {
    id
    title
    description
    status
    order
  }
`;
