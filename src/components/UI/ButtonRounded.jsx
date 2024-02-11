import React from 'react';

const ButtonRounded = ({ label, onClick, danger }) => {
  return (
    <div
      onClick={onClick}
      className={`flex rounded-full h-8 w-8 ${danger ? 'bg-red-400' : 'bg-blue-300'} ${danger ? 'hover:bg-red-300' : 'hover:bg-blue-400'} justify-center items-center cursor-pointer transition background-color duration-200 ease-linear`}
    >
      {label}
    </div>
  );
};

export default ButtonRounded;
