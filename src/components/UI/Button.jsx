const Button = ({ label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex rounded h-8 px-4 bg-blue-200 hover:bg-blue-300 justify-center items-center cursor-pointer transition background-color duration-200 ease-linear`}
    >
      {label}
    </div>
  );
};

export default Button;
