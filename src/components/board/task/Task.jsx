const Task = ({ title }) => {
  return (
    <div className="flex-1 h-1/2 rounded overflow-hidden mb-4 last:mb-0 bg-blue-600 p-8">
      {title}
    </div>
  );
};

export default Task;
