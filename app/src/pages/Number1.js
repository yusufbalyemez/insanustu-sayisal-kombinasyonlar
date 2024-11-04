import { useEffect, useState } from "react";
import surahInfo from "../assets/SurahInfo.json";

const Number1 = () => {
  const [surahDisplay, setSurahDisplay] = useState([]);
  const [mod19, setMod19] = useState(null);

  useEffect(() => {
    // Tüm surelerin toplam ayet sayısını ve numaralarını birleştiriyoruz
    const surahList = surahInfo.map((surah, surahIndex) => {
      const ayetSayisi = surah.totalAyahs;

      // Ayet sayısını kırmızı ve kalın yapıyoruz ve tıklanınca sure adını gösterecek şekilde ayarlıyoruz
      const ayetler = [
        <span
          key={`surah-${surahIndex}-total`}
          style={{ color: "red", fontWeight: "bold", cursor: "pointer", marginRight: "5px" }}
          onClick={() => alert(`Sure Adı: ${surah.surahName}`)}
        >
          {ayetSayisi}
        </span>,
      ];

      // 1'den ayet sayısına kadar olan numaraları ekliyoruz
      for (let i = 1; i <= ayetSayisi; i++) {
        ayetler.push(
          <span
            key={`surah-${surahIndex}-ayat-${i}`}
            style={{ cursor: "pointer", marginRight: "5px" }}
            onClick={() => alert(`Sure Adı: ${surah.surahName}, Ayet No: ${i}`)}
          >
            {i}
          </span>
        );
      }

      return ayetler;
    });

    const allSurahNumbers = surahList.flat(); // Tüm surelerin numaralarını düz bir dizi haline getir
    setSurahDisplay(allSurahNumbers);

    // 19'a göre modunu hesapla
    const modResult = calculateMod19(allSurahNumbers.map((item) => item.props.children).join(""));
    setMod19(modResult);
  }, []);

  // Metinsel olarak büyük sayının 19'a bölümünden kalanını hesaplayan fonksiyon
  const calculateMod19 = (numStr) => {
    let remainder = 0;

    for (let i = 0; i < numStr.length; i++) {
      remainder = (remainder * 10 + parseInt(numStr[i])) % 19;
    }

    return remainder;
  };

  return (
    <div>
      <h1>Tüm Surelerin Ayet Bilgisi</h1>
      <div
        style={{
          width: "1000px",
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
    </div>
  );
};

export default Number1;