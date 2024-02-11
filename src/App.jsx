import Board from './components/board/Board';
import Modal from './components/modal/Modal';

export const App = () => {
  return (
    <div className="overflow-hidden w-screen h-screen bg-blue-800 flex justify-center items-center tetxt-4xl">
      <Modal />
      <Board />
    </div>
  );
};

export default App;
