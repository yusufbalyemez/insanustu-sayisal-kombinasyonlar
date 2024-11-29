import React, { createContext, useContext, useRef } from "react";

// Context oluşturma
const DifferentRefsContext = createContext();

// Provider bileşeni
export const DifferentRefsProvider = ({ children }) => {
  const differentRefs = useRef({});

  return (
    <DifferentRefsContext.Provider value={differentRefs}>
      {children}
    </DifferentRefsContext.Provider>
  );
};

// Hook: Context'i kullanmayı kolaylaştırmak için
export const useDifferentRefs = () => {
  return useContext(DifferentRefsContext);
};
