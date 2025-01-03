import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const IsrailogullariSahit = () => {
  const { translations } = useLanguage();
  return (
    <div className="border border-gray-300 p-5 rounded-lg bg-white lg:w-3/4 mx-auto my-5">
      <h2 className="text-center text-xl font-bold">{translations.israel.title}</h2>
      <div className="border border-red-800 p-3 italic my-4">
        <p>
          {translations.israel.text1}
        </p>
      </div>
      <p className="my-2">
        {translations.israel.text2}
      </p>
      <p className="my-2">
        {translations.israel.text3}
      </p>
      <h3 className="text-center text-lg font-bold mt-5">
        {translations.israel.text4}
      </h3>
    </div>
  );
};

export default IsrailogullariSahit;
