import React from "react";
import BilgiMetniniGosterenComponent from "../components/BilgiMetniniGosterenComponent";
import { SiMiraheze } from "react-icons/si";
import { useLanguage } from "../context/LanguageContext";


const Number3Info = () => {
  const { translations } = useLanguage(); // Çeviri verilerini al
  return (
    <BilgiMetniniGosterenComponent>
      <p className="text-yellow-400 flex items-center gap-2">
        <SiMiraheze />
        {translations.number3Info.title}
      </p>
      <p>
        Her ayetin numarası, ardından sure numarası, sonra bu suredeki ayetlerin
        sayısı. Numaralı ayetlerin toplam sayısı en sona eklenir. (12930
        basamaklı) bu uzun sayı 19’un bir katıdır.
      </p>
      <p>
        <stron>Şimdi her surenin numarasını dâhil edelim.</stron>
      </p>
      <p>
        Her suredeki toplam ayet sayısını sureden sonra koymak yerine, bunu
        surenin önüne koyalım. Böylelikle, Sure 1’i temsil eden sayı 1234567 1 7
        yerine şu şekilde gözükür: 7 1234567 1 ve Sure 2’yi temsil eden sayı
        12345.....284 285 286 2 286 yerine şu şekilde gözükür: 286 12345.... 284
        285 286 2. Tüm Kuran’ı temsil eden bu çok uzun sayı 19’un bir katıdır.
      </p>
      <p className="text-green-300">
        1234567 1 7 12345...286 2 286 ...123456 114 6 6234
      </p>
      
    </BilgiMetniniGosterenComponent>
  );
};

export default Number3Info;
