// ✅ Düzenlenmiş Number9.jsx
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
  kurandakiToplamAyetSayisiniYazdir,
  kurandakiToplamAyetSayisiniHesaplamaDizisineEkle,
  kurandakiSureSayisiniYazdir,
  kurandakiSureSayisiniHesaplamaDizisineEkle,
  sureNumaralariniYazdir,
  suredekiAyetSayisiniYazdir,
  sureNumarasiniHesaplamaDizisineEkle,
  suredekiAyetSayisiniHesaplamaDizisineEkle,
  handleSurahNumberClick,
  handleTotalAyahsInQuranClick,
} from "../components/Functions";
import { useQuran } from "../context/quranListContext";
import QURAN from "../assets/SurahInfo.json";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import ResultDisplay from "../components/ResultDisplay";
import { useDifferentRefs } from "../context/DifferentRefsContext";
import SayiSpan from "../components/SayiSpan";
import SayiGrafigi from "../components/SayiGrafigi";
import SayiyiGosterenComponent from "../components/SayiyiGosterenComponent";
import KapsayiciComponent from "../components/KapsayiciComponent";
import Number9Info from "../Informations/Number9Info";
import GosterCopyController from "../components/GosterCopyController";

const Number9 = () => {
  const { quranList, degistirildi } = useQuran();
  const [orginQuranEmptyList, setOrginQuranEmptyList] = useState([]);
  const [olusanDizi, setOlusanDizi] = useState([]);
  const [stringSayi, setStringSayi] = useState("");
  // Listede değişiklik varsa sayılar açık gelir (çubuk ilk farka kaydırır)
  const [goster, setGoster] = useState(degistirildi);
  const [selectedSurahs, setSelectedSurahs] = useState([]);
  const [copyState, setCopyState] = useState(false);
  const { differentRefs } = useDifferentRefs();

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

  useEffect(() => {
    const orjinalBosDizi = [];
    tumAyetNumaralarininToplaminiYazdir(QURAN, orjinalBosDizi);
    kurandakiToplamAyetSayisiniYazdir(QURAN, orjinalBosDizi);
    kurandakiSureSayisiniYazdir(QURAN, orjinalBosDizi);
    QURAN.forEach((sure) => {
      suredekiAyetSayisiniYazdir(sure, orjinalBosDizi);
      sureNumaralariniYazdir(sure, orjinalBosDizi);
    });
    setOrginQuranEmptyList(orjinalBosDizi);
  }, []);

  useEffect(() => {
    let bosDizi = [];
    let stringBuyukSayi = "";
    ({ bosDizi, stringBuyukSayi } = tumAyetNumaralarininToplaminiHesaplamaDizisineEkle(quranList, bosDizi, stringBuyukSayi));
    ({ bosDizi, stringBuyukSayi } = kurandakiToplamAyetSayisiniHesaplamaDizisineEkle(quranList, bosDizi, stringBuyukSayi));
    ({ bosDizi, stringBuyukSayi } = kurandakiSureSayisiniHesaplamaDizisineEkle(quranList, bosDizi, stringBuyukSayi));
    quranList.forEach((sure) => {
      ({ bosDizi, stringBuyukSayi } = suredekiAyetSayisiniHesaplamaDizisineEkle(sure, bosDizi, stringBuyukSayi));
      ({ bosDizi, stringBuyukSayi } = sureNumarasiniHesaplamaDizisineEkle(sure, bosDizi, stringBuyukSayi));
    });
    setOlusanDizi(bosDizi);
    setStringSayi(stringBuyukSayi);
  }, [quranList]);

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
                case "ayetNo-toplamlari":
                  handleAyahsTotalClick(eleman, selectedSurahs, setSelectedSurahs, orginQuranEmptyList);
                  break;
                case "sureNo":
                  handleSurahNoClick(eleman, setSelectedSurahs);
                  break;
                case "sure-sayisi":
                  handleSurahNumberClick();
                  break;
                case "tum-ayet-no-toplamlari":
                  handleTotalAyahsInQuranClick(eleman.deger);
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
        <title>Sayı 9</title>
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
                : eleman.durum === "ayetNo"
                  ? "text-white"
                  : eleman.durum === "toplam-ayet-sayisi"
                    ? "text-green-300"
                    : eleman.durum === "sureNo"
                      ? "text-blue-500"
                      : eleman.durum === "sure-sayisi"
                        ? "text-orange-400"
                        : eleman.durum === "tum-ayet-no-toplamlari"
                          ? "text-cyan-400"
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
        <>
          <Number9Info />
          {/* Metnin grafiksel anlatımı */}
          <SayiGrafigi
            dizi={olusanDizi}
            orjinal={orginQuranEmptyList}
            stringSayi={stringSayi}
          />
        </>
      )}
    </KapsayiciComponent>
  );
};

export default Number9;
