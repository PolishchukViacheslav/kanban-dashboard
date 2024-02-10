import { useGetAllTasksQuery } from '@/graphql/queries/tasks';
import { useMemo } from 'react';
import Task from '../task/Task';

export const Column = ({ title, name }) => {
  const tasksFilter = useMemo(() => ({ filter: { status: name } }), [name]);
  const { data } = useGetAllTasksQuery(tasksFilter);
  return (
    <div className="flex flex-col flex-1 h-full border-r-2 border-gray-700 last:border-none">
      <div className="w-100 py-2 px-4 bg-blue-600 font-semibold">{title}</div>
      <div className="mt-1 p-4 flex-1 h-full overflow-y-scroll">
        {data &&
          data?.allTasks?.map((task) => <Task key={task.id} {...task} />)}
      </div>
    </div>
  );
};

export default Column;
