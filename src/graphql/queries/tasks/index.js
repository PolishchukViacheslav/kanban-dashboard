import { gql, useQuery } from '@apollo/client';

const GET_ALL_TASKS = gql`
  query getAllTasks($perPage: Int, $filter: TaskFilter) {
    allTasks(perPage: $perPage, filter: $filter) {
      ...TaskDetailsFragment
    }
  }
`;

const useGetAllTasksQuery = (variables) => {
  return useQuery(GET_ALL_TASKS, {
    variables: variables || { perPage: 1 },
  });
};

export { useGetAllTasksQuery };
