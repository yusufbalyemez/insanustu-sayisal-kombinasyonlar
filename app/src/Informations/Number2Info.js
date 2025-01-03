import React from "react";
import BilgiMetniniGosterenComponent from "../components/BilgiMetniniGosterenComponent";
import { SiMiraheze } from "react-icons/si";
import { useLanguage } from "../context/LanguageContext";

const Number2Info = () => {
  const { translations } = useLanguage(); // Çeviri verilerini al
  return (
    <BilgiMetniniGosterenComponent>
      <p className="text-yellow-400 flex items-center gap-2">
        <SiMiraheze />
        {translations.number2Info.title}
      </p>
      <p>
      {translations.number2Info.text1}
      </p>
      <p className="text-green-300">
        1 2 3 4 5 6 7 7 & 1 2 3 4 5.....284 285 286 286.
      </p>
      <p>
      {translations.number2Info.text2}
      </p>
      <p className="text-green-300">
        1 2 3 4 5 6 7 7 1 2 3 4 5.....284 285 286 286.
      </p>
      <p>
      {translations.number2Info.text3}
      </p>
      <p>
      {translations.number2Info.text4}
      </p>
      <p className="text-green-300">
        1 2 3 4 5 6 7 & 6234 {`> > >`} 1 2 3 4 5 6 7 6234.
      </p>
      <p>
      {translations.number2Info.text5}
      </p>
      <p className="text-green-300">
        1234567 7 12345…286 286 12345 5…123456 6 6234
      </p>
    </BilgiMetniniGosterenComponent>
  );
};

export default Number2Info;
