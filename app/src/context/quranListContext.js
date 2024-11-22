// QuranContext.js
import React, { createContext, useContext, useState } from 'react';
import quran from "../assets/SurahInfo.json";

const QuranContext = createContext();

export const useQuran = () => useContext(QuranContext);

export const QuranProvider = ({ children }) => {
  const [quranList, setQuranList] = useState(() => {
    const storedList = localStorage.getItem('quranList');
    return storedList ? JSON.parse(storedList) : quran;
  });

  const updateQuranList = (newList) => {
    setQuranList(newList);
    localStorage.setItem('quranList', JSON.stringify(newList));
  };

  return (
    <QuranContext.Provider value={{ quranList, setQuranList: updateQuranList }}>
      {children}
    </QuranContext.Provider>
  );
};
