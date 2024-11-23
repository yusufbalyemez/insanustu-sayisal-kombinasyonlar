import React, { useEffect, useState } from "react";
import {
  calculateMod19,
  handleTotalClick,
  handleAyatClick,
  handleTotalAyatClick,
} from "../components/Functions";
import { useQuran } from "../context/quranListContext";
import { BiShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import { RiNumbersFill } from "react-icons/ri";
import { CgMathDivide } from "react-icons/cg";
import { SiMiraheze } from "react-icons/si";
import { FaCopy } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import QURAN from "../assets/SurahInfo.json";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { TbSquaresSelected } from "react-icons/tb";


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

  // Dizileri Karşılaştırma fonksiyonu
  const isDifferent = (eleman) => {
    const originalElement = orginQuranEmptyList.find(
      (orjEleman) =>
        orjEleman.sureNo === eleman.sureNo &&
        orjEleman.durum === eleman.durum &&
        orjEleman.deger === eleman.deger
    );
    return !originalElement;
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5 mt-5">
      <Helmet>
        <title>Sayı 1</title> {/* Sayfanın başlığı */}
      </Helmet>
      <div
        className="flex flex-col items-center justify-center p-6
       bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg shadow-2xl
        ring-2 ring-gray-600 hover:ring-4 hover:ring-yellow-400 transition-all
         duration-300 text-white min-w-72"
      >
        <div>
          <p className="flex items-center text-lg font-semibold mb-2">
            <RiNumbersFill className="text-lg mr-1" />
            Basamak Sayısı:{" "}
            <span className="text-yellow-300 ml-1">{stringSayi.length}</span>
          </p>
          <p className="flex items-center text-lg font-semibold">
            <CgMathDivide className="text-lg font-bold" />
            19'a bölümünden kalan:
            <span className="text-green-300 ml-1">
              {calculateMod19(stringSayi)}
            </span>
          </p>
        </div>
      </div>

      <button
        onClick={toggleGoster}
        className={`mb-4 px-4 py-2 font-bold rounded flex items-center justify-center gap-2 ${
          goster ? "bg-green-900 text-white" : "bg-yellow-400 text-blue-900"
        }`}
      >
        {goster ? (
          <>
            <BiSolidHide className="text-lg" />
            Metni Göster
          </>
        ) : (
          <>
            <BiShow className="text-lg" />
            Sayıyı Göster
          </>
        )}
      </button>

      {goster && (
        <div>
          <div className="flex justify-end items-center gap-2">
            <button
              className="bg-gray-700 p-2 text-white rounded flex items-center justify-center gap-1"
              onClick={handleCopy}
            >
              {copyState ? (
                <>
                  <FaCircleCheck />
                  Kopyalandı
                </>
              ) : (
                <>
                  <FaCopy />
                  Sayıyı Kopyala
                </>
              )}
            </button>
            <button
              className="bg-gray-700 p-2 text-white rounded flex items-center justify-center gap-1"
              onClick={()=> setSelectedSurahs([])}
            >
              <TbSquaresSelected />
              Seçimleri Kaldır
            </button>
          </div>
        </div>
      )}

      {goster ? (
        <div
          className="break-words border border-gray-300 p-4 mb-5
         w-full md:w-10/12 bg-gradient-to-l from-gray-700 to-gray-800
          rounded-lg text-xl overflow-y-auto hover:ring-4
           hover:ring-yellow-400 transition-all max-h-[500px] md:max-h-[400px]"
        >
          {olusanDizi.map((eleman, index) => (
            <span
              key={index}
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
                isDifferent(eleman)
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
          ))}
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
          <p>7 1 2 3 4 5 6 7 & 286 1 2 3 4 5….284 285 286.</p>
          <p>
            İlk iki sureyi temsil eden bir sayı oluşturmak için bu iki sayıyı
            bir araya getirirsek, şu sayıyı alırız:
          </p>
          <p>7 1 2 3 4 5 6 7 286 1 2 3 4 5.....284 285 286.</p>
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
