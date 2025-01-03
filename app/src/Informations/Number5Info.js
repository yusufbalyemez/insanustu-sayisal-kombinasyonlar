import React from "react";
import BilgiMetniniGosterenComponent from "../components/BilgiMetniniGosterenComponent";
import { SiMiraheze } from "react-icons/si";

import { useLanguage } from "../context/LanguageContext";

const Number5Info = () => {
  const { translations } = useLanguage();
  return (
    <BilgiMetniniGosterenComponent>
      <p className="text-yellow-400 flex items-center gap-2">
        <SiMiraheze />
        {translations.number5Info.title}
      </p>
      <p>
      {translations.number5Info.text1}
      </p>
      <p>
      {translations.number5Info.text2}
      </p>
      <p>
      {translations.number5Info.text3}
      </p>
      <p>
      {translations.number5Info.text4}
      </p>
      <p>
      {translations.number5Info.text5}
      </p>
      <p className="text-green-300">
        1234567 28 12345...284285286 41041...123456 21
      </p>
    </BilgiMetniniGosterenComponent>
  );
};

export default Number5Info;
