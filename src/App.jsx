import Board from './components/board/Board';

export const App = () => {
  return (
    <div className="overflow-hidden w-screen h-screen bg-blue-800 flex justify-center items-center tetxt-4xl">
      <Board />
    </div>
  );
};

export default App;
