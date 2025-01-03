import React from "react";
import BilgiMetniniGosterenComponent from "../components/BilgiMetniniGosterenComponent";
import { SiMiraheze } from "react-icons/si";
import { useLanguage } from "../context/LanguageContext";


const Number3Info = () => {
  const { translations } = useLanguage(); // Çeviri verilerini al
  return (
    <BilgiMetniniGosterenComponent>
      <p className="text-yellow-400 flex items-center gap-2">
        <SiMiraheze />
        {translations.number3Info.title}
      </p>
      <p>
      {translations.number3Info.text1}
      </p>
      <p>
        <stron> {translations.number3Info.text2}</stron>
      </p>
      <p>
      {translations.number3Info.text3}
      </p>
      <p className="text-green-300">
        1234567 1 7 12345...286 2 286 ...123456 114 6 6234
      </p>
      
    </BilgiMetniniGosterenComponent>
  );
};

export default Number3Info;
