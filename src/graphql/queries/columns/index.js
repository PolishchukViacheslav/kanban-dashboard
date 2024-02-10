import { gql, useQuery } from '@apollo/client';

const GET_ALL_COLUMNS = gql`
  query getAllColuns($perPage: Int!) {
    allColumns(perPage: $perPage) {
      ...ColumnDetailsFragment
    }
  }
`;

const useGetAllColumnsQuery = () => {
  return useQuery(GET_ALL_COLUMNS, {
    variables: {
      perPage: 1,
    },
  });
};

export { useGetAllColumnsQuery };
