 // Tüm surelerdeki toplam ayet sayısını hesaplayan fonksiyon
export const calculateTotalAyahs = (surahInfo) => {
    return surahInfo.reduce((total, surah) => total + surah.totalAyahs, 0);
  };


 // Metinsel olarak büyük sayının 19'a bölümünden kalanını hesaplayan fonksiyon
 export const calculateMod19 = (numStr) => {
    let remainder = 0;

    for (let i = 0; i < numStr.length; i++) {
      remainder = (remainder * 10 + parseInt(numStr[i])) % 19;
    }

    return remainder;
  };

  // Surelerin toplam ayet sayısını gösteren span elemanı oluşturma fonksiyonu
export const generateTotalAyatSpan = (surah, surahIndex, handleTotalClick) => {
    return (
      <span
        key={`surah-${surahIndex}-total`}
        style={{ color: "red", fontWeight: "bold", cursor: "pointer", marginRight: "5px" }}
        onClick={() => handleTotalClick(surah.surahNumber, surah.surahName)}
      >
        {surah.totalAyahs}
      </span>
    );
  };
  
  // Suredeki tüm ayet numaralarını gösteren span elemanları oluşturma fonksiyonu
  export const generateAyatNumberSpans = (surah, surahIndex, handleAyatClick) => {
    const ayatNumberSpans = [];
    for (let i = 1; i <= surah.totalAyahs; i++) {
      ayatNumberSpans.push(
        <span
          key={`surah-${surahIndex}-ayat-${i}`}
          style={{ cursor: "pointer", marginRight: "5px" }}
          onClick={() => handleAyatClick(surah.surahNumber, surah.surahName, i)}
        >
          {i}
        </span>
      );
    }
    return ayatNumberSpans;
  };
  
  // Surelerin ayet bilgilerini başa veya sona ayet sayısını ekleyerek birleştiren ana fonksiyon
  export const generateSurahDisplay = (surahInfo, handleTotalClick, handleAyatClick, position = "start") => {
    return surahInfo.map((surah, surahIndex) => {
      const totalAyatSpan = generateTotalAyatSpan(surah, surahIndex, handleTotalClick);
      const ayatNumberSpans = generateAyatNumberSpans(surah, surahIndex, handleAyatClick);
  
      // Ayet sayısını başa veya sona ekleyerek diziyi oluşturuyoruz
      return position === "start"
        ? [totalAyatSpan, ...ayatNumberSpans] // Başta toplam ayet sayısı
        : [...ayatNumberSpans, totalAyatSpan]; // Sonda toplam ayet sayısı
    });
  };