import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import quran from "../assets/SurahInfo.json";
import tr_quran from "../assets/SurahInfo_tr.json";

const DifferenceContext = createContext();
export const useDifference = () => useContext(DifferenceContext);

export const DifferenceProvider = ({ children }) => {
  const [differences, setDifferences] = useState([]);
  const [originalList, setOriginalList] = useState([]);

  useEffect(() => {
    const lang = localStorage.getItem('lang_quran_evidence') || 'en';
    const list = lang === 'tr' ? tr_quran : quran;
    setOriginalList(list);
  }, []);

  const calculateDifferences = useCallback((currentList) => {
    if (!currentList || !originalList.length) return;

    const diffs = currentList.map((sure, index) => {
      const original = originalList[index];
      if (!original) return null;

      const changes = {};
      let hasDifference = false;

      if (sure.totalAyahs !== original.totalAyahs) {
        changes.totalAyahs = {
          current: sure.totalAyahs,
          original: original.totalAyahs
        };
        hasDifference = true;
      }

      if (sure.startsWithBasmala !== original.startsWithBasmala) {
        changes.startsWithBasmala = {
          current: sure.startsWithBasmala,
          original: original.startsWithBasmala
        };
        hasDifference = true;
      }

      if (sure.startsWithHurufMuqattaat !== original.startsWithHurufMuqattaat) {
        changes.startsWithHurufMuqattaat = {
          current: sure.startsWithHurufMuqattaat,
          original: original.startsWithHurufMuqattaat
        };
        hasDifference = true;
      }

      return hasDifference ? { surahNumber: sure.surahNumber, changes } : null;
    }).filter(diff => diff !== null);

    setDifferences(diffs);
  }, [originalList]);

  return (
    <DifferenceContext.Provider value={{ differences, calculateDifferences }}>
      {children}
    </DifferenceContext.Provider>
  );
};
