import React from "react";
import BilgiMetniniGosterenComponent from "../components/BilgiMetniniGosterenComponent";
import { SiMiraheze } from "react-icons/si";
import { useLanguage } from "../context/LanguageContext";


const Number10Info = () => {
  const { translations } = useLanguage();

  return (
    <BilgiMetniniGosterenComponent>
      <p className="text-yellow-400 flex items-center gap-2">
        <SiMiraheze />
        {translations.number10Info.title}

      </p>
      <p>
        {translations.number10Info.text1}

      </p>
      <p>
        {translations.number10Info.text2}
      </p>
      <p className="text-green-300">
        28 41041 20100 …. 15 21 333410
      </p>
    </BilgiMetniniGosterenComponent>
  );
};

export default Number10Info;
