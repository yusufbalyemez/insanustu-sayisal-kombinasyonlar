import React from "react";
import BilgiMetniniGosterenComponent from "../components/BilgiMetniniGosterenComponent";
import { SiMiraheze } from "react-icons/si";

const Number6Info = () => {
  return (
    <BilgiMetniniGosterenComponent>
      <p className="text-yellow-400 flex items-center gap-2">
        <SiMiraheze />
        Altıncı Sayı
      </p>
      <p>
      Dikkat çekici bir şekilde, eğer yukarıda gösterilen “Beşinci Sayıyı” alıp ayet numaraları ile ayet numaralarının toplamını tersine çevirirsek, yani ayet numaralarının toplamını alıp surenin başına koyarsak, ortaya çıkan uzun sayı hala 19’un bir katıdır.
      </p>
      <p>
      Ayet numaralarının toplamını her bir surenin sonuna yerleştirmek yerine önüne yerleştirmek, 19’un bir katı olan (12836 basamaklı) uzun bir sayı meydana getirir.
      </p>
      <p className="text-green-300">
      28 1234567 41041 12345…285286….21 123456
      </p>
    </BilgiMetniniGosterenComponent>
  );
};

export default Number6Info;
