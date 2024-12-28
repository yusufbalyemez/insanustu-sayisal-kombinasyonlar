import React from "react";
import BilgiMetniniGosterenComponent from "../components/BilgiMetniniGosterenComponent";
import { SiMiraheze } from "react-icons/si";

const Number12Info = () => {
  return (
    <BilgiMetniniGosterenComponent>
      <p className="text-yellow-400 flex items-center gap-2">
        <SiMiraheze />
        Onikinci Sayı
      </p>
      <p>
        Herhangi biri, herhangi bir Kuranî parametrenin bu harika matematiksel kodla korunmadığını düşünebiliyorsa, o halde daha fazla parametreye bakalım. Eğer sure sayısını (114), ardından numaralı ayetlerin toplam sayısını, ardından tüm Kuran’daki ayet numaralarının Genel Toplamını (333410), ardından her surenin numarası ile onun ayetlerini yazarsak, sonunda 19’un katı olan (12712 basamaklı) büyük bir sayı ile karşılaşırız.
      </p>
      <p className="text-green-300">
        114 6234 333410 1 1 2 3 4 5 6 7...114 1 2 3 4 5 6
      </p>
    </BilgiMetniniGosterenComponent>
  );
};

export default Number12Info;
