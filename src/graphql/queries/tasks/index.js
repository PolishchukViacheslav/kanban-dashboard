import { TaskFragment } from '@/graphql/fragments/Task';
import { gql, useMutation, useQuery } from '@apollo/client';

const GET_ALL_TASKS = gql`
  query GetAllTasks($perPage: Int, $filter: TaskFilter) {
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

const CREATE_TASK = gql`
  mutation CreateTask(
    $title: String!
    $description: String!
    $status: String!
    $order: Int!
  ) {
    createTask(
      title: $title
      description: $description
      status: $status
      order: $order
    ) {
      ...TaskDetailsFragment
    }
  }
`;

const updateCache =
  (status) =>
  (cache, { data }) => {
    const existingTasks = cache.readQuery({
      query: GET_ALL_TASKS,
      variables: { filter: { status } },
    });

    const newTask = data.createTask;

    cache.writeQuery({
      query: GET_ALL_TASKS,
      variables: { filter: { status } },
      data: { allTasks: [...existingTasks?.allTasks, newTask] },
    });
  };
const useCreateTaskMutation = (status) => {
  return useMutation(CREATE_TASK, {
    update: updateCache(status),
  });
};

const UPDATE_TASK = gql`
  mutation UpdateTask(
    $id: ID!
    $title: String
    $description: String
    $status: String
    $order: Int
  ) {
    updateTask(
      id: $id
      title: $title
      description: $description
      status: $status
      order: $order
    ) {
      ...TaskDetailsFragment
    }
  }
`;
const useUpdateTaskMutation = () => {
  return useMutation(UPDATE_TASK);
};

const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    removeTask(id: $id) {
      id
    }
  }
`;
const useDeleteTaskMutation = (status) => {
  return useMutation(DELETE_TASK, {
    refetchQueries: [
      {
        query: GET_ALL_TASKS,
        variables: { filter: { status } },
      },
    ],
  });
};

export {
  useGetAllTasksQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useCreateTaskMutation,
};
