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
import ResultDisplay from "../components/ResultDisplay";
import { useDifferentRefs } from "../context/DifferentRefsContext";
import SayiyiGosterenComponent from "../components/SayiyiGosterenComponent";
import KapsayiciComponent from "../components/KapsayiciComponent";
import Number5Info from "../Informations/Number5Info";
import GosterCopyController from "../components/GosterCopyController";

const Number5 = () => {
  const { quranList } = useQuran(); //Jsondaki Orjinal Kuran listesini bu değişkene aktarır.
  const [orginQuranEmptyList, setOrginQuranEmptyList] = useState([]); //JSONdaki bilgileri büyük sayı hale getirmek için kullanılan boş dizi.
  const [olusanDizi, setOlusanDizi] = useState([]); //Jsondaki ve tabloda değişiklik olursa oluşacak sayıyı oluşturan boş dizi
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
      .catch((err) => {
        toast.error("Kopyalama başarısız.");
      });
    setCopyState(true);
  };

  const toggleGoster = () => {
    setCopyState(false);
    setGoster(!goster);
  };

  // Context üzerinden referanslara erişim
  const { differentRefs } = useDifferentRefs();

  // 🔧 Orijinal verileri oluşturur (sadece 1 kere)
  useEffect(() => {
    const orjinalBosDizi = [];

    QURAN.forEach((sure) => {
      suredekiTumAyetSayilariniYazdir(sure, orjinalBosDizi);
      suredekiAyetNumaralarinToplaminiYazdir(sure, orjinalBosDizi);
    });

    setOrginQuranEmptyList(orjinalBosDizi);
  }, []);

  // 🔁 Hesaplama dizisini oluşturur (quranList değişince tetiklenir)
  useEffect(() => {
    let bosDizi = [];
    let stringBuyukSayi = "";

    quranList.forEach((sure) => {
      ({ bosDizi, stringBuyukSayi } =
        suredekiTumAyetSayilariniHesaplamaDizisineEkle(sure, bosDizi, stringBuyukSayi));

      ({ bosDizi, stringBuyukSayi } =
        suredekiAyetNumaralarinToplaminiHesaplamaDizisineEkle(sure, bosDizi, stringBuyukSayi));
    });

    setOlusanDizi(bosDizi);
    setStringSayi(stringBuyukSayi);
  }, [quranList]);


  return (
    <KapsayiciComponent>
      {/* Sayfanın başlığını ayarlama */}
      <Helmet>
        <title>Sayı 5</title>
      </Helmet>

      {/* 19'a bölümünden kalanını ve basamak sayısını gösteren bileşen */}
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

            if (isDiff) {
              // Farklı elemanları referans nesnesine kaydet
              differentRefs.current[index] = null;
            }
            return (
              <span
                key={index}
                ref={(el) => {
                  if (isDiff) {
                    differentRefs.current[index] = el; // Sadece farklı elemanları ekliyoruz
                  } else {
                    delete differentRefs.current[index]; // Farklı olmayanları temizliyoruz
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
                className={`${isDifferent(eleman, orginQuranEmptyList)
                  ? "text-red-500 font-bold blink" // Eğer farklıysa kırmızı
                  : eleman.durum === "ayet-sayisi"
                    ? "text-yellow-400" // Ayet sayısı için sarı
                    : eleman.durum === "ayetNo-toplamlari"
                      ? "text-yellow-400" // Ayet sayısı için sarı
                      : eleman.durum === "ayetNo"
                        ? "text-white" // Ayet numarası için beyaz
                        : eleman.durum === "toplam-ayet-sayisi"
                          ? "text-green-300" // Toplam ayet sayısı için mavi
                          : eleman.durum === "sureNo"
                            ? "text-blue-500" // sure numarası için mavi
                            : ""
                  } ${selectedSurahs.includes(eleman.sureNo) ? "bg-green-700" : ""
                  } mr-1 mb-1 cursor-pointer`}
              >
                {eleman.deger}
              </span>
            );
          })}
        </SayiyiGosterenComponent>
      ) : (
        //Sayının bilgi metnini gösteren bileşen
        <Number5Info />
      )}
    </KapsayiciComponent>
  );
};

export default Number5;
