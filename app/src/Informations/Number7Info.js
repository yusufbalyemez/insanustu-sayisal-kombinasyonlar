import React from "react";
import BilgiMetniniGosterenComponent from "../components/BilgiMetniniGosterenComponent";
import { SiMiraheze } from "react-icons/si";

const Number7Info = () => {
  return (
    <BilgiMetniniGosterenComponent>
      <p className="text-yellow-400 flex items-center gap-2">
        <SiMiraheze />
        Yedinci Sayı
      </p>
      <p>
      6 sayıdaki aynı yöntemle sureler geriden gelerek yazıldığında(114.Sure - 113. Sure.... 1. Sure), yani son sureden başlayıp ilk sure ile son bulacak şekilde surelerin sırası tersine çevrildiğinde ve her bir surenin ayetlerinden sonra ayet sayılarının toplamı yerleştirildiğinde, sonuç hala 19’un bir katıdır.
      </p>
      <p>
      Surelerin sırasını tersine çevirip—son sureden başlayıp ilk sure ile bitirerek—ve her ayetin numarası ile birlikte her sure için ayetlerinden sonra ayet sayılarının toplamı yazıldığında, sonuç 12836 basamaklı uzun bir sayıdır. Bu uzun sayı 19’un bir katıdır.
      </p>
      <p className="text-green-300">
      123456 21 12345 15..12345..286 41041 1234567 28
      </p>
    </BilgiMetniniGosterenComponent>
  );
};

export default Number7Info;
