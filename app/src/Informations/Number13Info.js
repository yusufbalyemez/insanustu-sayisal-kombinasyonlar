import React from "react";
import BilgiMetniniGosterenComponent from "../components/BilgiMetniniGosterenComponent";
import { SiMiraheze } from "react-icons/si";
import { useLanguage } from "../context/LanguageContext";


const Number13Info = () => {
    const { translations } = useLanguage();
  
  return (
    <BilgiMetniniGosterenComponent>
      <p className="text-yellow-400 flex items-center gap-2">
        <SiMiraheze />
        {translations.number13Info.title}
      </p>
      <p>
      {translations.number13Info.text1}
      </p>
      <p className="text-green-300">
      6234 7 286 200 176 ...127... 5 4 5 6 6234
      </p>
      <p>
      {translations.number13Info.text2}
      </p>
    </BilgiMetniniGosterenComponent>
  );
};

export default Number13Info;
