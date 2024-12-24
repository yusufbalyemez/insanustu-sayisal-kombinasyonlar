import React from "react";
import BilgiMetniniGosterenComponent from "../components/BilgiMetniniGosterenComponent";
import { SiMiraheze } from "react-icons/si";

const BesmeleEtkisiInfo = () => {
  return (
    <BilgiMetniniGosterenComponent>
      <p className="text-yellow-400 flex items-center gap-2">
        <SiMiraheze />
        Besmele Etkisi
      </p>
      <p>
      Bazı surelerde besmele bulunmamaktadır. Örneğin 1. Sure(Fatiha) ve 9. Sure(Berâe) Suresinin başında besmele bulunmamaktadır. Fatiha'nın 1. ayeti besmeledir. Fakat 9. Surenin içerisinde ve başında hiçbir şekilde besmele yok. Suredeki toplam ayet sayısı, besmele numarası ve suredeki ayetlerin numarası, sure numarasını ve çıkan sayının en sonunada toplam ayet sayısını yazdığımızda sayı şu şekilde gözükecektir.
      </p>
  
      <p className="text-green-300">
      7 123456 1 - 286 0 1234....286 2 - 127 0 12345...127 9 -... - 6 0 123456 114 6234
      </p>
    </BilgiMetniniGosterenComponent>
  );
};

export default BesmeleEtkisiInfo;
