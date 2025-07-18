import surahInfo from "../assets/SurahInfo.json";
// Tüm surelerdeki toplam ayet sayısını hesaplayan fonksiyon
// helpers.js

import { toast } from "react-toastify";



export const suredekiTumAyetSayilariniYazdir = (sure, orjinalBosDizi) => {
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

export const sureNumarasiniYazdir = (sure, orjinalBosDizi) => {
  orjinalBosDizi.push({
    durum: "sureNo",
    sureAdi: sure.surahName,
    sureNo: sure.surahNumber,
    deger: sure.surahNumber,
  });
  //End
}

export const suredekiToplamAyetSayisiniYazdir = (sure, orjinalBosDizi) => {
  //Start -Suredeki Toplam Ayet Sayısını Yazdırır
  orjinalBosDizi.push({
    durum: "ayet-sayisi",
    sureAdi: sure.surahName,
    sureNo: sure.surahNumber,
    deger: sure.totalAyahs,
  });
  //End
}

export const kurandakiToplamAyetSayisiniYazdir = (QURAN, orjinalBosDizi) => {

  //Start - Kurandaki Tüm Ayet Numaralarını Toplar
  const gercekToplam = calculateTotalAyahs(QURAN);

  orjinalBosDizi.push({
    durum: "toplam-ayet-sayisi",
    deger: gercekToplam,
  });
  //End
}

export const suredekiAyetNumaralarinToplaminiYazdir = (sure, orjinalBosDizi) => {
  let sayi = 0;
  for (let i = 1; i <= sure.totalAyahs; i++) {
    sayi = sayi + i;
  }
  orjinalBosDizi.push({ durum: "ayetNo-toplamlari", sureAdi: sure.surahName, sureNo: sure.surahNumber, deger: sayi });
}

export const tumAyetNumaralarininToplaminiYazdir = (QURAN, orjinalBosDizi) => {
  let tumAyetNoToplamlari = 0;
  QURAN.forEach((sure) => {
    for (let i = 1; i <= sure.totalAyahs; i++) {
      tumAyetNoToplamlari += i;
    }
  });
  orjinalBosDizi.push({
    durum: "tum-ayet-no-toplamlari",
    deger: tumAyetNoToplamlari,
  });
  console.log("tumAyetNoToplamlari", tumAyetNoToplamlari);
}

export const kurandakiSureSayisiniYazdir = (QURAN, orjinalBosDizi) => {
  orjinalBosDizi.push({
    durum: "sure-sayisi",
    deger: QURAN.length,
  });
}

export const sureNumaralariniYazdir = (sure, orjinalBosDizi) => {
  orjinalBosDizi.push({ durum: "sureNo", sureNo: sure.surahNumber, sureAdi: sure.surahNumber, deger: sure.surahNumber });
}

export const suredekiAyetSayisiniYazdir = (sure, orjinalBosDizi) => {
  orjinalBosDizi.push({ durum: "ayet-sayisi", sureNo: sure.surahNumber, sureAdi: sure.surahNumber, deger: sure.totalAyahs });
}

export const sureNoVeSuredekiAyetSayilarininToplamlariniYazdir = (sure, orjinalBosDizi) => {
  let topla = 0;
  topla = sure.totalAyahs + sure.surahNumber;
  orjinalBosDizi.push({ durum: "sureNo+AyetSayisi", sureAdi: sure.surahName, sureNo: sure.surahNumber, deger: topla });
}





/*HESAPLAMA FONKSİYONLARI */



export const tumAyetNumaralarininToplaminiHesaplamaDizisineEkle = (QURAN, bosDizi, stringBuyukSayi) => {
  let tumAyetNoToplamlari = 0;
  QURAN.forEach((sure) => {
    for (let i = 1; i <= sure.totalAyahs; i++) {
      tumAyetNoToplamlari += i;
    }
  });

  bosDizi.push({
    durum: "tum-ayet-no-toplamlari",
    deger: tumAyetNoToplamlari,
  });
  stringBuyukSayi += tumAyetNoToplamlari.toString();
  return { bosDizi, stringBuyukSayi };
}
export const suredekiTumAyetSayilariniHesaplamaDizisineEkle = (sure, bosDizi, stringBuyukSayi) => {
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

  return { bosDizi, stringBuyukSayi };
  //End
}

export const sureNumarasiniHesaplamaDizisineEkle = (sure, bosDizi, stringBuyukSayi) => {
  //Sure Numarasını Ekler - Start
  bosDizi.push({
    durum: "sureNo",
    sureAdi: sure.surahName,
    sureNo: sure.surahNumber,
    deger: sure.surahNumber,
  });
  stringBuyukSayi += sure.surahNumber.toString();
  //End
  return { bosDizi, stringBuyukSayi };
}

export const suredekiToplamAyetSayisiniHesaplamaDizisineEkle = (sure, bosDizi, stringBuyukSayi) => {
  //Start -Suredeki Toplam Ayet Sayısını Yazdırır
  bosDizi.push({
    durum: "ayet-sayisi",
    sureAdi: sure.surahName,
    sureNo: sure.surahNumber,
    deger: sure.totalAyahs,
  });
  stringBuyukSayi += sure.totalAyahs.toString();
  return { bosDizi, stringBuyukSayi };
  //End

}

export const kurandakiToplamAyetSayisiniHesaplamaDizisineEkle = (quranList, bosDizi, stringBuyukSayi) => {
  //Start - Kurandaki Tüm Ayet Numaralarını Toplar
  const hesaplananToplam = calculateTotalAyahs(quranList);

  bosDizi.push({
    durum: "toplam-ayet-sayisi",
    deger: hesaplananToplam,
  });
  stringBuyukSayi += hesaplananToplam.toString();
  return { bosDizi, stringBuyukSayi };
  //End

}

export const suredekiAyetNumaralarinToplaminiHesaplamaDizisineEkle = (sure, bosDizi, stringBuyukSayi) => {
  let sayi = 0;
  for (let i = 1; i <= sure.totalAyahs; i++) {
    sayi = sayi + i;
  }
  bosDizi.push({ durum: "ayetNo-toplamlari", sureAdi: sure.surahName, sureNo: sure.surahNumber, deger: sayi });
  stringBuyukSayi += sayi.toString();
  return { bosDizi, stringBuyukSayi };
}

export const kurandakiSureSayisiniHesaplamaDizisineEkle = (quranList, bosDizi, stringBuyukSayi) => {
  bosDizi.push({
    durum: "sure-sayisi",
    deger: quranList.length,
  });
  stringBuyukSayi += quranList.length.toString();
  return { bosDizi, stringBuyukSayi };
}

export const sureNumarlariniHesaplamaDizisineEkle = (sure, bosDizi, stringBuyukSayi) => {
  bosDizi.push({ durum: "sureNo", sureNo: sure.surahNumber, sureAdi: sure.surahNumber, deger: sure.surahNumber });
  stringBuyukSayi += sure.surahNumber.toString();

  return { bosDizi, stringBuyukSayi };
}

export const suredekiAyetSayisiniHesaplamaDizisineEkle = (sure, bosDizi, stringBuyukSayi) => {
  bosDizi.push({ durum: "ayet-sayisi", sureNo: sure.surahNumber, sureAdi: sure.surahNumber, deger: sure.totalAyahs });
  stringBuyukSayi += sure.totalAyahs.toString();
  return { bosDizi, stringBuyukSayi };
}



export const sureNoVeSuredekiAyetSayilarininToplamlariniHesaplamaDizisineEkle = (sure, bosDizi, stringBuyukSayi) => {
  let topla = 0;
  topla = sure.totalAyahs + sure.surahNumber;
  bosDizi.push({ durum: "sureNo+AyetSayisi", sureAdi: sure.surahName, sureNo: sure.surahNumber, deger: topla });
  stringBuyukSayi += topla.toString();

  return { bosDizi, stringBuyukSayi };
}




/* HESAPLAMA FONKSİYONLARI BİTİŞ */




//Spanları seçme - eski
const toggleSurahSelection = (surahNumber, setSelectedSurahs) => {
  setSelectedSurahs((prevSelected) => {
    const isSelected = prevSelected.includes(surahNumber);
    return isSelected
      ? prevSelected.filter((num) => num !== surahNumber)
      : [...prevSelected, surahNumber];
  });
};


export const handleAyatClick = (
  eleman,
  selectedSurahs,
  setSelectedSurahs,
  orginQuranEmptyList
) => {
  const language = localStorage.getItem('lang_quran_evidence');

  // --- EKLENDİ ---
  if (isDifferent(eleman, orginQuranEmptyList)) {
    // Eğer farklıysa direkt olarak hata ver
    if (language === "tr") {
      toast.error(
        `Ekleme tespit edildi. ${eleman.sureNo}. surede böyle bir ayet numarası olmamalıydı.`
      );
    } else if (language === "en") {
      toast.error(
        `Addition detected. There should not be such an ayah number in ${eleman.sureNo}. surah.`
      );
    }
    toggleSurahSelection(eleman.sureNo, setSelectedSurahs);
    return;
  }
  // ----------------

  // Normal logic (artık sadece orijinalde olanlar için çalışır)
  if (!selectedSurahs.includes(eleman.sureNo)) {
    const matchedSurah = surahInfo.find(
      (surah) => surah.surahNumber === eleman.sureNo
    );
    if (matchedSurah) {
      if (eleman.deger > matchedSurah.totalAyahs) {
        // Normalde burası "farklı" olmaz ama ekstra kontrol olarak bırakabilirsin
        if (language === "tr") {
          toast.error(
            `Ekleme tespit edildi. ${eleman.sureNo}. surede böyle bir ayet olmamalıydı.`
          );
        } else if (language === "en") {
          toast.error(
            `Addition detected. There should not be such an ayah in ${eleman.sureNo}. surah.`
          );
        }
      } else {
        if (language === "tr") {
          toast.success(`${eleman.sureNo}. Surenin ${eleman.deger}. Ayeti`);
        } else if (language === "en") {
          toast.success(`${eleman.deger}. Ayah of ${eleman.sureNo}. Surah`);
        }
      }
    } else {
      if (language === "tr") {
        toast.error(`Geçersiz Sure Numarası: ${eleman.sureNo}`);
      } else if (language === "en") {
        toast.error(`Invalid Surah Number: ${eleman.sureNo}`);
      }
    }
  }
  toggleSurahSelection(eleman.sureNo, setSelectedSurahs);
};

export const handleBasmalaClick = (
  surahNumber,
  surahName,
  currentValue,
  selectedSurahs,
  setSelectedSurahs
) => {
  const language = localStorage.getItem('lang_quran_evidence');
  if (!selectedSurahs.includes(surahNumber)) { //Eğer selectedSurahs dizisi içerisinde sure numarası yoksa içeridekileri yapsın. Bu sayede seçim iptalinde tekrardan toast görünmüyor.
    const matchedSurah = surahInfo.find(
      (surah) => surah.surahNumber === surahNumber
    );
    if (matchedSurah) {
      if (matchedSurah.startsWithBasmala === currentValue) {
        if (language === "tr") {
          toast.success(`${surahNumber}. surenin başında besmele olması gerektiğini göstermektedir.`);
        } else if (language === "en") {
          toast.success(`It shows that the ${surahNumber}. surah should start with Basmala.`);
        }

      } else {
        if (language === "tr") {
          toast.error(`${surahNumber} surenin başında besmele olmaması gerektiğini gösteriyor.`);
        } else if (language === "en") {
          toast.error(`It shows that the ${surahNumber} surah should not start with Basmala.`);
        }
      }
    }



  }
  toggleSurahSelection(surahNumber, setSelectedSurahs);
};

export const handleTotalClick = (
  eleman,
  selectedSurahs,
  setSelectedSurahs,
  orginQuranEmptyList
) => {
  const language = localStorage.getItem('lang_quran_evidence');

  // 1. Farklıysa (orjinalde yoksa)
  if (isDifferent(eleman, orginQuranEmptyList)) {
    const original = orginQuranEmptyList.find(e =>
      e.sureNo === eleman.sureNo && e.durum === eleman.durum
    );
    if (language === "tr") {
      toast.error(
        `${eleman.sureNo}. Surenin Ayet Sayısı Yanlış! Doğrusu: ${original?.deger} olmalıydı. ${eleman.deger} değil!`
      );
    } else if (language === "en") {
      toast.error(
        `The Number of Verses in The ${eleman.sureNo}. Surah is Wrong! It should be ${original?.deger} not ${eleman.deger}!`
      );
    }
    toggleSurahSelection(eleman.sureNo, setSelectedSurahs);
    return;
  }

  // 2. Seçilmemişse klasik kontrol
  if (!selectedSurahs.includes(eleman.sureNo)) {
    const matchedSurah = surahInfo.find(
      (surah) => surah.surahNumber === eleman.sureNo
    );

    if (matchedSurah) {
      if (matchedSurah.totalAyahs === eleman.deger) {
        if (language === "tr") {
          toast.success(
            `${eleman.sureNo}. Surenin Ayet Sayısı : ${matchedSurah.totalAyahs}`
          );
        } else if (language === "en") {
          toast.success(
            `The Number of Verses in ${eleman.sureNo}. Surah : ${matchedSurah.totalAyahs}`
          );
        }

      } else {
        if (language === "tr") {
          toast.error(
            `${eleman.sureNo}. Surenin Ayet Sayısı Yanlış! Doğrusu: ${matchedSurah.totalAyahs} olmalıydı. ${eleman.deger} değil!`
          );
        } else if (language === "en") {
          toast.error(
            `The Number of Verses in The ${eleman.sureNo}. Surah is Wrong! It should be ${matchedSurah.totalAyahs} not ${eleman.deger}!`
          );
        }

      }
    } else {
      if (language === "tr") {
        toast.error(`Geçersiz Sure Numarası: ${eleman.sureNo}`);
      } else if (language === "en") {
        toast.error(`Invalid Surah Number: ${eleman.sureNo}`);
      }
    }
  }

  toggleSurahSelection(eleman.sureNo, setSelectedSurahs);
};

export const handleAyahsTotalClick = (
  eleman,
  selectedSurahs,
  setSelectedSurahs,
  orginQuranEmptyList
) => {
  const { sureNo, deger } = eleman;
  const language = localStorage.getItem("lang_quran_evidence");

  if (!selectedSurahs.includes(sureNo)) {
    // Doğru değeri orijinal listeden bul
    const original = orginQuranEmptyList.find(
      (e) => e.durum === "ayetNo-toplamlari" && e.sureNo === sureNo
    );

    if (original) {
      if (original.deger === deger) {
        toast.success(
          language === "tr"
            ? `${sureNo}. surenin her bir ayet numaralarının toplamı : ${deger}`
            : `The sum of the verse numbers of Surah ${sureNo} is correct: ${deger}`
        );
      } else {
        toast.error(
          language === "tr"
            ? `${sureNo}. Surenin Ayet Numaralarının Toplamı Yanlış! Doğrusu: ${original.deger} olmalıydı. ${deger} değil!`
            : `The sum of the verse numbers of Surah ${sureNo} is wrong! It should be ${original.deger}, not ${deger}!`
        );
      }
    } else {
      toast.error(
        language === "tr"
          ? `Orijinal veri bulunamadı.`
          : `Original reference not found.`
      );
    }
  }

  toggleSurahSelection(sureNo, setSelectedSurahs);
};


export const handleSurahAndSurahNumberTotalClick = (
  surahNumber,
  surahName,
  currentValue,
  selectedSurahs,
  setSelectedSurahs
) => {
  // `surahInfo` içerisindeki surahNumber eşleşmesini kontrol et
  const language = localStorage.getItem('lang_quran_evidence');

  if (!selectedSurahs.includes(surahNumber)) { //Eğer selectedSurahs dizisi içerisinde sure numarası yoksa içeridekileri yapsın. Bu sayede seçim iptalinde tekrardan toast görünmüyor.
    //Seçim kaldırıldığında selectedSurah's içerisinde bir değer olmayacak dolayısıyla tekrar aynı kodları çalıştırmasın.
    const matchedSurah = surahInfo.find(
      (surah) => surah.surahNumber === surahNumber
    );

    if (matchedSurah) {
      let topla = 0;
      topla = matchedSurah.totalAyahs + matchedSurah.surahNumber;
      if (topla === currentValue) {
        if (language === "tr") {
          toast.success(
            `${surahNumber}. Surenin Ayet Sayısı(${matchedSurah.totalAyahs}) ve Sure Numarasının(${matchedSurah.surahNumber}) Toplamı : ${topla}`
          );
        } else if (language === "en") {
          toast.success(
            `${surahNumber}. Surah's Ayah Number(${matchedSurah.totalAyahs}) and Surah Number(${matchedSurah.surahNumber}) Total : ${topla}`
          );
        }
      } else {
        if (language === "tr") {
          toast.error(
            `${surahNumber}. Surenin Ayet Sayısı ve Sure Numarasının Toplamı Yanlış! Doğrusu: ${topla} olmalıydı. ${currentValue} değil!`
          );
        } else if (language === "en") {
          toast.error(
            `The sum of the number of verses and the number of the surah of ${surahNumber}. Surah is Wrong! It should be ${topla} not ${currentValue}!`
          );
        }
        
      }
    }
  }

  toggleSurahSelection(surahNumber, setSelectedSurahs);
};


export const handleTotalAyatClick = (value) => {
  const language = localStorage.getItem('lang_quran_evidence');
  if (value === 6234) {
    if (language === "tr") {
      toast.success(`Kurandaki Numaralı Ayet Sayısı: ${value}, Numarasız 112(Besmele) 6234+112=6346 ayetten oluşmaktadır.`);
    } else if (language === "en") {
      toast.success(`Numbered Verses in the Quran: ${value}, Unnumbered 112(Basmala) 6234+112=6346 verses.`);
    }
  } else {
    if(language === "tr") {
      toast.error(`Hata tespit edildi. Kurandaki numaralı toplam ayet sayısı ${value} değil, 6234 olmalıydı!`);
    } else if (language === "en") {
      toast.error(`Error detected. The total number of numbered verses in the Quran should be 6234, not ${value}!`);
    }
   
  }

};

export const handleTotalAyahsInQuranClick = (value) => {
  const language = localStorage.getItem('lang_quran_evidence');
  if (value === 333410) {
    if (language === "tr") {
      toast.success(`Kurandaki tüm ayet numaralarının toplamı : ${value}`);
    } else if (language === "en") {
      toast.success(`The total of all verse numbers in the Quran : ${value}`);
    }
  } else {
    if(language === "tr") {
      toast.error(`Hata tespit edildi. Kurandaki tüm ayet numaralarının toplamı ${value} değil, 333410 olmalıydı!`);
    } else if (language === "en") {
      toast.error(`Error detected. The total of all verse numbers in the Quran should be 333410, not ${value}!`);
    }
    
  }
}

export const handleSurahNumberClick = () => {
  const language = localStorage.getItem('lang_quran_evidence');
  if(language === "tr") {
    toast.success(`Kuranda 114 Sure bulunmaktadır.`)
  } else if (language === "en") {
    toast.success(`There are 114 Surahs in the Quran.`)
  }

}


export const handleSurahNoClick = (
  eleman,
  setSelectedSurahs
) => {
  const language = localStorage.getItem('lang_quran_evidence');
  const surahNumber = eleman.sureNo;


  setSelectedSurahs((prevSelected) => {
    const isSelected = prevSelected.includes(surahNumber);
    const newSelected = isSelected
      ? prevSelected.filter((num) => num !== surahNumber)
      : [...prevSelected, surahNumber];

    if (!isSelected) {
      if (language === "tr") {
        toast.success(`${surahNumber}. surenin kurandaki sırası.`);
      } else if (language === "en") {
        toast.success(`The order of ${surahNumber}. surah in the Quran.`);
      }
    }

    return newSelected;
  });
};
export const calculateTotalAyahs = (surahInfo) => {
  return surahInfo.reduce((total, surah) => total + surah.totalAyahs, 0);
};

// Dizileri Karşılaştırma fonksiyonu
export const isDifferent = (eleman, orginQuranEmptyList) => {
  const originalElement = orginQuranEmptyList.find(
    (orjEleman) =>
      orjEleman.sureNo === eleman.sureNo &&
      orjEleman.durum === eleman.durum &&
      orjEleman.deger === eleman.deger
  );
  return !originalElement;
};

export const toggleGoster = (setCopyState, goster, setGoster) => {
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
