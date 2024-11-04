import { useEffect, useState, useCallback } from "react";
import surahInfo from "../assets/SurahInfo.json";
import { calculateMod19, generateSurahDisplay, calculateTotalAyahs } from "../components/Functions";
import { toast } from "react-toastify";

const Number1 = () => {
  const [surahDisplay, setSurahDisplay] = useState([]);
  const [mod19, setMod19] = useState(null);
  const [digitCount, setDigitCount] = useState(0);

 // Toplam ayet sayısına tıklanınca sure adı ve numarası bildiriliyor
 const handleTotalClick = useCallback((surahNumber, surahName) => {
    toast.success(`[${surahNumber}] ${surahName} Suresinin Ayet Sayısı`);
  }, []);

  // Ayet numarasına tıklanınca sure numarası, sure adı ve ayet numarası bildiriliyor
  const handleAyatClick = useCallback((surahNumber, surahName, ayatNumber) => {
    toast.success(`[${surahNumber}] ${surahName} ${ayatNumber}.Ayet`);
  }, []);

  useEffect(() => {
    // Sure bilgilerini başta veya sonda toplam ayet sayısını gösterecek şekilde oluştur
    const surahList = generateSurahDisplay(surahInfo, handleTotalClick, handleAyatClick, "start");

   
    // Tüm surelerin numaralarını düz bir dizi haline getirip totalAyahs ile birleştiriyoruz
    const allSurahNumbers = surahList.flat();


    setSurahDisplay(allSurahNumbers);

    // 19'a göre modunu hesapla
    const combinedText = allSurahNumbers.map((item) => item.props.children).join("");
    const modResult = calculateMod19(combinedText);
    setMod19(modResult);

    // Basamak sayısını hesapla
    setDigitCount(combinedText.length);
  }, [handleTotalClick, handleAyatClick]);

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1>Tüm Surelerin Ayet Bilgisi</h1>
      <div className="w-full md:w-10/12"
        style={{
          overflowWrap: "break-word",
          wordWrap: "break-word",
          whiteSpace: "normal",
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "20px",
        }}
      >
        {surahDisplay}
      </div>
      <h2>19'a bölümünden kalan: {mod19}</h2>
      <h3>Toplam Basamak Sayısı: {digitCount}</h3>
    </div>
  );
};

export default Number1;