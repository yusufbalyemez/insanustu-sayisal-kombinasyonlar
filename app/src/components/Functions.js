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

export const suredekiAyetNumaralarinToplaminiYazdir = (sure,orjinalBosDizi) => {
  let sayi =0;
    for(let i=1; i<=sure.totalAyahs; i++){
      sayi = sayi + i;
    }
    orjinalBosDizi.push({ durum: "ayetNo-toplamlari", sureAdi:sure.surahName, sureNo:sure.surahNumber,  deger: sayi });
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

  export const suredekiAyetNumaralarinToplaminiHesaplamaDizisineEkle = (sure,bosDizi,stringBuyukSayi) => {
    let sayi =0;
    for(let i=1; i<=sure.totalAyahs; i++){
      sayi = sayi + i;
    }
    bosDizi.push({ durum: "ayetNo-toplamlari", sureAdi:sure.surahName, sureNo:sure.surahNumber,  deger: sayi });
    stringBuyukSayi += sayi.toString();
    return {bosDizi,stringBuyukSayi};
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

export const handleBasmalaClick = (
  surahNumber,
  surahName,
  currentValue,
  selectedSurahs,
  setSelectedSurahs
) => {
  
  if(!selectedSurahs.includes(surahNumber)){ //Eğer selectedSurahs dizisi içerisinde sure numarası yoksa içeridekileri yapsın. Bu sayede seçim iptalinde tekrardan toast görünmüyor.
    const matchedSurah = surahInfo.find(
      (surah) => surah.surahNumber === surahNumber
    );
    if(matchedSurah){
      if(matchedSurah.startsWithBasmala === currentValue){
        toast.success(`[${surahNumber}] ${surahName} Suresinin başında besmele olması gerektiğini göstermektedir.`);
      }else{
        toast.error(`[${surahNumber}] ${surahName} Suresinin başında besmele olmaması gerektiğini gösteriyor.`);
      }
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

export const handleAyahsTotalClick = (
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

      let sayi =0;
      for(let i=1; i<=matchedSurah.totalAyahs; i++){
        sayi = sayi + i;
      }
      if (sayi === currentValue) {
        toast.success(
          `[${surahNumber}] ${matchedSurah.surahName} Suresinin Her bir ayet numaralarının toplamı : ${sayi}` 
        );
      } else {
        toast.error(
          `[${surahNumber}] ${matchedSurah.surahName} Suresi Ayet Numaralarının Toplamı Yanlış! Doğrusu: ${sayi} olmalıydı. ${currentValue} değil!`
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
