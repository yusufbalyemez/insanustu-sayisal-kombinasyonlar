import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  calculateMod19,
  handleTotalClick,
  handleAyatClick,
  handleTotalAyatClick,
  isDifferent,
  handleSurahNoClick,
  handleAyahsTotalClick,
  tumAyetNumaralarininToplaminiYazdir,
  tumAyetNumaralarininToplaminiHesaplamaDizisineEkle,
  handleSurahNumberClick,
  handleTotalAyahsInQuranClick,
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
import SayiSpan from "../components/SayiSpan";
import SayiyiGosterenComponent from "../components/SayiyiGosterenComponent";
import KapsayiciComponent from "../components/KapsayiciComponent";
import Number10Info from "../Informations/Number10Info";
import GosterCopyController from "../components/GosterCopyController";

const Number10 = () => {
  const { quranList } = useQuran();
  const [orginQuranEmptyList, setOrginQuranEmptyList] = useState([]);
  const [olusanDizi, setOlusanDizi] = useState([]);
  const [stringSayi, setStringSayi] = useState("");
  const [goster, setGoster] = useState(false);
  const [selectedSurahs, setSelectedSurahs] = useState([]);
  const [copyState, setCopyState] = useState(false);
  const { differentRefs } = useDifferentRefs();

  useEffect(() => {
    const orjinalBosDizi = [];
    QURAN.forEach((sure) => {
      suredekiAyetNumaralarinToplaminiYazdir(sure, orjinalBosDizi);
    });
    tumAyetNumaralarininToplaminiYazdir(QURAN, orjinalBosDizi);
    setOrginQuranEmptyList(orjinalBosDizi);
  }, []);

  useEffect(() => {
    let bosDizi = [];
    let stringBuyukSayi = "";
    quranList.forEach((sure) => {
      ({ bosDizi, stringBuyukSayi } = suredekiAyetNumaralarinToplaminiHesaplamaDizisineEkle(sure, bosDizi, stringBuyukSayi));
    });
    ({ bosDizi, stringBuyukSayi } = tumAyetNumaralarininToplaminiHesaplamaDizisineEkle(quranList, bosDizi, stringBuyukSayi));
    setOlusanDizi(bosDizi);
    setStringSayi(stringBuyukSayi);
  }, [quranList]);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(stringSayi)
      .then(() => toast.success(localStorage.getItem("lang_quran_evidence") === "en" ? "Number copied." : "Sayı Kopyalandı."))
      .catch(() => toast.error(localStorage.getItem("lang_quran_evidence") === "en" ? "Copy failed." : "Kopyalama başarısız."));
    setCopyState(true);
  };

  const toggleGoster = () => {
    setCopyState(false);
    setGoster(!goster);
  };

  // Tıklama işleyicisi: her render'da güncel state'i görür ama
  // SayiSpan'a sabit bir fonksiyon gider (memo bozulmasın diye).
  const sayiyaTiklandiRef = useRef();
  sayiyaTiklandiRef.current = (eleman) => {
              switch (eleman.durum) {
                case "toplam-ayet-sayisi":
                  handleTotalAyatClick(eleman.deger);
                  break;
                case "ayet-sayisi":
                  handleTotalClick(eleman, selectedSurahs, setSelectedSurahs, orginQuranEmptyList);
                  break;
                case "sure-sayisi":
                  handleSurahNumberClick();
                  break;
                case "tum-ayet-no-toplamlari":
                  handleTotalAyahsInQuranClick(eleman.deger);
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
  const sayiyaTiklandi = useCallback(
    (eleman) => sayiyaTiklandiRef.current(eleman),
    []
  );

  return (
    <KapsayiciComponent>
      <Helmet>
        <title>Sayı 10</title>
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

            const renkClass = isDiff
              ? "text-red-500 font-bold blink"
              : eleman.durum === "ayet-sayisi" || eleman.durum === "ayetNo-toplamlari"
              ? "text-yellow-400"
              : eleman.durum === "tum-ayet-no-toplamlari"
              ? "text-cyan-400"
              : eleman.durum === "sure-sayisi"
              ? "text-orange-400"
              : eleman.durum === "ayetNo"
              ? "text-white"
              : eleman.durum === "toplam-ayet-sayisi"
              ? "text-green-300"
              : eleman.durum === "sureNo"
              ? "text-blue-500"
              : "";

            const seciliClass = selectedSurahs.includes(eleman.sureNo) ? "bg-green-700" : "";

            return (
              <SayiSpan
                key={index}
                index={index}
                eleman={eleman}
                isDiff={isDiff}
                className={`${renkClass} ${seciliClass} mr-1 mb-1 cursor-pointer`}
                onTap={sayiyaTiklandi}
                differentRefs={differentRefs}
              />
            );
          })}
        </SayiyiGosterenComponent>
      ) : (
        <Number10Info />
      )}
    </KapsayiciComponent>
  );
};

export default Number10;
