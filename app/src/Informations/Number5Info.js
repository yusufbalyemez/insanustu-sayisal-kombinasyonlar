import React from "react";
import BilgiMetniniGosterenComponent from "../components/BilgiMetniniGosterenComponent";
import { SiMiraheze } from "react-icons/si";

const Number5Info = () => {
  return (
    <BilgiMetniniGosterenComponent>
      <p className="text-yellow-400 flex items-center gap-2">
        <SiMiraheze />
        Beşinci Sayı
      </p>
      <p>
        Her suredeki her ayet numarasını ayet numaralarının toplamı takip eder. Bu uzun sayı 12836 basamaktan oluşur ve 19’un bir katıdır.
      </p>
      <p>
        Şimdi, her suredeki her ayetin numarasını, ardından her sure için ayet numaralarının toplamını yazalım. Sure 1, 7 ayetten oluşmaktadır ve ayet numaralarının toplamı 1 + 2 + 3 + 4 + 5 + 6 + 7 = 28’dir. Böylelikle, Sure 1’i temsil eden sayı şu şekilde gözükür: 1234567 28.
      </p>
      <p>
        Sure 2 için ayet numaralarının toplamı 41041’dir (1 + 2 + 3 + ... + 286). Böylelikle, Sure 2’yi temsil eden sayı şu şekilde gözükür: 12345…284 285 286 41041.
      </p>
      <p>6 ayetten oluşan son sureyi temsil eden sayı şu şekilde gözükür: 123456 21 çünkü 1 + 2 + 3 + 4 + 5 + 6 = 21.</p>
      <p>Tüm Kuran’ı temsil eden bütün sayı 12836 basamaktan oluşmaktadır ve 19’un bir katıdır. Şu şekilde gözükür.</p>
      <p className="text-green-300">
        1234567 28 12345...284285286 41041...123456 21
      </p>
    </BilgiMetniniGosterenComponent>
  );
};

export default Number5Info;
