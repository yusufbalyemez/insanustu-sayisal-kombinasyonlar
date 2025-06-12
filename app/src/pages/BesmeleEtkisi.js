import React, { useEffect, useState } from "react";
import {
  calculateMod19,
  handleTotalClick,
  handleBasmalaClick,
  handleTotalAyatClick,
  isDifferent,
  handleSurahNoClick,
  suredekiTumAyetSayilariniYazdir,
  sureNumarasiniYazdir,
  suredekiToplamAyetSayisiniYazdir,
  kurandakiToplamAyetSayisiniYazdir,
  suredekiTumAyetSayilariniHesaplamaDizisineEkle,
  sureNumarasiniHesaplamaDizisineEkle,
  suredekiToplamAyetSayisiniHesaplamaDizisineEkle,
  kurandakiToplamAyetSayisiniHesaplamaDizisineEkle,
  handleAyatClick,
} from "../components/Functions";
import { useQuran } from "../context/quranListContext";
import QURAN from "../assets/SurahInfo.json";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import ShowButtonToggle from "../components/ShowButtonToggle";
import ResultDisplay from "../components/ResultDisplay";
import CopyAndSelectButtons from "../components/CopyAndSelectButtons";
import { useDifferentRefs } from "../context/DifferentRefsContext";
import SayiyiGosterenComponent from "../components/SayiyiGosterenComponent";
import KapsayiciComponent from "../components/KapsayiciComponent";
import BesmeleEtkisiInfo from "../Informations/BesmeleEtkisiInfo";
import GosterCopyController from "../components/GosterCopyController";

const BesmeleEtkisi = () => {
  const { quranList } = useQuran();
  const [orginQuranEmptyList, setOrginQuranEmptyList] = useState([]);
  const [olusanDizi, setOlusanDizi] = useState([]);
  const [stringSayi, setStringSayi] = useState("");
  const [goster, setGoster] = useState(false);
  const [selectedSurahs, setSelectedSurahs] = useState([]);
  const [copyState, setCopyState] = useState(false);
  const { differentRefs } = useDifferentRefs();

  const handleCopy = () => {
    navigator.clipboard
      .writeText(stringSayi)
      .then(() => toast.success("Sayı Kopyalandı."))
      .catch(() => toast.error("Kopyalama başarısız."));
    setCopyState(true);
  };

  const toggleGoster = () => {
    setCopyState(false);
    setGoster(!goster);
  };

  useEffect(() => {
    const orjinalBosDizi = [];
    QURAN.forEach((sure) => {
      suredekiToplamAyetSayisiniYazdir(sure, orjinalBosDizi);
      if (sure.startsWithBasmala) {
        orjinalBosDizi.push({ durum: "besmele", sureNo: sure.surahNumber, sureAdi: sure.surahName, deger: 0 });
      }
      suredekiTumAyetSayilariniYazdir(sure, orjinalBosDizi);
      sureNumarasiniYazdir(sure, orjinalBosDizi);
    });
    kurandakiToplamAyetSayisiniYazdir(QURAN, orjinalBosDizi);
    setOrginQuranEmptyList(orjinalBosDizi);
  }, []);

  useEffect(() => {
    let bosDizi = [];
    let stringBuyukSayi = "";
    quranList.forEach((sure) => {
      ({ bosDizi, stringBuyukSayi } = suredekiToplamAyetSayisiniHesaplamaDizisineEkle(sure, bosDizi, stringBuyukSayi));
      if (sure.startsWithBasmala) {
        bosDizi.push({ durum: "besmele", sureNo: sure.surahNumber, sureAdi: sure.surahName, deger: 0 });
        stringBuyukSayi += "0";
      }
      ({ bosDizi, stringBuyukSayi } = suredekiTumAyetSayilariniHesaplamaDizisineEkle(sure, bosDizi, stringBuyukSayi));
      ({ bosDizi, stringBuyukSayi } = sureNumarasiniHesaplamaDizisineEkle(sure, bosDizi, stringBuyukSayi));
    });
    ({ bosDizi, stringBuyukSayi } = kurandakiToplamAyetSayisiniHesaplamaDizisineEkle(quranList, bosDizi, stringBuyukSayi));
    setOlusanDizi(bosDizi);
    setStringSayi(stringBuyukSayi);
  }, [quranList]);

  return (
    <KapsayiciComponent>
      <Helmet>
        <title>Besmele Etkisi</title>
      </Helmet>
      <ResultDisplay stringSayi={stringSayi} calculateMod19={calculateMod19} />
      <GosterCopyController toggleGoster={toggleGoster}
        goster={goster}
        copyState={copyState}
        handleCopy={handleCopy}
        setSelectedSurahs={setSelectedSurahs} />

      {goster ? (
        <SayiyiGosterenComponent>
          {olusanDizi.map((eleman, index) => {
            const isDiff = isDifferent(eleman, orginQuranEmptyList);
            if (isDiff) differentRefs.current[index] = null;
            return (
              <span
                key={index}
                ref={(el) => {
                  if (isDiff) differentRefs.current[index] = el;
                  else delete differentRefs.current[index];
                }}
      
                onClick={() => {
                  if (eleman.durum === "toplam-ayet-sayisi") handleTotalAyatClick(eleman.deger);
                  else if (eleman.durum === "ayet-sayisi") handleTotalClick(eleman, selectedSurahs, setSelectedSurahs, orginQuranEmptyList);
                  else if (eleman.durum === "sureNo") handleSurahNoClick(eleman, setSelectedSurahs);
                  else if (eleman.durum === "besmele") handleBasmalaClick(eleman.sureNo, eleman.sureAdi, true, selectedSurahs, setSelectedSurahs);
                  else handleAyatClick(eleman, selectedSurahs, setSelectedSurahs, orginQuranEmptyList);
                }}
                
                className={`${isDiff ? "text-red-500 font-bold blink" :
                  eleman.durum === "ayet-sayisi" ? "text-yellow-400" :
                  eleman.durum === "besmele" ? "text-orange-400" :
                  eleman.durum === "ayetNo" ? "text-white" :
                  eleman.durum === "toplam-ayet-sayisi" ? "text-green-300" :
                  eleman.durum === "sureNo" ? "text-blue-500" : ""} ${
                  selectedSurahs.includes(eleman.sureNo) ? "bg-green-700" : ""
                } mr-1 mb-1 cursor-pointer`}
              >
                {eleman.deger}
              </span>
            );
          })}
        </SayiyiGosterenComponent>
      ) : (
        <BesmeleEtkisiInfo />
      )}
    </KapsayiciComponent>
  );
};

export default BesmeleEtkisi;