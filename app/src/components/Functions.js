import surahInfo from "../assets/SurahInfo.json";
// Tüm surelerdeki toplam ayet sayısını hesaplayan fonksiyon
// helpers.js

import { toast } from "react-toastify";

export const suredekiTumAyetSayilariniYazdir = (sure,orjinalBosDizi) => {
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
};

export const sureNumarasiniYazdir = (sure,orjinalBosDizi) => {
  orjinalBosDizi.push({
    durum: "sureNo",
    sureAdi: sure.surahName,
    sureNo: sure.surahNumber,
    deger: sure.surahNumber,
  });
  //End
}

export const suredekiToplamAyetSayisiniYazdir = (sure,orjinalBosDizi) => {
    //Start -Suredeki Toplam Ayet Sayısını Yazdırır
    orjinalBosDizi.push({
      durum: "ayet-sayisi",
      sureAdi: sure.surahName,
      sureNo: sure.surahNumber,
      deger: sure.totalAyahs,
    });
    //End
  }

export const kurandakiToplamAyetSayisiniYazdir = (QURAN,orjinalBosDizi) => {

  //Start - Kurandaki Tüm Ayet Numaralarını Toplar
  const gercekToplam = calculateTotalAyahs(QURAN);

  orjinalBosDizi.push({
    durum: "toplam-ayet-sayisi",
    deger: gercekToplam,
  });
  //End
}

export const suredekiTumAyetSayilariniHesaplamaDizisineEkle = (sure,bosDizi,stringBuyukSayi) => {
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

  return {bosDizi,stringBuyukSayi};
  //End
}

export const sureNumarasiniHesaplamaDizisineEkle = (sure,bosDizi,stringBuyukSayi) => {
  //Sure Numarasını Ekler - Start
  bosDizi.push({
    durum: "sureNo",
    sureAdi: sure.surahName,
    sureNo: sure.surahNumber,
    deger: sure.surahNumber,
  });
  stringBuyukSayi += sure.surahNumber.toString();
  //End
  return {bosDizi,stringBuyukSayi};
}

export const suredekiToplamAyetSayisiniHesaplamaDizisineEkle = (sure,bosDizi,stringBuyukSayi) => {
    //Start -Suredeki Toplam Ayet Sayısını Yazdırır
    bosDizi.push({
      durum: "ayet-sayisi",
      sureAdi: sure.surahName,
      sureNo: sure.surahNumber,
      deger: sure.totalAyahs,
    });
    stringBuyukSayi += sure.totalAyahs.toString();
    return {bosDizi,stringBuyukSayi};
    //End
    
  }

  export const kurandakiToplamAyetSayisiniHesaplamaDizisineEkle = (quranList,bosDizi,stringBuyukSayi) => { 
    //Start - Kurandaki Tüm Ayet Numaralarını Toplar
    const hesaplananToplam = calculateTotalAyahs(quranList);

    bosDizi.push({
      durum: "toplam-ayet-sayisi",
      deger: hesaplananToplam,
    });
    stringBuyukSayi += hesaplananToplam.toString();
    return {bosDizi,stringBuyukSayi};
    //End

  }


//Spanları seçme - eski
const toggleSurahSelection = (surahNumber, setSelectedSurahs) => {
  setSelectedSurahs((prevSelected) => {
    const isSelected = prevSelected.includes(surahNumber);
    return isSelected
      ? prevSelected.filter((num) => num !== surahNumber)
      : [...prevSelected, surahNumber];
  });
};

/* 
const toggleSurahSelection = (surahNumber, setSelectedSurahs) => {
  setSelectedSurahs((prevSelected) => {
    // Eğer seçiliyse tüm seçimleri kaldır
    return prevSelected.includes(surahNumber) ? [] : [surahNumber];
  });
}; */

/* export const handleTotalClick = (
  surahNumber,
  surahName,
  currentValue,
  setSelectedSurahs
) => {
  setTimeout(() => {
    setSelectedSurahs((prevSelected) => {
      const isSelected = prevSelected.includes(surahNumber);
      const newSelected = isSelected
        ? prevSelected.filter((num) => num !== surahNumber)
        : [...prevSelected, surahNumber];

      // `surahInfo` içerisindeki surahNumber eşleşmesini kontrol et
      const matchedSurah = surahInfo.find(
        (surah) => surah.surahNumber === surahNumber
      );

      if (matchedSurah) {
        if (matchedSurah.totalAyahs === currentValue) {
          toast.success(
            `[${surahNumber}] ${matchedSurah.surahName} Suresinin Ayet Sayısı Doğru: ${matchedSurah.totalAyahs}`
          );
        } else {
          toast.error(
            `[${surahNumber}] ${matchedSurah.surahName} Suresi Ayet Sayısı Yanlış! Doğrusu: ${matchedSurah.totalAyahs} olmalıydı. ${currentValue} değil!`
          );
        }
      } else {
        toast.error(`Geçersiz Sure Numarası: ${surahNumber}`);
      }

      return newSelected;
    });
  }, 0); // Render işlemini bloklamamak için gecikme ekledik
}; */
/* export const handleAyatClick = (
  surahNumber,
  surahName,
  ayatNumber,
  setSelectedSurahs
) => {
  setTimeout(() => {
    setSelectedSurahs((prevSelected) => {
      const isSelected = prevSelected.includes(surahNumber);
      const newSelected = isSelected
        ? prevSelected.filter((num) => num !== surahNumber)
        : [...prevSelected, surahNumber];

      const matchedSurah = surahInfo.find((surah) => surah.surahNumber === surahNumber);

      if (matchedSurah) {
        if (ayatNumber > matchedSurah.totalAyahs) {
          toast.error(
            `Ekleme tespit edildi. [${surahNumber}] ${surahName} Suresinde böyle bir ayet olmamalıydı.`
          );
        } else {
          toast.success(`[${surahNumber}] ${surahName} ${ayatNumber}. Ayet`);
        }
      } else {
        toast.error(`Geçersiz Sure Numarası: ${surahNumber}`);
      }

      return newSelected;
    });
  }, 0);
}; */

