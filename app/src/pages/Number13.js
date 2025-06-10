import React, { useEffect, useState } from "react";
import {
  calculateMod19,
  handleTotalClick,
  handleAyatClick,
  handleTotalAyatClick,
  isDifferent,
  handleSurahNoClick,
  handleAyahsTotalClick,
  handleSurahNumberClick,
  handleTotalAyahsInQuranClick,
  suredekiAyetSayisiniYazdir,
  suredekiAyetSayisiniHesaplamaDizisineEkle,
  kurandakiToplamAyetSayisiniYazdir,
  kurandakiToplamAyetSayisiniHesaplamaDizisineEkle,
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
import Number13Info from "../Informations/Number13Info";

const Number13 = () => {
  const { quranList } = useQuran();
  const [orginQuranEmptyList, setOrginQuranEmptyList] = useState([]);
  const [olusanDizi, setOlusanDizi] = useState([]);
  const [stringSayi, setStringSayi] = useState("");
  const [goster, setGoster] = useState(false);
  const [selectedSurahs, setSelectedSurahs] = useState([]);
  const [copyState, setCopyState] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(stringSayi)
      .then(() => {
        toast.success("Sayı Kopyalandı.");
      })
      .catch(() => {
        toast.error("Kopyalama başarısız.");
      });
    setCopyState(true);
  };

  const toggleGoster = () => {
    setCopyState(false);
    setGoster(!goster);
  };

  const { differentRefs } = useDifferentRefs();

  useEffect(() => {
    const orjinalBosDizi = [];
    kurandakiToplamAyetSayisiniYazdir(QURAN, orjinalBosDizi);
    QURAN.forEach((sure) => {
      suredekiAyetSayisiniYazdir(sure, orjinalBosDizi);
    });
    kurandakiToplamAyetSayisiniYazdir(QURAN, orjinalBosDizi);
    setOrginQuranEmptyList(orjinalBosDizi);
  }, []);

  useEffect(() => {
    let bosDizi = [];
    let stringBuyukSayi = "";

    ({ bosDizi, stringBuyukSayi } = kurandakiToplamAyetSayisiniHesaplamaDizisineEkle(quranList, bosDizi, stringBuyukSayi));

    quranList.forEach((sure) => {
      ({ bosDizi, stringBuyukSayi } = suredekiAyetSayisiniHesaplamaDizisineEkle(sure, bosDizi, stringBuyukSayi));
    });

    ({ bosDizi, stringBuyukSayi } = kurandakiToplamAyetSayisiniHesaplamaDizisineEkle(quranList, bosDizi, stringBuyukSayi));

    setOlusanDizi(bosDizi);
    setStringSayi(stringBuyukSayi);
  }, [quranList]);

  return (
    <KapsayiciComponent>
      <Helmet>
        <title>Sayı 13</title>
      </Helmet>
      <ResultDisplay stringSayi={stringSayi} calculateMod19={calculateMod19} />
      <ShowButtonToggle toggleGoster={toggleGoster} goster={goster} />
      <CopyAndSelectButtons
        copyState={copyState}
        goster={goster}
        handleCopy={handleCopy}
        setSelectedSurahs={setSelectedSurahs}
      />
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
                  if (eleman.durum === "toplam-ayet-sayisi") {
                    handleTotalAyatClick(eleman.deger);
                  } else if (eleman.durum === "ayet-sayisi") {
                    handleTotalClick(
                      eleman,
                      selectedSurahs,
                      setSelectedSurahs,
                      orginQuranEmptyList
                    );
                  } else if (eleman.durum === "sure-sayisi") {
                    handleSurahNumberClick();
                  } else if (eleman.durum === "tum-ayet-no-toplamlari") {
                    handleTotalAyahsInQuranClick(eleman.deger);
                  } else if (eleman.durum === "ayetNo-toplamlari") {
                    handleAyahsTotalClick(
                      eleman,
                      selectedSurahs,
                      setSelectedSurahs,
                      orginQuranEmptyList
                    );
                  } else if (eleman.durum === "sureNo") {
                    handleSurahNoClick(
                      eleman,
                      setSelectedSurahs
                    );
                  } else {
                    handleAyatClick(
                      eleman,
                      selectedSurahs,
                      setSelectedSurahs,
                      orginQuranEmptyList
                    );
                  }
                }}
                className={`${isDiff ? "text-red-500 font-bold blink" :
                  eleman.durum === "ayet-sayisi" ? "text-yellow-400" :
                  eleman.durum === "tum-ayet-no-toplamlari" ? "text-cyan-400" :
                  eleman.durum === "sure-sayisi" ? "text-orange-400" :
                  eleman.durum === "ayetNo-toplamlari" ? "text-yellow-400" :
                  eleman.durum === "ayetNo" ? "text-white" :
                  eleman.durum === "toplam-ayet-sayisi" ? "text-green-300" :
                  eleman.durum === "sureNo" ? "text-blue-500" : ""
                  } ${selectedSurahs.includes(eleman.sureNo) ? "bg-green-700" : ""} mr-1 mb-1 cursor-pointer`}
              >
                {eleman.deger}
              </span>
            );
          })}
        </SayiyiGosterenComponent>
      ) : (
        <Number13Info />
      )}
    </KapsayiciComponent>
  );
};

export default Number13;
