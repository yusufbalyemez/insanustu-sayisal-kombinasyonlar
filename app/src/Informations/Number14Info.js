import React from "react";
import BilgiMetniniGosterenComponent from "../components/BilgiMetniniGosterenComponent";
import { SiMiraheze } from "react-icons/si";
import { useLanguage } from "../context/LanguageContext";

const Number14Info = () => {
  const { translations } = useLanguage();

  return (
    <BilgiMetniniGosterenComponent>
      <p className="text-yellow-400 flex items-center gap-2">
        <SiMiraheze />
        {translations.number14Info.title}
      </p>
      <p>
      {translations.number14Info.text1}
      </p>
      <p className="text-green-300">
        6234 114 1234567 12345…286…123456 6234 114
      </p>
    </BilgiMetniniGosterenComponent>
  );
};

export default Number14Info;
