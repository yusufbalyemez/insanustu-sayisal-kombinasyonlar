import React from "react";
import BilgiMetniniGosterenComponent from "../components/BilgiMetniniGosterenComponent";
import { SiMiraheze } from "react-icons/si";

import { useLanguage } from "../context/LanguageContext";

const Number4Info = () => {
  const {translations} = useLanguage();
  return (
    <BilgiMetniniGosterenComponent>
      <p className="text-yellow-400 flex items-center gap-2">
        <SiMiraheze />
        {translations.number4Info.title}
      </p>
      <p>
        {translations.number4Info.text1}
      </p>
      <p>
      {translations.number4Info.text2}
      </p>
      <p className="text-green-300">
        7 1234567 1 286 12345…286 2…6 123456 114 6234
      </p>
    </BilgiMetniniGosterenComponent>
  );
};

export default Number4Info;