export const handleAyatClick = (
  surahNumber,
  surahName,
  ayatNumber,
  selectedSurahs,
  setSelectedSurahs
) => {
  
  if(!selectedSurahs.includes(surahNumber)){ //Eğer selectedSurahs dizisi içerisinde sure numarası yoksa içeridekileri yapsın. Bu sayede seçim iptalinde tekrardan toast görünmüyor.
    const matchedSurah = surahInfo.find(
      (surah) => surah.surahNumber === surahNumber
    );
    if (matchedSurah) {
      if (ayatNumber > matchedSurah.totalAyahs) {
        toast.error(
          `Ekleme tespit edildi. [${surahNumber}] ${surahName} Suresinde böyle bir ayet olmamalıydı.`
        );
      } else {
        toast.success(`[${surahNumber}] ${surahName} ${ayatNumber}. Ayet`);
      }
    } else {
      toast.error(`Geçersiz Sure Numarası: ${surahNumber}`);
    }
  
  }
  toggleSurahSelection(surahNumber, setSelectedSurahs);
};

export const handleTotalClick = (
  surahNumber,
  surahName,
  currentValue,
  selectedSurahs,
  setSelectedSurahs
) => {
  // `surahInfo` içerisindeki surahNumber eşleşmesini kontrol et

  if(!selectedSurahs.includes(surahNumber)){ //Eğer selectedSurahs dizisi içerisinde sure numarası yoksa içeridekileri yapsın. Bu sayede seçim iptalinde tekrardan toast görünmüyor.
    //Seçim kaldırıldığında selectedSurah's içerisinde bir değer olmayacak dolayısıyla tekrar aynı kodları çalıştırmasın.
    const matchedSurah = surahInfo.find(
      (surah) => surah.surahNumber === surahNumber
    );

    if (matchedSurah) {
      if (matchedSurah.totalAyahs === currentValue) {
        toast.success(
          `[${surahNumber}] ${matchedSurah.surahName} Suresinin Ayet Sayısı : ${matchedSurah.totalAyahs}`
        );
      } else {
        toast.error(
          `[${surahNumber}] ${matchedSurah.surahName} Suresi Ayet Sayısı Yanlış! Doğrusu: ${matchedSurah.totalAyahs} olmalıydı. ${currentValue} değil!`
        );
      }
    } else {
      toast.error(`Geçersiz Sure Numarası: ${surahNumber}`);
    }
  }

  toggleSurahSelection(surahNumber, setSelectedSurahs);
};

export const handleTotalAyatClick = (value) => {
  if(value===6234){
    toast.success(`Kurandaki Numaralı Ayet Sayısı: ${value}, Numarasız 112(Besmele) 6234+112=6346 ayetten oluşmaktadır.`);
  }else{
    toast.error(`Hata tespit edildi. Kurandaki numaralı toplam ayet sayısı ${value} değil, 6234 olmalıydı!`);
  }
  
};


export const handleSurahNoClick = (
  surahNumber,
  surahName,
  setSelectedSurahs
) => {
  setSelectedSurahs((prevSelected) => {
    const isSelected = prevSelected.includes(surahNumber);
    const newSelected = isSelected
      ? prevSelected.filter((num) => num !== surahNumber)
      : [...prevSelected, surahNumber];
    if (!isSelected) {
      toast.success(
        `Tıklanan ${surahNumber} sayısı ${surahName} suresinin sıra numarasıdır.`
      );
    }
    return newSelected;
  });
};

export const calculateTotalAyahs = (surahInfo) => {
  return surahInfo.reduce((total, surah) => total + surah.totalAyahs, 0);
};

// Dizileri Karşılaştırma fonksiyonu
export const isDifferent = (eleman,orginQuranEmptyList) => {
  const originalElement = orginQuranEmptyList.find(
    (orjEleman) =>
      orjEleman.sureNo === eleman.sureNo &&
      orjEleman.durum === eleman.durum &&
      orjEleman.deger === eleman.deger
  );
  return !originalElement;
};

export const toggleGoster = (setCopyState,goster,setGoster) => {
  setCopyState(false);
  setGoster(!goster);
};

export const getAllAyahNumbers = () => {
  return surahInfo.map((surah) => {
    return Array.from({ length: surah.totalAyahs }, (_, i) => i + 1);
  });
};

export const getAyahCountList = () => {
  return surahInfo.map((surah) => surah.totalAyahs);
};
export const calculateTotalAyahs2 = () => {
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
      style={{
        color: "red",
        fontWeight: "bold",
        cursor: "pointer",
        marginRight: "5px",
      }}
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
export const generateSurahDisplay = (
  surahInfo,
  handleTotalClick,
  handleAyatClick,
  position = "start"
) => {
  return surahInfo.map((surah, surahIndex) => {
    const totalAyatSpan = generateTotalAyatSpan(
      surah,
      surahIndex,
      handleTotalClick
    );
    const ayatNumberSpans = generateAyatNumberSpans(
      surah,
      surahIndex,
      handleAyatClick
    );

    // Ayet sayısını başa veya sona ekleyerek diziyi oluşturuyoruz
    return position === "start"
      ? [totalAyatSpan, ...ayatNumberSpans] // Başta toplam ayet sayısı
      : [...ayatNumberSpans, totalAyatSpan]; // Sonda toplam ayet sayısı
  });



  // Surelerin ayet bilgilerini başa veya sona ayet sayısını ekleyerek birleştiren ana fonksiyon

  
};
