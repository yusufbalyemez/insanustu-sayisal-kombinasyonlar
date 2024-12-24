import React from "react";
import BilgiMetniniGosterenComponent from "../components/BilgiMetniniGosterenComponent";
import { SiMiraheze } from "react-icons/si";

const Number4Info = () => {
  return (
    <BilgiMetniniGosterenComponent>
      <p className="text-yellow-400 flex items-center gap-2">
        <SiMiraheze />
        Dördüncü Sayı
      </p>
      <p>
        Her suredeki toplam ayet sayısını sureden sonra koymak yerine, bunu
        surenin önüne koyalım. Böylelikle, Sure 1’i temsil eden sayı 1234567 1 7
        yerine şu şekilde gözükür: 7 1234567 1 ve Sure 2’yi temsil eden sayı
        12345.....284 285 286 2 286 yerine şu şekilde gözükür: 286 12345.... 284
        285 286 2. Tüm Kuran’ı temsil eden bu çok uzun sayı 19’un bir katıdır.
      </p>
      <p>
        Her bir suredeki ayetlerin toplam sayısını her bir ayetin numarası,
        ardından sure numarası takip eder. Aşağıda gösterilen son 14 basamak,
        son suredeki ayet sayısı (6), ardından altı ayetin numaraları (123456),
        ardından surenin numarası (114), sonra Kuran’daki toplam numaralı ayet
        sayısıdır. (12930 basamaktan oluşan) bu çok uzun sayı 19’un bir katıdır.
      </p>
      <p className="text-green-300">
        7 1234567 1 286 12345…286 2…6 123456 114 6234
      </p>
    </BilgiMetniniGosterenComponent>
  );
};

export default Number4Info;
