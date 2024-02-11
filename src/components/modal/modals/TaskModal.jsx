import React, { useDebugValue, useEffect } from 'react';
import { useModal } from '../ModalProvider';
import Task from '@/components/board/task/Task';
import ButtonRounded from '@/components/UI/ButtonRounded';
import { useDebounce } from '@/features/hooks';
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from '@/graphql/queries/tasks';
import toast from 'react-hot-toast';

const TaskModal = () => {
  const {
    isModalOpen,
    openModal,
    closeModal,
    setModalName,
    modalName,
    modalContentProperties,
  } = useModal();
  const { status, order, description, id, isUpdate, title } =
    modalContentProperties;
  const [titleValue, setTitleValue] = useDebounce(title || '', 500);
  const [descriptionValue, setDescriptionValue] = useDebounce(
    description || '',
    500,
  );
  const [createTask, { data, error, loading, reset }] =
    useCreateTaskMutation(status);
  const [updateTask] = useUpdateTaskMutation();

  const isDisabledCreateBtn =
    loading || !(titleValue.trim() && descriptionValue.trim());

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'title':
        setTitleValue(value);
        break;
      case 'description':
        setDescriptionValue(value);
        break;
      default:
        break;
    }
  };

  const handleCreateTask = () => {
    if (isUpdate) {
      updateTask({
        variables: {
          id,
          title: titleValue,
          description: descriptionValue,
          status,
          order,
        },
      }).then(() => {
        closeModal();
      });
      return;
    }
    createTask({
      variables: {
        title: titleValue,
        description: descriptionValue,
        status,
        order,
      },
    }).then(() => {
      closeModal();
    });
  };

  useEffect(() => {
    if (error) {
      reset();
      toast.error('Something go wrong, please try again later');
    }
  }, [error]);

  return (
    <div className="bg-blue-600 w-1/5 p-4 rounded-md flex flex-col">
      <div className="flex justify-end">
        <ButtonRounded label="x" onClick={closeModal} />
      </div>
      <input
        value={titleValue}
        onChange={handleChange}
        name="title"
        className="pl-2 sw-full mt-4 h-6 rounded-md border-2 border-blue-400 focus:outline-none required:border-red-500 bg-white text-gray-900"
        type="text"
        placeholder="Add task title"
      />
      <textarea
        value={descriptionValue}
        onChange={handleChange}
        name="description"
        className="pl-2 sw-full mt-4 rounded-md border-2 border-blue-400 focus:outline-none required:border-red-500 bg-white text-gray-900"
        placeholder="Add task description"
        rows={3}
      />
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          className="bg-gray-400 hover:bg-red-200 text-white font-bold py-2 transition background-color duration-200 ease-linear"
          onClick={closeModal}
        >
          Close
        </button>
        <button
          onClick={handleCreateTask}
          disabled={isDisabledCreateBtn}
          type="button"
          className="disabled:opacity-75 disabled:cursor-not-allowed bg-green-500 hover:bg-green-400 text-white font-bold py-2 ml-4 transition background-color duration-200 ease-linear"
        >
          {isUpdate ? 'Update' : 'Create'}
        </button>
      </div>
    </div>
  );
};

export default TaskModal;
