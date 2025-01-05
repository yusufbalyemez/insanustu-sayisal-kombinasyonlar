import React from "react";
import BilgiMetniniGosterenComponent from "../components/BilgiMetniniGosterenComponent";
import { SiMiraheze } from "react-icons/si";
import { useLanguage } from "../context/LanguageContext";


const Number11Info = () => {
    const { translations } = useLanguage();
  
  return (
    <BilgiMetniniGosterenComponent>
      <p className="text-yellow-400 flex items-center gap-2">
        <SiMiraheze />
        {translations.number11Info.title}
      </p>
      <p>
      {translations.number11Info.text1}
      </p>
      <p>
      {translations.number11Info.text2}
      </p>
      <p className="text-green-300">
        114 6234 1 28 2 41041 3 20100…113 15 114 21
      </p>
    </BilgiMetniniGosterenComponent>
  );
};

export default Number11Info;
