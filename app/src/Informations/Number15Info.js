import React from "react";
import BilgiMetniniGosterenComponent from "../components/BilgiMetniniGosterenComponent";
import { SiMiraheze } from "react-icons/si";

const Number15Info = () => {
  return (
    <BilgiMetniniGosterenComponent>
      <p className="text-yellow-400 flex items-center gap-2">
        <SiMiraheze />
        Onbeşinci Sayı
      </p>
      <p>
      12774 basamaktan oluşan bir diğer uzun sayı, her suredeki her ayetin numarasını, ardından ayet sayısı eklenmiş her surenin numarasını yazarak oluşturulur. Sure 1, 7 ayetten oluşmaktadır ve toplam 1 + 7 = 8’dir. Bu nedenle, Sure 1’i temsil eden sayı şu şekilde gözükür: 1234567 8. Sure 2 ise 286 ayetten oluştuğundan Sure 2’yi temsil eden sayı şu şekilde gözükür: 12345...286 288. Bu, Kuran’daki her sure için yapılır. Birleştirilmiş son sayı 12774 basamaklıdır ve 19’un bir katıdır.
      </p>
      <p className="text-green-300">
      1234567 8 12345….286 288 ………12345 120
      </p>
    </BilgiMetniniGosterenComponent>
  );
};

export default Number15Info;
