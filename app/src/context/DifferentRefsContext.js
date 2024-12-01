import React, { createContext, useContext, useRef } from "react";

const DifferentRefsContext = createContext();

export const DifferentRefsProvider = ({ children }) => {
  const differentRefs = useRef({});
  const scrollToDifferent = () => {
    const firstDifferentKey = Object.keys(differentRefs.current)[0];
    if (firstDifferentKey && differentRefs.current[firstDifferentKey]) {
      differentRefs.current[firstDifferentKey].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const clearDifferentRefs = () => {
    differentRefs.current = {};
    console.log("differentRefs temizlendi emir:", differentRefs.current);
  };

  return (
    <DifferentRefsContext.Provider value={{ differentRefs, scrollToDifferent,clearDifferentRefs }}>
      {children}
    </DifferentRefsContext.Provider>
  );
};

export const useDifferentRefs = () => {
  return useContext(DifferentRefsContext);
};
