import React from "react";
import BilgiMetniniGosterenComponent from "../components/BilgiMetniniGosterenComponent";
import { SiMiraheze } from "react-icons/si";

const Number10Info = () => {
  return (
    <BilgiMetniniGosterenComponent>
      <p className="text-yellow-400 flex items-center gap-2">
        <SiMiraheze />
        Onuncu Sayı
      </p>
      <p>
        Eğer Sure 1 için ayet numaralarının toplamını (28), ardından Sure 2 için ayet numaralarının toplamını (41041) ve Kuran’ın sonuna kadar böyle devam ederek yazarsak ve ayet numaralarının Genel Toplamını (333410) en sona yerleştirirsek, sonuçta çıkan uzun sayı (Onuncu Sayı) 377 basamaktan oluşur ve 19’un bir katıdır.      </p>
      <p>
        Kuran’daki her sure için ayet numaralarının toplamı yan yana yazılmıştır, ardından en sona ayet numaralarının Genel Toplamı (333410) yazılmıştır.
      </p>
      <p className="text-green-300">
        28 41041 20100 …. 15 21 333410
      </p>
    </BilgiMetniniGosterenComponent>
  );
};

export default Number10Info;
