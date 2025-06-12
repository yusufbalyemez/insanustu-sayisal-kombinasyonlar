import { useEffect, useState } from "react";
import {
  calculateMod19,
  handleTotalClick,
  handleAyatClick,
  handleTotalAyatClick,
  calculateTotalAyahs,
  isDifferent,
  handleSurahNoClick,
} from "../components/Functions";
import { useQuran } from "../context/quranListContext";
import QURAN from "../assets/SurahInfo.json";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import ResultDisplay from "../components/ResultDisplay";
import { useDifferentRefs } from "../context/DifferentRefsContext";
import SayiyiGosterenComponent from "../components/SayiyiGosterenComponent";
import KapsayiciComponent from "../components/KapsayiciComponent";
import Number2Info from "../Informations/Number2Info";
import GosterCopyController from "../components/GosterCopyController";

const Number2 = () => {
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
      for (let i = 1; i <= sure.totalAyahs; i++) {
        orjinalBosDizi.push({
          durum: "ayetNo",
          sureAdi: sure.surahName,
          sureNo: sure.surahNumber,
          deger: i,
        });
      }

      orjinalBosDizi.push({
        durum: "ayet-sayisi",
        sureAdi: sure.surahName,
        sureNo: sure.surahNumber,
        deger: sure.totalAyahs,
      });
    });

    const toplam = calculateTotalAyahs(QURAN);

    orjinalBosDizi.push({
      durum: "toplam-ayet-sayisi",
      deger: toplam,
    });

    setOrginQuranEmptyList(orjinalBosDizi);
  }, []);

  useEffect(() => {
    const bosDizi = [];
    let stringBuyukSayi = "";

    quranList.forEach((sure) => {
      for (let i = 1; i <= sure.totalAyahs; i++) {
        bosDizi.push({
          durum: "ayetNo",
          sureAdi: sure.surahName,
          sureNo: sure.surahNumber,
          deger: i,
        });
        stringBuyukSayi += i.toString();
      }

      bosDizi.push({
        durum: "ayet-sayisi",
        sureAdi: sure.surahName,
        sureNo: sure.surahNumber,
        deger: sure.totalAyahs,
      });
      stringBuyukSayi += sure.totalAyahs.toString();
    });

    const hesaplananToplam = calculateTotalAyahs(quranList);

    bosDizi.push({
      durum: "toplam-ayet-sayisi",
      deger: hesaplananToplam,
    });
    stringBuyukSayi += hesaplananToplam.toString();

    setOlusanDizi(bosDizi);
    setStringSayi(stringBuyukSayi);
  }, [quranList]);

  return (
    <KapsayiciComponent>
      <Helmet>
        <title>Sayı 2</title>
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
                  if (isDiff) {
                    differentRefs.current[index] = el;
                  } else {
                    delete differentRefs.current[index];
                  }
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
                  } else if (eleman.durum === "sureNo") {
                    handleSurahNoClick(eleman, setSelectedSurahs);
                  } else {
                    handleAyatClick(
                      eleman,
                      selectedSurahs,
                      setSelectedSurahs,
                      orginQuranEmptyList
                    );
                  }
                }}
                className={`${
                  isDiff
                    ? "text-red-500 font-bold blink"
                    : eleman.durum === "ayet-sayisi"
                    ? "text-yellow-400"
                    : eleman.durum === "ayetNo"
                    ? "text-white"
                    : eleman.durum === "toplam-ayet-sayisi"
                    ? "text-green-300"
                    : eleman.durum === "sureNo"
                    ? "text-blue-500"
                    : ""
                } ${
                  selectedSurahs.includes(eleman.sureNo) ? "bg-green-700" : ""
                } mr-1 mb-1 cursor-pointer`}
              >
                {eleman.deger}
              </span>
            );
          })}
        </SayiyiGosterenComponent>
      ) : (
        <Number2Info />
      )}
    </KapsayiciComponent>
  );
};

export default Number2;
