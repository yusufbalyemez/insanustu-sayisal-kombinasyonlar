import React from "react";
import BilgiMetniniGosterenComponent from "../components/BilgiMetniniGosterenComponent";
import { SiMiraheze } from "react-icons/si";
import { useLanguage } from "../context/LanguageContext";


const BesmeleEtkisiInfo = () => {
  const { translations } = useLanguage();
  return (
    <BilgiMetniniGosterenComponent>
      <p className="text-yellow-400 flex items-center gap-2">
        <SiMiraheze />
        {translations.basmalaEffect.title}
      </p>
      <p>
      {translations.basmalaEffect.text1}
      </p>

      <p className="text-green-300">
        7 123456 1 - 286 0 1234....286 2 - 127 0 12345...127 9 -... - 6 0 123456 114 6234
      </p>
    </BilgiMetniniGosterenComponent>
  );
};

export default BesmeleEtkisiInfo;
