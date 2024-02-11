import { useModal } from '../modal/ModalProvider';
import { TASK_MODAL } from '@/features/constants';
import ButtonRounded from '../UI/ButtonRounded';

const AddTask = ({ status, order }) => {
  const { openModal, setModalName, setModalContentProperties } = useModal();
  const handleAddTask = () => {
    setModalName(TASK_MODAL);
    openModal();
    setModalContentProperties({ status, order });
  };
  return <ButtonRounded label="+" onClick={handleAddTask} />;
};

export default AddTask;
