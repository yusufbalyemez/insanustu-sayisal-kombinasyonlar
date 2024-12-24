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


const BesmeleEtkisi = () => {
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

  const buyukSayiyiOlustur = () => {
    let bosDizi = [];
    let orjinalBosDizi = [];
    let stringBuyukSayi = "";

    //Sayının Gösterildiği Kısım - Start
    QURAN.forEach((sure) => {
      suredekiToplamAyetSayisiniYazdir(sure, orjinalBosDizi);
      if (sure.startsWithBasmala){
        orjinalBosDizi.push({ durum: "besmele", sureNo: sure.surahNumber, sureAdi: sure.surahName, deger: 0 });
      }
      suredekiTumAyetSayilariniYazdir(sure, orjinalBosDizi);
      sureNumarasiniYazdir(sure, orjinalBosDizi);
    });

    kurandakiToplamAyetSayisiniYazdir(QURAN, orjinalBosDizi);
    //Sayının Gösterildiği Kısım - End

    //Hesaplanacak Büyük Sayının Oluşturulduğu kısım - Start
    quranList.forEach((sure) => {
      ({ bosDizi, stringBuyukSayi } =
        suredekiToplamAyetSayisiniHesaplamaDizisineEkle(
          sure,
          bosDizi,
          stringBuyukSayi
        ));
        if (sure.startsWithBasmala){
          bosDizi.push({ durum: "besmele", sureNo: sure.surahNumber, sureAdi: sure.surahName, deger: 0 });
          stringBuyukSayi += "0";
        }
      ({ bosDizi, stringBuyukSayi } =
        suredekiTumAyetSayilariniHesaplamaDizisineEkle(
          sure,
          bosDizi,
          stringBuyukSayi
        ));
      ({ bosDizi, stringBuyukSayi } = sureNumarasiniHesaplamaDizisineEkle(
        sure,
        bosDizi,
        stringBuyukSayi
      ));
    });

    ({ bosDizi, stringBuyukSayi } =
      kurandakiToplamAyetSayisiniHesaplamaDizisineEkle(
        quranList,
        bosDizi,
        stringBuyukSayi
      ));

    //Hesaplanacak Büyük Sayının Oluşturulduğu kısım - End

    setOlusanDizi(bosDizi);
    setOrginQuranEmptyList(orjinalBosDizi);
    setStringSayi(stringBuyukSayi);
  };

  useEffect(() => {
    buyukSayiyiOlustur();
  }, [quranList]);

  return (
    <KapsayiciComponent>
      {/* Sayfanın başlığını ayarlama */}
      <Helmet>
        <title>Besmele Etkisi</title>
      </Helmet>

      {/* 19'a bölümünden kalanını ve basamak sayısını gösteren bileşen */}
      <ResultDisplay stringSayi={stringSayi} calculateMod19={calculateMod19} />

      {/* Sayıyı yada Açıklama Metnini Gösteren Bileşen */}
      <ShowButtonToggle toggleGoster={toggleGoster} goster={goster} />

      {/* Sayıyı kopyalayan ve seçimleri iptal eden buton bileşeni */}
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
                  } 
                   else if (eleman.durum === "ayet-sayisi") {
                    handleTotalClick(
                      eleman.sureNo,
                      eleman.sureAdi,
                      eleman.deger,
                      selectedSurahs,
                      setSelectedSurahs
                    );
                  } else if (eleman.durum === "sureNo") {
                    handleSurahNoClick(
                      eleman.sureNo,
                      eleman.sureAdi,
                      setSelectedSurahs
                    );
                  } else {
                    handleBasmalaClick(
                      eleman.sureNo,
                      eleman.sureAdi,
                      true,
                      selectedSurahs,
                      setSelectedSurahs
                    );
                  }
                }}
                className={`${
                  isDifferent(eleman, orginQuranEmptyList)
                    ? "text-red-500 font-bold blink" // Eğer farklıysa kırmızı
                    : eleman.durum === "ayet-sayisi"
                    ? "text-yellow-400" // Ayet sayısı için sarı
                    : eleman.durum === "besmele"
                    ? "text-orange-400" // Ayet sayısı için sarı
                    : eleman.durum === "ayetNo"
                    ? "text-white" // Ayet numarası için beyaz
                    : eleman.durum === "toplam-ayet-sayisi"
                    ? "text-green-300" // Toplam ayet sayısı için mavi
                    : eleman.durum === "sureNo"
                    ? "text-blue-500" // sure numarası için mavi
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
        //Sayının bilgi metnini gösteren bileşen
        <BesmeleEtkisiInfo/>
      )}
    </KapsayiciComponent>
  );
};

export default BesmeleEtkisi;
