// ✅ Düzenlenmiş Number6.jsx
import React, { useEffect, useState } from "react";
import {
  calculateMod19,
  handleTotalClick,
  handleAyatClick,
  handleTotalAyatClick,
  isDifferent,
  handleSurahNoClick,
  suredekiTumAyetSayilariniYazdir,
  suredekiTumAyetSayilariniHesaplamaDizisineEkle,
  handleAyahsTotalClick,
  suredekiAyetNumaralarinToplaminiYazdir,
  suredekiAyetNumaralarinToplaminiHesaplamaDizisineEkle,
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
import Number6Info from "../Informations/Number6Info";
import GosterCopyController from "../components/GosterCopyController";

const Number6 = () => {
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
      suredekiAyetNumaralarinToplaminiYazdir(sure, orjinalBosDizi);
      suredekiTumAyetSayilariniYazdir(sure, orjinalBosDizi);
    });
    setOrginQuranEmptyList(orjinalBosDizi);
  }, []);

  useEffect(() => {
    let bosDizi = [];
    let stringBuyukSayi = "";
    quranList.forEach((sure) => {
      ({ bosDizi, stringBuyukSayi } = suredekiAyetNumaralarinToplaminiHesaplamaDizisineEkle(sure, bosDizi, stringBuyukSayi));
      ({ bosDizi, stringBuyukSayi } = suredekiTumAyetSayilariniHesaplamaDizisineEkle(sure, bosDizi, stringBuyukSayi));
    });
    setOlusanDizi(bosDizi);
    setStringSayi(stringBuyukSayi);
  }, [quranList]);

  return (
    <KapsayiciComponent>
      <Helmet>
        <title>Sayı 6</title>
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

            const handleClick = () => {
              switch (eleman.durum) {
                case "toplam-ayet-sayisi":
                  handleTotalAyatClick(eleman.deger);
                  break;
                case "ayet-sayisi":
                  handleTotalClick(eleman, selectedSurahs, setSelectedSurahs, orginQuranEmptyList);
                  break;
                case "ayetNo-toplamlari":
                  handleAyahsTotalClick(eleman, selectedSurahs, setSelectedSurahs, orginQuranEmptyList);
                  break;
                case "sureNo":
                  handleSurahNoClick(eleman, setSelectedSurahs);
                  break;
                default:
                  handleAyatClick(eleman, selectedSurahs, setSelectedSurahs, orginQuranEmptyList);
              }
            };

            const renkClass = isDiff
              ? "text-red-500 font-bold blink"
              : eleman.durum === "ayet-sayisi" || eleman.durum === "ayetNo-toplamlari"
                ? "text-yellow-400"
                : eleman.durum === "ayetNo"
                  ? "text-white"
                  : eleman.durum === "toplam-ayet-sayisi"
                    ? "text-green-300"
                    : eleman.durum === "sureNo"
                      ? "text-blue-500"
                      : "";

            const seciliClass = selectedSurahs.includes(eleman.sureNo)
              ? "bg-green-700"
              : "";

            return (
              <span
                key={index}
                ref={(el) => {
                  if (isDiff) differentRefs.current[index] = el;
                  else delete differentRefs.current[index];
                }}
                onClick={handleClick}
                className={`${renkClass} ${seciliClass} mr-1 mb-1 cursor-pointer`}
              >
                {eleman.deger}
              </span>
            );
          })}
        </SayiyiGosterenComponent>
      ) : (
        <Number6Info />
      )}
    </KapsayiciComponent>
  );
};

export default Number6;
