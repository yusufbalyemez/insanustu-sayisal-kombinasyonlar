import React from "react";
import BilgiMetniniGosterenComponent from "../components/BilgiMetniniGosterenComponent";
import { SiMiraheze } from "react-icons/si";
import { useLanguage } from "../context/LanguageContext";


const Number12Info = () => {
  const { translations } = useLanguage();

  return (
    <BilgiMetniniGosterenComponent>
      <p className="text-yellow-400 flex items-center gap-2">
        <SiMiraheze />
        {translations.number12Info.title}
      </p>
      <p>
        {translations.number12Info.text1}
      </p>
      <p>
        {translations.number12Info.text2}
      </p>
      <p className="text-green-300">
        114 6234 333410 1 1 2 3 4 5 6 7...114 1 2 3 4 5 6
      </p>
    </BilgiMetniniGosterenComponent>
  );
};

export default Number12Info;
