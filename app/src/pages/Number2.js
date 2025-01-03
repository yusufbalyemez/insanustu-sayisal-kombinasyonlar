import React, { useEffect, useState } from "react";
import {
  calculateMod19,
  handleTotalClick,
  handleAyatClick,
  handleTotalAyatClick,
  calculateTotalAyahs,
  isDifferent,
} from "../components/Functions";
import { useQuran } from "../context/quranListContext";
import { SiMiraheze } from "react-icons/si";
import QURAN from "../assets/SurahInfo.json";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import ShowButtonToggle from "../components/ShowButtonToggle";
import ResultDisplay from "../components/ResultDisplay";
import CopyAndSelectButtons from "../components/CopyAndSelectButtons";
import { useDifferentRefs } from "../context/DifferentRefsContext";
import Number2Info from "../Informations/Number2Info";

const Number2 = () => {
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

  useEffect(() => {
    const bosDizi = []; //Yeniden sıralanacak boş dizi oluşturur
    const orjinalBosDizi = []; //SurahInfo jsonundaki bilgiler buraya yazdırılacak.
    let stringBuyukSayi = ""; // 19'a bölünecek devasa metinsel sayıyı oluşturur.

    //SurahInfo Json içerisindeki surelere erişir.
    QURAN.forEach((sure) => {
      //Start - Suredeki Tüm Ayet Sayılarını Yazdırır.
      for (let i = 1; i <= sure.totalAyahs; i++) {
        orjinalBosDizi.push({
          durum: "ayetNo",
          sureAdi: sure.surahName,
          sureNo: sure.surahNumber,
          deger: i,
        });
      }
      //End

      //Start -Suredeki Toplam Ayet Sayısını Yazdırır
      orjinalBosDizi.push({
        durum: "ayet-sayisi",
        sureAdi: sure.surahName,
        sureNo: sure.surahNumber,
        deger: sure.totalAyahs,
      });
      //End
    });
    //End

    //Start - Kurandaki Tüm Ayet Numaralarını Toplar
    const gercekToplam = calculateTotalAyahs(QURAN);

    orjinalBosDizi.push({
      durum: "toplam-ayet-sayisi",
      deger: gercekToplam,
    });
    //End

    //Tüm Kuran içerisindeki surelere erişir.
    quranList.forEach((sure) => {
      //Start - Suredeki Tüm Ayet Sayılarını Yazdırır.
      for (let i = 1; i <= sure.totalAyahs; i++) {
        bosDizi.push({
          durum: "ayetNo",
          sureAdi: sure.surahName,
          sureNo: sure.surahNumber,
          deger: i,
        });
        stringBuyukSayi += i.toString();
      }
      //End

      //Start -Suredeki Toplam Ayet Sayısını Yazdırır
      bosDizi.push({
        durum: "ayet-sayisi",
        sureAdi: sure.surahName,
        sureNo: sure.surahNumber,
        deger: sure.totalAyahs,
      });
      stringBuyukSayi += sure.totalAyahs.toString();
      //End
    });
    //End

    //Start - Kurandaki Tüm Ayet Numaralarını Toplar
    const hesaplananToplam = calculateTotalAyahs(quranList);

    bosDizi.push({
      durum: "toplam-ayet-sayisi",
      deger: hesaplananToplam,
    });
    stringBuyukSayi += hesaplananToplam.toString();
    //End

    setOlusanDizi(bosDizi);
    setOrginQuranEmptyList(orjinalBosDizi);
    setStringSayi(stringBuyukSayi);
  }, [quranList]);

  return (
    <div className="flex flex-col justify-center items-center gap-2 mt-5">
      {/* Sayfanın başlığını ayarlama */}
      <Helmet>
        <title>Sayı 2</title>
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
        <div
          className="break-words border border-gray-300 p-4 mb-5
       w-full md:w-10/12 bg-gradient-to-l from-gray-700 to-gray-800
        rounded-lg text-xl overflow-y-auto hover:ring-4
         hover:ring-yellow-400 transition-all max-h-[60vh]"
        >
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
                      eleman.sureNo,
                      eleman.sureAdi,
                      eleman.deger,
                      selectedSurahs,
                      setSelectedSurahs
                    );
                  } else {
                    handleAyatClick(
                      eleman.sureNo,
                      eleman.sureAdi,
                      eleman.deger,
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
                    : eleman.durum === "ayetNo"
                    ? "text-white" // Ayet numarası için beyaz
                    : eleman.durum === "toplam-ayet-sayisi"
                    ? "text-green-300" // Toplam ayet sayısı için mavi
                    : ""
                } ${
                  selectedSurahs.includes(eleman.sureNo) ? "bg-green-700" : ""
                } mr-1 mb-1 cursor-pointer`}
              >
                {eleman.deger}
              </span>
            );
          })}
        </div>
      ) : (
        <Number2Info/>
      )}
    </div>
  );
};

export default Number2;
