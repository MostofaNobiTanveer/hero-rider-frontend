import React from 'react';

const Loading = () => {
  return (
    <div className="w-full h-full fixed top-0 left-0 bg-white opacity-70 z-50 grid place-items-center">
      {/* <div className="w-32 h-32 border-b-4 border-t-4 border-blue-900 rounded-full animate-spin"></div> */}
      <svg className="w-32 h32 animate-spin" viewBox="25 25 50 50">
        <circle
          className="loade-path"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="10 10"
          cx="50"
          cy="50"
          r="20"
          fill="none"
        ></circle>
      </svg>
    </div>
  );
};

export default Loading;
