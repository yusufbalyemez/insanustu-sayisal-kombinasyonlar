import React from "react";
import BilgiMetniniGosterenComponent from "../components/BilgiMetniniGosterenComponent";
import { SiMiraheze } from "react-icons/si";
import { useLanguage } from "../context/LanguageContext";

const Number7Info = () => {
  const { translations } = useLanguage();

  return (
    <BilgiMetniniGosterenComponent>
      <p className="text-yellow-400 flex items-center gap-2">
        <SiMiraheze />
        {translations.number7Info.title}
      </p>
      <p>
      {translations.number7Info.text1}
      </p>
      <p>
      {translations.number7Info.text2}
      </p>
      <p className="text-green-300">
        123456 21 12345 15..12345..286 41041 1234567 28
      </p>
    </BilgiMetniniGosterenComponent>
  );
};

export default Number7Info;
