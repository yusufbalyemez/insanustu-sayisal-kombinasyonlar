import React, { createContext, useContext, useState, useEffect } from 'react';
import LanguageTR from "../assets/LanguageTR.json";
import LanguageEN from '../assets/LanguageEN.json';

// Context oluşturma
const LanguageContext = createContext();

// Provider bileşeni
export const LanguageProvider = ({ children }) => {
  // Varsayılan dili localStorage'dan kontrol et, yoksa 'tr' kullan
  const initialLanguage = localStorage.getItem('lang_quran_evidence') || 'tr';
  const [language, setLanguage] = useState(initialLanguage);
  const [translations, setTranslations] = useState(initialLanguage === 'tr' ? LanguageTR : LanguageEN);

  // Dil değiştiğinde JSON dosyasını yükle ve localStorage'a kaydet
  useEffect(() => {
    if (language === 'tr') {
      setTranslations(LanguageTR);
    } else if (language === 'en') {
      setTranslations(LanguageEN);
    }
    localStorage.setItem('lang_quran_evidence', language); // Seçilen dili localStorage'a kaydet
  }, [language]);

  return (
    <LanguageContext.Provider value={{ translations, language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook
export const useLanguage = () => {
  return useContext(LanguageContext);
};

// Örnek kullanım
// import { useLanguage } from './LanguageContext';
// const { translations, language, setLanguage } = useLanguage();
// console.log(translations.someKey);
