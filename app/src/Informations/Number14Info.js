import React from "react";
import BilgiMetniniGosterenComponent from "../components/BilgiMetniniGosterenComponent";
import { SiMiraheze } from "react-icons/si";

const Number14Info = () => {
  return (
    <BilgiMetniniGosterenComponent>
      <p className="text-yellow-400 flex items-center gap-2">
        <SiMiraheze />
        Ondördüncü Sayı
      </p>
      <p>
      Eğer Kuran’daki toplam numaralı ayet sayısını (6234), ardından sure sayısını (114), ardından her suredeki her ayetin numarasını yazıp sonra Kuran’daki toplam numaralı ayet sayısı ve sure sayısı ile kapatırsak, en son sayı 12479 basamaktan oluşur ve 19’un bir katıdır.
      </p>
      <p className="text-green-300">
      6234 114 1234567 12345…286…123456 6234 114
      </p>
    </BilgiMetniniGosterenComponent>
  );
};

export default Number14Info;
