import React from "react";
import BilgiMetniniGosterenComponent from "../components/BilgiMetniniGosterenComponent";
import { SiMiraheze } from "react-icons/si";

const Number11Info = () => {
  return (
    <BilgiMetniniGosterenComponent>
      <p className="text-yellow-400 flex items-center gap-2">
        <SiMiraheze />
        Onbirinci Sayı
      </p>
      <p>
        Eğer Kuran’daki sure sayısını (114), ardından numaralı ayetlerin toplam sayısını (6234), ardından her surenin numarasını ve onların ayet numaralarının toplamını yazarsak, bu (612 basamaklı) son uzun sayı 19’un bir katıdır.
      </p>
      <p>
        Sure sayısı, ardından numaralı ayetlerin toplam sayısı, sonra her surenin numarası ile onun ayet sayılarının toplamı 19’un katı olan (612 basamaklı) bu büyük sayıyı ortaya çıkarır.
      </p>
      <p className="text-green-300">
        114 6234 1 28 2 41041 3 20100…113 15 114 21
      </p>
    </BilgiMetniniGosterenComponent>
  );
};

export default Number11Info;
