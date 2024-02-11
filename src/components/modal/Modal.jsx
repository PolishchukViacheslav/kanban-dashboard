import React, { Suspense, useEffect } from 'react';
import { useModal } from './ModalProvider';
import { TASK_MODAL } from '@/features/constants';

const TaskModal = React.lazy(() => import('./modals/TaskModal'));

const Modal = () => {
  const { isModalOpen, modalName, closeModal } = useModal();
  const renderModalContent = () => {
    switch (true) {
      case modalName === TASK_MODAL: {
        return <TaskModal />;
      }
      default:
        'Hello';
    }
  };

  const handleWrapperClick = (event) => {
    if (event.target.getAttribute('name') === 'modal-wrapper') {
      closeModal();
    }
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <Suspense fallback={'hello'}>
      <div
        name="modal-wrapper"
        className="absolute inset-0 bg-opacity-70 bg-gray-600 z-50 flex justify-center items-center"
        onMouseDown={handleWrapperClick}
      >
        {renderModalContent()}
      </div>
    </Suspense>
  );
};

export default Modal;
