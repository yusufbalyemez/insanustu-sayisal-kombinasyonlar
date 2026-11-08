import React, { createContext, useContext, useState } from 'react';
import quran from "../assets/SurahInfo.json";

const QuranContext = createContext();

export const useQuran = () => useContext(QuranContext);

const LIST_KEY = 'quranList';
const VERSION_KEY = 'quranListVersiyon';

// Sadece sayısal alanlar karşılaştırılır (sure adları dile göre değişebilir)
const sayisalOzet = (list) =>
  JSON.stringify(
    list.map((s) => [
      s.surahNumber,
      s.totalAyahs,
      s.startsWithBasmala,
      s.startsWithHurufMuqattaat,
    ])
  );

// Sitedeki orijinal verinin "parmak izi". SurahInfo.json ileride değişirse bu da
// değişir ve kullanıcının tarayıcısındaki eski kayıt otomatik olarak geçersiz olur.
const VERI_VERSIYONU = sayisalOzet(quran);

const kayitliListeyiOku = () => {
  try {
    const stored = localStorage.getItem(LIST_KEY);
    if (!stored) return null;
    const versiyon = localStorage.getItem(VERSION_KEY);
    if (versiyon !== null && versiyon !== VERI_VERSIYONU) {
      // Sitedeki veri değişmiş, bu kayıt eski veriye göre yapılmış: kullanma
      localStorage.removeItem(LIST_KEY);
      localStorage.removeItem(VERSION_KEY);
      return null;
    }
    const list = JSON.parse(stored);
    if (!Array.isArray(list) || list.length !== quran.length) return null;
    if (sayisalOzet(list) === VERI_VERSIYONU) {
      // Değişiklik yok, sadece eski sürümün bıraktığı kopya: sil
      localStorage.removeItem(LIST_KEY);
      localStorage.removeItem(VERSION_KEY);
      return null;
    }
    // Sürüm bilgisi olmayan eski kayıt (bu düzeltmeden önce yapılmış): etiketle
    if (versiyon === null) localStorage.setItem(VERSION_KEY, VERI_VERSIYONU);
    return list;
  } catch {
    return null;
  }
};

export const QuranProvider = ({ children }) => {
  const [quranList, setQuranList] = useState(() => kayitliListeyiOku() || quran);

  // Liste değişince: kullanıcı gerçekten bir şey değiştirdiyse kaydet,
  // orijinalle aynıysa kaydı sil (böylece site verisi güncellenince herkes yenisini görür)
  const updateQuranList = (newList) => {
    setQuranList(newList);
    try {
      if (sayisalOzet(newList) === VERI_VERSIYONU) {
        localStorage.removeItem(LIST_KEY);
        localStorage.removeItem(VERSION_KEY);
      } else {
        localStorage.setItem(LIST_KEY, JSON.stringify(newList));
        localStorage.setItem(VERSION_KEY, VERI_VERSIYONU);
      }
    } catch {
      // Depolama kullanılamıyorsa (ör. bazı gizli modlar) sadece bu oturumda geçerli olur
    }
  };

  return (
    <QuranContext.Provider
      value={{
        quranList,
        setQuranList: updateQuranList,
        // Kullanıcı listeyi orijinalden farklı hale getirdiyse true
        degistirildi: sayisalOzet(quranList) !== VERI_VERSIYONU,
      }}
    >
      {children}
    </QuranContext.Provider>
  );
};
