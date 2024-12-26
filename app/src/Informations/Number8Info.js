import React from "react";
import BilgiMetniniGosterenComponent from "../components/BilgiMetniniGosterenComponent";
import { SiMiraheze } from "react-icons/si";

const Number8Info = () => {
  return (
    <BilgiMetniniGosterenComponent>
      <p className="text-yellow-400 flex items-center gap-2">
        <SiMiraheze />
        Sekizinci Sayı
      </p>
      <p>
      Tüm Kuran için ayet numaralarının toplamını (333410), ardından numaralı ayetlerin toplam sayısını (6234), sonra sure sayısını (114) yazın. Her sure sonra kendi numarası ve ayetlerinin sayısı ile temsil edilir. Sure 1 ve 2’yi temsil eden sayılar 1 7 ve 2 286’dır. Kuran’ın tüm surelerini kapsayan tam sayı 474 basamaktan oluşur ve 19’un bir katıdır.
      </p>
      <p>
      Ayet numaralarının Genel Toplamını (333410) numaralı ayetlerin toplam sayısı (6234), sure sayısı (114), ardından sure numaraları ve her surenin ayet numaraları takip eder. Sayı şu şekilde gözükür.
      </p>
      <p className="text-green-300">
      333410 6234 114 1 7 2 286 3 200..113 5 114 6


      </p>
    </BilgiMetniniGosterenComponent>
  );
};

export default Number8Info;
