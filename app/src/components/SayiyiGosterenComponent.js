import React from "react";

const SayiyiGosterenComponent = ({ children }) => {
  return (
    <div
      className="break-words border border-gray-300 p-4 mb-5
       w-full md:w-10/12 bg-gradient-to-l from-gray-700 to-gray-800
        rounded-lg text-xl overflow-y-auto hover:ring-4
         hover:ring-yellow-400 transition-all max-h-[60vh]"
    >
      {children}
    </div>
  );
};

export default SayiyiGosterenComponent;
