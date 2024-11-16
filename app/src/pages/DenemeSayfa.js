import React, { useEffect, useState } from "react";
import sureListesi from "../assets/SurahInfo.json";
import { calculateMod19, calculateTotalAyahs2 } from "../components/Functions";
import { toast } from "react-toastify";

const DenemeSayfa = () => {
  const [olusanDizi, setOlusanDizi] = useState([]);
  const [stringSayi, setStringSayi] = useState("");
  const [goster, setGoster] = useState(false);
  const [selectedSurahs, setSelectedSurahs] = useState([]);

  const toggleGoster = () => {
    setGoster(!goster);
  };

  const suredekiAyetNumaralariniYazdir = (diziAdi,metinselSayi,sure) => {
    for (let i = 1; i <= sure.totalAyahs; i++) {
      diziAdi.push({
        durum: "ayetNo",
        sureAdi: sure.surahName,
        sureNo: sure.surahNumber,
        deger: i,
      });

      metinselSayi += i.toString();
    }
  }

  useEffect(() => {
    const bosDizi = [];
    let stringBuyukSayi = "";

    sureListesi.forEach((sure) => {
      suredekiAyetNumaralariniYazdir(bosDizi,stringBuyukSayi,sure)
      bosDizi.push({
        durum: "ayet-sayisi",
        sureAdi: sure.surahName,
        sureNo: sure.surahNumber,
        deger: sure.totalAyahs,
      });

      stringBuyukSayi += sure.totalAyahs.toString();
    });

    const Toplam = sureListesi.reduce(
      (total, surah) => total + surah.totalAyahs,
      0
    );
    bosDizi.push({
      durum: "toplam-ayet-sayisi",
      deger: Toplam,
    });
    stringBuyukSayi += Toplam.toString();

    setOlusanDizi(bosDizi);
    setStringSayi(stringBuyukSayi)
  }, []);

  const handleTotalClick = (surahNumber, surahName) => {
    setSelectedSurahs((prevSelected) => {
      const isSelected = prevSelected.includes(surahNumber);
      const newSelected = isSelected
        ? prevSelected.filter((num) => num !== surahNumber)
        : [...prevSelected, surahNumber];
      if (!isSelected) {
        toast.success(`[${surahNumber}] ${surahName} Suresinin Ayet Sayısı`);
      }
      return newSelected;
    });
  };

  const handleAyatClick = (surahNumber, surahName, ayatNumber) => {
    setSelectedSurahs((prevSelected) => {
      const isSelected = prevSelected.includes(surahNumber);
      const newSelected = isSelected
        ? prevSelected.filter((num) => num !== surahNumber)
        : [...prevSelected, surahNumber];
      if (!isSelected) {
        toast.success(`[${surahNumber}] ${surahName} ${ayatNumber}. Ayet`);
      }
      return newSelected;
    });
  };

  const handleTotalAyatClick = () => {
    toast.success(`Kurandaki Tüm Ayet Numaralarının Toplamı:`);
  };

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
                } else if (eleman.durum=="ayet-sayisi") {
                  handleTotalClick(eleman.sureNo, eleman.sureAdi);
                } else {
                  handleAyatClick(
                    eleman.sureNo,
                    eleman.sureAdi,
                    eleman.deger
                  );
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

export default DenemeSayfa;
