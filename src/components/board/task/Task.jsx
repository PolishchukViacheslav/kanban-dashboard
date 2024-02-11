import Button from '@/components/UI/Button';
import ButtonRounded from '@/components/UI/ButtonRounded';
import { useModal } from '@/components/modal/ModalProvider';
import { TASK_MODAL } from '@/features/constants';
import { useDeleteTaskMutation } from '@/graphql/queries/tasks';
import { Draggable } from 'react-beautiful-dnd';

const Task = ({ title, id, status, order, description, index }) => {
  const { openModal, setModalName, setModalContentProperties } = useModal();

  const [deleteTask, { loading }] = useDeleteTaskMutation(status);
  const handleDeleteTask = () => {
    deleteTask({ variables: { id } });
  };
  const handleUpdateTask = () => {
    setModalName(TASK_MODAL);
    openModal();
    setModalContentProperties({
      title,
      id,
      status,
      order,
      description,
      isUpdate: true,
    });
  };
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`relative flex-1 h-1/2 rounded overflow-hidden mb-4 last:mb-0 bg-blue-600 p-8`}
        >
          <div className="absolute top-2 right-14">
            <Button label={'Edit'} onClick={handleUpdateTask} />
          </div>
          <div className="absolute top-2 right-2">
            <ButtonRounded label={'x'} danger onClick={handleDeleteTask} />
          </div>
          {title}
          <div className="flex flex-col mt-4">
            <div className="text-gray-400 font-semibold">Description</div>
            <div>{description}</div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
