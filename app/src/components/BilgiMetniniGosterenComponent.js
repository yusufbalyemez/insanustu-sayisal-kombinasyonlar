import React from "react";

const BilgiMetniniGosterenComponent = ({ children }) => {
  return (
    <div
      className="text-white flex flex-col items-center gap-10 break-words
         border border-gray-300 p-4 mb-5 w-full md:w-10/12 bg-gradient-to-l
          from-gray-700 to-gray-800 rounded-lg text-xl overflow-y-auto max-h-[60vh]
           hover:ring-4 hover:ring-yellow-400 transition-all"
    >
      {children}
    </div>
  );
};

export default BilgiMetniniGosterenComponent;
