import React from "react";
import BilgiMetniniGosterenComponent from "../components/BilgiMetniniGosterenComponent";
import { SiMiraheze } from "react-icons/si";
import { useLanguage } from "../context/LanguageContext";

const Number8Info = () => {
  const { translations } = useLanguage();

  return (
    <BilgiMetniniGosterenComponent>
      <p className="text-yellow-400 flex items-center gap-2">
        <SiMiraheze />
        {translations.number8Info.title}
      </p>
      <p>
      {translations.number8Info.text1}
      </p>
      <p>
      {translations.number4Info.text2}
      </p>
      <p className="text-green-300">
        333410 6234 114 1 7 2 286 3 200..113 5 114 6
      </p>
    </BilgiMetniniGosterenComponent>
  );
};

export default Number8Info;
