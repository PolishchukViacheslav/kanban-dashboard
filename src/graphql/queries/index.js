import { useGetAllColumnsQuery as useGetAllColumnsQueryPrime } from './columns';
import { useGetAllTasksQuery as useGetAllTasksQueryPrime } from './tasks';

const queriesMap = {
  hooks: {
    useGetAllColumnsQuery: useGetAllColumnsQueryPrime,
    useGetAllTasksQuery: useGetAllTasksQueryPrime,
  },
};

export const { useGetAllColumnsQuery, useGetAllTasksQuery } = queriesMap.hooks;

export default queriesMap;
