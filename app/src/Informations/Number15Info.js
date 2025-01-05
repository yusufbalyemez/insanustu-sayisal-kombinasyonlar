import React from "react";
import BilgiMetniniGosterenComponent from "../components/BilgiMetniniGosterenComponent";
import { SiMiraheze } from "react-icons/si";
import { useLanguage } from "../context/LanguageContext";


const Number15Info = () => {
  const { translations } = useLanguage();

  return (
    <BilgiMetniniGosterenComponent>
      <p className="text-yellow-400 flex items-center gap-2">
        <SiMiraheze />
        {translations.number15Info.title}
      </p>
      <p>
      {translations.number15Info.text1}
      </p>
      <p className="text-green-300">
        1234567 8 12345….286 288 ………12345 120
      </p>
    </BilgiMetniniGosterenComponent>
  );
};

export default Number15Info;
