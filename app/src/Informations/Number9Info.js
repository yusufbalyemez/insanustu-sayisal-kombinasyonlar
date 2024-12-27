import React from "react";
import BilgiMetniniGosterenComponent from "../components/BilgiMetniniGosterenComponent";
import { SiMiraheze } from "react-icons/si";

const Number9Info = () => {
  return (
    <BilgiMetniniGosterenComponent>
      <p className="text-yellow-400 flex items-center gap-2">
        <SiMiraheze />
        Dokuzuncu Sayı
      </p>
      <p>
        Şimdi, “Sekizinci Sayıda” gösterildiği gibi, sure numarası ile onun ayet sayısını tersine çevirelim. Böylelikle, ilk iki sureyi temsil eden sayılar 1 7 & 2 286 yerine şu şekilde gözükür: 7 1 & 286 2. Tam sayı yine 474 basamaklıdır ve hala 19’un bir katıdır.
      </p>
      <p>
        Sure numarası ve ayet sayısını tersine çevirmek hâlâ bize 19’un bir katı olan uzun bir sayı verir. Şu şekilde gözükür:

      </p>
      <p className="text-green-300">
        333410 6234 114 7 1 286 2 200 3…5 113 6 114


      </p>
    </BilgiMetniniGosterenComponent>
  );
};

export default Number9Info;
