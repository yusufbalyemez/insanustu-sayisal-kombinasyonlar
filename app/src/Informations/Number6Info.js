import React from "react";
import BilgiMetniniGosterenComponent from "../components/BilgiMetniniGosterenComponent";
import { SiMiraheze } from "react-icons/si";
import { useLanguage } from "../context/LanguageContext";

const Number6Info = () => {
  const {translations} = useLanguage();
  return (
    <BilgiMetniniGosterenComponent>
      <p className="text-yellow-400 flex items-center gap-2">
        <SiMiraheze />
        {translations.number6Info.title}
      </p>
      <p>
      {translations.number6Info.text1}
      </p>
      <p>
      {translations.number6Info.text2}
      </p>
      <p className="text-green-300">
      28 1234567 41041 12345…285286….21 123456
      </p>
    </BilgiMetniniGosterenComponent>
  );
};

export default Number6Info;
