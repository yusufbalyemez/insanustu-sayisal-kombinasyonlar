import React, { useEffect, useState } from "react";
import {
  calculateMod19,
  handleTotalClick,
  handleAyatClick,
  handleTotalAyatClick,
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

const Number1 = () => {
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

  console.log(differentRefs);

  useEffect(() => {
    const bosDizi = []; //Yeniden sıralanacak boş dizi oluşturur
    const orjinalBosDizi = []; //SurahInfo jsonundaki bilgiler buraya yazdırılacak.
    let stringBuyukSayi = ""; // 19'a bölünecek devasa metinsel sayıyı oluşturur.

    //SurahInfo Json içerisindeki surelere erişir.
    QURAN.forEach((sure) => {
      //Start -Suredeki Toplam Ayet Sayısını Yazdırır
      orjinalBosDizi.push({
        durum: "ayet-sayisi",
        sureAdi: sure.surahName,
        sureNo: sure.surahNumber,
        deger: sure.totalAyahs,
      });
      //End

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
    });
    //End

    //Tüm Kuran içerisindeki surelere erişir.
    quranList.forEach((sure) => {
      //Start -Suredeki Toplam Ayet Sayısını Yazdırır
      bosDizi.push({
        durum: "ayet-sayisi",
        sureAdi: sure.surahName,
        sureNo: sure.surahNumber,
        deger: sure.totalAyahs,
      });
      stringBuyukSayi += sure.totalAyahs.toString();
      //End

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
    });
    //End

    setOlusanDizi(bosDizi);
    setOrginQuranEmptyList(orjinalBosDizi);
    setStringSayi(stringBuyukSayi);
  }, [quranList]);

  return (
    <div className="flex flex-col justify-center items-center gap-5 mt-5">
      {/* Sayfanın başlığını ayarlama */}
      <Helmet>
        <title>Sayı 1</title>
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
           hover:ring-yellow-400 transition-all max-h-[500px] md:max-h-[400px]"
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
                    handleTotalAyatClick();
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
                    ? "text-blue-600" // Toplam ayet sayısı için mavi
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
        <div
          className="text-white flex flex-col items-center gap-10 break-words
         border border-gray-300 p-4 mb-5 w-full md:w-10/12 bg-gradient-to-l
          from-gray-700 to-gray-800 rounded-lg text-xl overflow-y-auto max-h-[500px] md:max-h-[400px]
           hover:ring-4 hover:ring-yellow-400 transition-all"
        >
          <p className="text-yellow-400 flex items-center gap-2">
            <SiMiraheze />
            Birinci Sayı
          </p>
          <p>
            Kuran’daki her bir ayetin numarasını yazalım, önüne de her bir sure
            için bu suredeki ayet sayısını yazalım. Böylelikle, yedi ayetten
            oluşan Sure 1, 7 1234567 sayısı ile temsil edilecektir. Burada
            yaptığımız şey, ayet sayılarını yan yana yazarak uzun sayılar
            oluşturmaktır. Sure 2’yi temsil eden sayıyı bulmak için bu suredeki
            ayet sayısı olan 286, ardından her bir ayetin numarasını yan yana
            yazılmış şekilde yazarsınız. Böylelikle, Sure 2’yi temsil eden sayı
            şu şekilde gözükür: 286 12345…284285286. İlk iki sureyi temsil eden
            iki sayı şunlardır:
          </p>
          <p className="text-green-300">
            7 1 2 3 4 5 6 7 & 286 1 2 3 4 5….284 285 286.
          </p>
          <p>
            İlk iki sureyi temsil eden bir sayı oluşturmak için bu iki sayıyı
            bir araya getirirsek, şu sayıyı alırız:
          </p>
          <p className="text-green-300">
            7 1 2 3 4 5 6 7 286 1 2 3 4 5.....284 285 286.
          </p>
          <p>
            Bu işlem, Kuran’daki her bir ayet yazılıncaya kadar devam ettirilir,
            böylece Kuran’daki her ayetin numarasını içine alan çok uzun bir
            sayı oluşur. Tüm Kuran’ı temsil eden sayı 19’un bir katıdır & 12692
            basamaklıdır ki bu da 19’un bir katıdır.
          </p>
          <p>
            Bu çok uzun sayı 12692 (19x668) basmaktan oluşur ve Kuran’daki her
            bir ayeti içermektedir. Her bir suredeki ayet sayısı, ayetlerinin
            önünde yer almaktadır. Çok uzun sayıları bölen özel bir bilgisayar
            programı bu sayının 19’un katı olduğunu gösterdi.
          </p>
        </div>
      )}
    </div>
  );
};

export default Number1;
