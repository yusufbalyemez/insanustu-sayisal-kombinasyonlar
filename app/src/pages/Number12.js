import { useEffect, useState, useRef, useCallback } from "react";
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
  sureNumaralariniYazdir,
  sureNumarasiniHesaplamaDizisineEkle,
  kurandakiSureSayisiniYazdir,
  kurandakiSureSayisiniHesaplamaDizisineEkle,
  kurandakiToplamAyetSayisiniYazdir,
  kurandakiToplamAyetSayisiniHesaplamaDizisineEkle,
  suredekiTumAyetSayilariniYazdir,
  suredekiTumAyetSayilariniHesaplamaDizisineEkle,
  tumAyetNumaralarininToplaminiYazdir,
  tumAyetNumaralarininToplaminiHesaplamaDizisineEkle,
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
import Number12Info from "../Informations/Number12Info";
import GosterCopyController from "../components/GosterCopyController";

const Number12 = () => {
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

  const orjinalVeriyiHazirla = () => {
    const orjinalBosDizi = [];
    kurandakiSureSayisiniYazdir(QURAN, orjinalBosDizi);
    kurandakiToplamAyetSayisiniYazdir(QURAN, orjinalBosDizi);
    tumAyetNumaralarininToplaminiYazdir(QURAN, orjinalBosDizi);
    QURAN.forEach((sure) => {
      sureNumaralariniYazdir(sure, orjinalBosDizi);
      suredekiTumAyetSayilariniYazdir(sure, orjinalBosDizi);
    });
    setOrginQuranEmptyList(orjinalBosDizi);
  };

  const hesaplamayiYap = () => {
    let bosDizi = [];
    let stringBuyukSayi = "";
    ({ bosDizi, stringBuyukSayi } = kurandakiSureSayisiniHesaplamaDizisineEkle(quranList, bosDizi, stringBuyukSayi));
    ({ bosDizi, stringBuyukSayi } = kurandakiToplamAyetSayisiniHesaplamaDizisineEkle(quranList, bosDizi, stringBuyukSayi));
    ({ bosDizi, stringBuyukSayi } = tumAyetNumaralarininToplaminiHesaplamaDizisineEkle(quranList, bosDizi, stringBuyukSayi));
    quranList.forEach((sure) => {
      ({ bosDizi, stringBuyukSayi } = sureNumarasiniHesaplamaDizisineEkle(sure, bosDizi, stringBuyukSayi));
      ({ bosDizi, stringBuyukSayi } = suredekiTumAyetSayilariniHesaplamaDizisineEkle(sure, bosDizi, stringBuyukSayi));
    });
    setOlusanDizi(bosDizi);
    setStringSayi(stringBuyukSayi);
  };

  useEffect(orjinalVeriyiHazirla, []);
  useEffect(hesaplamayiYap, [quranList]);

  // Tıklama işleyicisi: her render'da güncel state'i görür ama
  // SayiSpan'a sabit bir fonksiyon gider (memo bozulmasın diye).
  const sayiyaTiklandiRef = useRef();
  sayiyaTiklandiRef.current = (eleman) => {
                  if (eleman.durum === "toplam-ayet-sayisi") handleTotalAyatClick(eleman.deger);
                  else if (eleman.durum === "ayet-sayisi") handleTotalClick(eleman, selectedSurahs, setSelectedSurahs, orginQuranEmptyList);
                  else if (eleman.durum === "sure-sayisi") handleSurahNumberClick();
                  else if (eleman.durum === "tum-ayet-no-toplamlari") handleTotalAyahsInQuranClick(eleman.deger);
                  else if (eleman.durum === "ayetNo-toplamlari") handleAyahsTotalClick(eleman, selectedSurahs, setSelectedSurahs, orginQuranEmptyList);
                  else if (eleman.durum === "sureNo") handleSurahNoClick(eleman, setSelectedSurahs);
                  else handleAyatClick(eleman, selectedSurahs, setSelectedSurahs, orginQuranEmptyList);
  };
  const sayiyaTiklandi = useCallback(
    (eleman) => sayiyaTiklandiRef.current(eleman),
    []
  );

  return (
    <KapsayiciComponent>
      <Helmet><title>Sayı 12</title></Helmet>
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
            return (
              <SayiSpan
                key={index}
                index={index}
                eleman={eleman}
                isDiff={isDiff}
                className={`${isDiff ? "text-red-500 font-bold blink" :
                  eleman.durum === "ayet-sayisi" ? "text-yellow-400" :
                  eleman.durum === "tum-ayet-no-toplamlari" ? "text-cyan-400" :
                  eleman.durum === "sure-sayisi" ? "text-orange-400" :
                  eleman.durum === "ayetNo-toplamlari" ? "text-yellow-400" :
                  eleman.durum === "ayetNo" ? "text-white" :
                  eleman.durum === "toplam-ayet-sayisi" ? "text-green-300" :
                  eleman.durum === "sureNo" ? "text-blue-500" : ""} ${
                    selectedSurahs.includes(eleman.sureNo) ? "bg-green-700" : ""
                  } mr-1 mb-1 cursor-pointer`}
                onTap={sayiyaTiklandi}
                differentRefs={differentRefs}
              />
            );
          })}
        </SayiyiGosterenComponent>
      ) : (
        <>
          <Number12Info />
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

export default Number12;