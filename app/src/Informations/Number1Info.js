import React from "react";
import BilgiMetniniGosterenComponent from "../components/BilgiMetniniGosterenComponent";
import { SiMiraheze } from "react-icons/si";
import { useLanguage } from "../context/LanguageContext";

const Number1Info = () => {
  const { translations } = useLanguage(); // Çeviri verilerini al
  return (
    <BilgiMetniniGosterenComponent>
      <p className="text-yellow-400 flex items-center gap-2">
        <SiMiraheze />
        {translations.number1Info.title}
      </p>
      <p>
      {translations.number1Info.text1}
      </p>
      <p className="text-green-300">
        7 1 2 3 4 5 6 7 & 286 1 2 3 4 5….284 285 286.
      </p>
      <p>
      {translations.number1Info.text2}
      </p>
      <p className="text-green-300">
        7 1 2 3 4 5 6 7 286 1 2 3 4 5.....284 285 286.
      </p>
      <p>
      {translations.number1Info.text3}
      </p>
      <p>
      {translations.number1Info.text4}
      </p>
    </BilgiMetniniGosterenComponent>
  );
};

export default Number1Info;
