import React, { useEffect, useState } from "react";
import sureListesi from "../assets/SurahInfo.json";
import { calculateMod19, calculateTotalAyahs,handleTotalClick, handleAyatClick, handleTotalAyatClick } from "../components/Functions";

const Number2 = () => {
  const [olusanDizi, setOlusanDizi] = useState([]);
  const [stringSayi, setStringSayi] = useState("");
  const [goster, setGoster] = useState(false);
  const [selectedSurahs, setSelectedSurahs] = useState([]);

  const toggleGoster = () => setGoster(!goster);

  useEffect(() => {
    const bosDizi = []; //Yeniden sıralanacak boş dizi oluşturur
    let stringBuyukSayi = ""; // 19'a bölünecek devasa metinsel sayıyı oluşturur.

    //Tüm Kuran içerisindeki surelere erişir.
    sureListesi.forEach((sure) => {
      //Start - Suredeki Tüm Ayet Sayılarını Yazdırır.
      for (let i = 1; i <= sure.totalAyahs; i++) {
        bosDizi.push({
          durum: "ayetNo",
          sureAdi: sure.surahName,
          sureNo: sure.surahNumber,
          deger: i,
        });
        stringBuyukSayi += i.toString();
      }
      //End

      //Start -Suredeki Toplam Ayet Sayısını Yazdırır
      bosDizi.push({
        durum: "ayet-sayisi",
        sureAdi: sure.surahName,
        sureNo: sure.surahNumber,
        deger: sure.totalAyahs,
      });
      stringBuyukSayi += sure.totalAyahs.toString();
      //End
    });
    //End

    //Start - Kurandaki Tüm Ayet Numaralarını Toplar
    const Toplam = calculateTotalAyahs(sureListesi);
    
    bosDizi.push({
      durum: "toplam-ayet-sayisi",
      deger: Toplam,
    });
    stringBuyukSayi += Toplam.toString();
    //End

    setOlusanDizi(bosDizi); //Diziyi ayarla
    setStringSayi(stringBuyukSayi); //Büyük sayıyı ayarla
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1>Liste</h1>
      <button
        onClick={toggleGoster}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {goster ? "Gizle" : "Göster"}
      </button>
      {goster && (
        <div className="break-words border border-gray-300 p-4 mb-5 w-full md:w-10/12 bg-gray-700 rounded-lg text-xl">
          {olusanDizi.map((eleman, index) => (
            <span
              key={index}
              onClick={() => {
                if (eleman.durum === "toplam-ayet-sayisi") {
                  handleTotalAyatClick();
                } else if (eleman.durum === "ayet-sayisi") {
                  handleTotalClick(eleman.sureNo, eleman.sureAdi, setSelectedSurahs);
                } else {
                  handleAyatClick(eleman.sureNo, eleman.sureAdi, eleman.deger, setSelectedSurahs);
                }
              }}
              className={`${
                eleman.durum === "ayet-sayisi" ? "text-red-600" : ""
              }${eleman.durum === "ayetNo" ? "text-white" : ""}${
                eleman.durum === "toplam-ayet-sayisi" ? "text-yellow-400" : ""
              } ${
                selectedSurahs.includes(eleman.sureNo) ? "bg-green-700" : ""
              } mr-1 mb-1 cursor-pointer`}
            >
              {eleman.deger}
            </span>
          ))}
        </div>
      )}
      <h2>String Number</h2>
      <p>Bu Sayı: {stringSayi.length}</p>
      <p>
        19'a bölümünden kalan {calculateMod19(stringSayi)}
      </p>
    </div>
  );
};

export default Number2;
