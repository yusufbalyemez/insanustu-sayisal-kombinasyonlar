import React from "react";
import BilgiMetniniGosterenComponent from "../components/BilgiMetniniGosterenComponent";
import { SiMiraheze } from "react-icons/si";

const Number13Info = () => {
  return (
    <BilgiMetniniGosterenComponent>
      <p className="text-yellow-400 flex items-center gap-2">
        <SiMiraheze />
        Onüçüncü Sayı
      </p>
      <p>
      Eğer her suredeki ayet sayılarını yan yana yazarsak, sonunda 235-basamaklı 19’un katı olan bir sayı ile karşılaşırız. Bunu yapmak için, Kuran’daki numaralı ayetlerin toplam sayısını (6234), ardından her suredeki ayet sayısını yazıp, sonra Kuran’daki numaralı ayetlerin toplam sayısı ile kapatın. En son uzun sayı şu şekilde gözükür:
      </p>
      <p className="text-green-300">
      6234 7 286 200 176 ...127... 5 4 5 6 6234
      </p>
      <p>
      (Toplam Ayetler) (ilk 4 sure) (sure 9) (son 4 sure) (toplam ayetler)
      </p>
    </BilgiMetniniGosterenComponent>
  );
};

export default Number13Info;
