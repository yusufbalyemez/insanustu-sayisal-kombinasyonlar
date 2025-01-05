import React from "react";
import BilgiMetniniGosterenComponent from "../components/BilgiMetniniGosterenComponent";
import { SiMiraheze } from "react-icons/si";
import { useLanguage } from "../context/LanguageContext";


const Number9Info = () => {
  const { translations } = useLanguage();

  return (
    <BilgiMetniniGosterenComponent>
      <p className="text-yellow-400 flex items-center gap-2">
        <SiMiraheze />
        {translations.number9Info.title}
      </p>
      <p>
        {translations.number9Info.text1}    
       </p>
      <p>
      {translations.number9Info.text2}  
      </p>
      <p className="text-green-300">
        333410 6234 114 7 1 286 2 200 3…5 113 6 114


      </p>
    </BilgiMetniniGosterenComponent>
  );
};

export default Number9Info;
