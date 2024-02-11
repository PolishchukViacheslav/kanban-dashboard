import {
  useGetAllTasksQuery,
  useUpdateTaskMutation,
} from '@/graphql/queries/tasks';
import { useEffect, useMemo, useState } from 'react';
import Task from '../task/Task';
import AddTask from '../AddTask';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

export const Column = ({ title, name }) => {
  const tasksFilter = useMemo(() => ({ filter: { status: name } }), [name]);
  const [updateTask] = useUpdateTaskMutation();
  const { data } = useGetAllTasksQuery(tasksFilter);
  const [tasks, setTasks] = useState(data?.allTasks || []);
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };
  useEffect(() => {
    setTasks(data?.allTasks || []);
  }, [data]);
  return (
    <div className="relative flex flex-col flex-1 h-full border-r-2 border-gray-700 last:border-none">
      <div className="w-100 py-2 px-4 bg-blue-600 font-semibold">{title}</div>
      <div className="mt-1 p-4 flex-1 overflow-y-scroll">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={'droppAbleTasks'}>
            {(provided) => (
              <div
                className="mb-4"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {data &&
                  tasks.map((task, idx) => (
                    <Task key={task.id} {...task} index={idx} />
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="sticky bottom-0 right-0 w-8 rounded-full ml-auto bg-blue-600 font-semibold">
          <AddTask status={name} order={data?.allTasks?.length} />
        </div>
      </div>
    </div>
  );
};

export default Column;
