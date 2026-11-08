import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaExchangeAlt } from "react-icons/fa";
import {
  MdOutlineFormatListNumberedRtl,
  MdOutlineLanguage,
} from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { motion } from "framer-motion";
import {
  Button,
  Checkbox,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { AiOutlineNumber } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import quran from "../assets/SurahInfo.json";
import tr_quran from "../assets/SurahInfo_tr.json";
import { useQuran } from "../context/quranListContext";
import { useDifferentRefs } from "../context/DifferentRefsContext";
import { useLanguage } from "../context/LanguageContext";
import { useDifference } from "../context/DifferenceContext";

const Navbar = () => {
  const { translations } = useLanguage(); // Çeviri verilerini al
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const { quranList, setQuranList } = useQuran();
  const [tempQuranList, setTempQuranList] = useState([]);
  const { clearDifferentRefs } = useDifferentRefs(); // Scroll fonksiyonunu al
  const lang = localStorage.getItem("lang_quran_evidence");

  // Dil Context'i
  const { language, setLanguage } = useLanguage();

  const { differences, calculateDifferences } = useDifference();

  // Farklılıkları hesapla
  useEffect(() => {
    calculateDifferences(quranList);
  }, [quranList]); // calculateDifferences artık useCallback ile sabitlendi

  // Değişiklik göstergesi için yeni bir fonksiyon
  const getDifferenceIndicator = (surahNumber) => {
    const diff = differences.find((d) => d.surahNumber === surahNumber);
    if (!diff) return null;

    return (
      <div
        className="absolute top-1/2 left-5 -translate-y-1/2 -translate-x-2 w-2.5 h-2.5 bg-red-700 rounded-full"
        title={
          lang === "tr" ? "Bu surede değişiklik var" : "This surah has changes"
        }
      />
    );
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value); // Dili değiştir
  };

  useEffect(() => {
    // Liste zaten QuranProvider tarafından (geçerli kayıt varsa oradan) yüklendi.
    // Burada sadece düzenleme tablosu için bir kopya alınır; localStorage'a yazılmaz.
    setTempQuranList(quranList.map((sura) => ({ ...sura })));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const toggleDrawer2 = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsLeftDrawerOpen(open);
  };

  const handleListItemClick = (index) => {
    setSelectedItem(index);
  };

  // Not: Eski kodda nesneler yerinde değiştiriliyordu (state mutasyonu).
  // Artık sadece değişen sure kopyalanarak güncelleniyor.
  const updateTempSurah = (index, changes) => {
    setTempQuranList((prev) =>
      prev.map((sura, i) => (i === index ? { ...sura, ...changes } : sura))
    );
  };

  const handleAyahChange = (index, value) => {
    // Sadece rakam kabul et (eksi veya harf girilirse 19 hesabı bozuluyordu)
    const rakamlar = String(value).replace(/\D/g, "").slice(0, 4);
    updateTempSurah(index, { totalAyahs: parseInt(rakamlar, 10) || 0 });
  };

  const handleHurufCheckboxChange = (index) => {
    updateTempSurah(index, {
      startsWithHurufMuqattaat: !tempQuranList[index].startsWithHurufMuqattaat,
    });
  };

  const handleBasmalaCheckboxChange = (index) => {
    updateTempSurah(index, {
      startsWithBasmala: !tempQuranList[index].startsWithBasmala,
    });
  };

  const handleUpdateQuranList = () => {
    clearDifferentRefs(); // Referansları temizle
    setQuranList(tempQuranList); // Yeni listeyi güncelle (kaydetme işini QuranProvider yapar)
    // İlk farka kaydırma işini artık SayiyiGosterenComponent'teki farklılık çubuğu yapıyor
    setIsLeftDrawerOpen(false);
  };
  const handleDefaultQuranList = () => {
    clearDifferentRefs();
    let defaultQuranList = [];
    if (language === "tr") {
      defaultQuranList = JSON.parse(JSON.stringify(tr_quran));
    } else {
      defaultQuranList = JSON.parse(JSON.stringify(quran));
    }

    setQuranList(defaultQuranList); // orijinalle aynı olduğu için kayıt silinir
    setTempQuranList(defaultQuranList);
    setIsLeftDrawerOpen(false);
    // İşlemler tamamlandığı anda sayfayı baştan yükle:
    window.location.reload();
  };

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 w-full flex justify-between items-center bg-gradient-to-r from-gray-900 to-gray-800 px-4 md:px-8 py-3 z-50 shadow-lg"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-11 md:w-20 cursor-pointer flex-shrink-0"
          onClick={toggleDrawer2(true)}
        >
          <img src={logo} alt="Logo" className="w-full h-auto" />
        </motion.div>

        <div className="flex items-center justify-center gap-1.5 md:gap-6 text-white">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 md:gap-2 cursor-pointer bg-gray-700 md:bg-transparent rounded-lg px-2.5 py-2 md:p-0 text-sm md:text-base whitespace-nowrap hover:text-yellow-400 transition-colors duration-300"
            onClick={toggleDrawer2(true)}
          >
            <CiViewList className="text-lg md:text-xl text-yellow-400 md:text-current" />
            {/* Telefonda kısa yazı, bilgisayarda uzun yazı */}
            <span className="md:hidden">
              {lang === "tr" ? "Sureler" : "Surahs"}
            </span>
            <span className="hidden md:inline-block">
              {lang === "tr" ? "Sure Listesi" : "Surah List"}
            </span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 md:gap-2 cursor-pointer bg-gray-700 md:bg-transparent rounded-lg px-2.5 py-2 md:p-0 text-sm md:text-base whitespace-nowrap hover:text-yellow-400 transition-colors duration-300"
            onClick={toggleDrawer(true)}
          >
            <MdOutlineFormatListNumberedRtl className="text-lg md:text-xl text-yellow-400 md:text-current" />
            <span>
              {lang === "tr" ? "Sayılar" : "Numbers"}
            </span>
          </motion.div>

          <Select
            value={language}
            onChange={handleLanguageChange}
            size="small"
            renderValue={(v) => (
              <>
                <span className="md:hidden">{v.toUpperCase()}</span>
                <span className="hidden md:inline">
                  {v === "tr" ? "Türkçe" : "English"}
                </span>
              </>
            )}
            className="bg-gray-700 text-white border-0 rounded-lg"
            sx={{
              color: "white",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "yellow",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "yellow",
              },
            }}
          >
            <MenuItem value="tr">Türkçe</MenuItem>
            <MenuItem value="en">English</MenuItem>
          </Select>
        </div>
      </motion.div>

      {/* Sağ Drawer */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: "#1a1a1a",
            padding: "20px",
            borderLeft: "2px solid #ffd700",
          },
        }}
      >
        <div className="flex flex-col items-center justify-center text-center text-white mb-6">
          <span className="text-xl font-bold text-yellow-400 border-b-2 border-yellow-400 pb-2">
            {translations.navbar.title}
          </span>
        </div>
        <List sx={{ color: "white" }}>
          {[
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            "basmala",
          ].map((issue, index) => (
            <ListItem
              key={index}
              button
              onClick={() => {
                // Sayfayı baştan yüklemek yerine React Router ile geçiş
                setSelectedItem(issue);
                setIsDrawerOpen(false);
                navigate(issue === 0 ? "/" : `/${issue}`);
                window.scrollTo(0, 0);
              }}
              sx={{
                bgcolor:
                  selectedItem === issue ? "rgba(255, 215, 0, 0.2)" : "inherit",
                marginBottom: "8px",
                borderRadius: "8px",
                "&:hover": {
                  bgcolor: "rgba(255, 215, 0, 0.1)",
                },
              }}
            >
              <AiOutlineNumber className="mr-2 text-yellow-400" />
              <ListItemText
                primary={
                  issue === 0
                    ? lang === "tr"
                      ? "Anasayfa"
                      : "Home"
                    : issue === "basmala"
                    ? lang === "tr"
                      ? "Besmele Etkisi"
                      : "Effect of Basmala"
                    : lang === "tr"
                    ? `Sayı ${issue}`
                    : `Number ${issue}`
                }
                sx={{
                  color: selectedItem === issue ? "#ffd700" : "white",
                  fontWeight: selectedItem === issue ? "bold" : "normal",
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Sol Drawer */}
      <Drawer
        anchor="left"
        open={isLeftDrawerOpen}
        onClose={toggleDrawer2(false)}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: 800 },
            bgcolor: "#1a1a1a",
            padding: { xs: "15px", sm: "30px" },
            borderRight: "2px solid #ffd700",
          },
        }}
      >
        <div className="absolute top-4 right-4">
          <IconButton
            onClick={toggleDrawer2(false)}
            sx={{
              color: "#ffd700",
              "&:hover": {
                backgroundColor: "rgba(255, 215, 0, 0.1)",
              },
            }}
          >
            ×
          </IconButton>
        </div>

        <div className="flex flex-col items-center justify-center text-center text-white mb-8">
          <span className="text-2xl sm:text-3xl font-bold text-yellow-400">
            {lang === "tr" ? "İNSANÜSTÜ SAYILAR" : "SUPERHUMAN NUMBERS"}
          </span>
        </div>

        <div className="flex flex-col gap-4 mb-8">
          <Button
            variant="contained"
            color="success"
            onClick={handleDefaultQuranList}
            sx={{
              backgroundColor: "#4caf50",
              "&:hover": {
                backgroundColor: "#388e3c",
              },
            }}
          >
            {lang === "tr" ? "Varsayılana Ayarla" : "Set Default"}
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-white text-base sm:text-lg">
            <thead>
              <tr className="h-12 sm:h-14 bg-gray-800">
                <th className="px-2 sm:px-4 text-sm sm:text-base">No</th>
                <th className="px-2 sm:px-4 text-sm sm:text-base">
                  {lang === "tr" ? "Sure" : "Sura"}
                </th>
                <th className="px-2 sm:px-4 text-sm sm:text-base">
                  {lang === "tr" ? "Ayetler" : "Ayahs"}
                </th>
                <th className="px-2 sm:px-4 text-sm sm:text-base">Huruf</th>
                <th className="px-2 sm:px-4 text-sm sm:text-base">
                  {lang === "tr" ? "Besmele" : "Basmala"}
                </th>
                <th className="px-2 sm:px-4 text-sm sm:text-base">
                  {lang === "tr" ? "Değiştir" : "Change"}
                </th>
              </tr>
            </thead>
            <tbody>
              {tempQuranList.map((sura, index) => (
                <tr
                  key={index}
                  className="h-14 even:bg-gray-800 odd:bg-gray-900"
                >
                  <td className="px-8 text-center relative">
                    {sura.surahNumber}
                    {getDifferenceIndicator(sura.surahNumber)}
                  </td>
                  <td className="px-2 sm:px-4 text-center text-sm sm:text-base">
                    {language === "tr"
                      ? tr_quran[index].surahName
                      : quran[index].surahName}
                  </td>
                  <td className="px-2 sm:px-4">
                    <input
                      id={`ayah-input-${index}`}
                      name={`ayah-input-${index}`}
                      className="w-16 sm:w-24 text-yellow-400 text-center border-b-2 border-yellow-400 outline-none bg-transparent text-base"
                      inputMode="numeric"
                      type="text"
                      value={sura.totalAyahs}
                      onChange={(e) => handleAyahChange(index, e.target.value)}
                    />
                  </td>
                  <td className="px-2 sm:px-4 text-center">
                    <Checkbox
                      checked={sura.startsWithHurufMuqattaat}
                      onChange={() => handleHurufCheckboxChange(index)}
                      sx={{
                        color: "#ffd700",
                        "&.Mui-checked": {
                          color: "#ffd700",
                        },
                        transform: { xs: "scale(1)", sm: "scale(1.2)" },
                      }}
                    />
                  </td>
                  <td className="px-2 sm:px-4 text-center">
                    <Checkbox
                      checked={sura.startsWithBasmala}
                      onChange={() => handleBasmalaCheckboxChange(index)}
                      sx={{
                        color: "#ffd700",
                        "&.Mui-checked": {
                          color: "#ffd700",
                        },
                        transform: { xs: "scale(1)", sm: "scale(1.2)" },
                      }}
                    />
                  </td>
                  <td className="px-2 sm:px-4 text-center">
                    <IconButton
                      onClick={handleUpdateQuranList}
                      sx={{
                        color: "#ffd700",
                        "&:hover": {
                          backgroundColor: "rgba(255, 215, 0, 0.1)",
                        },
                        transform: { xs: "scale(1)", sm: "scale(1.2)" },
                      }}
                    >
                      <FaExchangeAlt />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateQuranList}
            sx={{
              backgroundColor: "#ffd700",
              color: "#1a1a1a",
              "&:hover": {
                backgroundColor: "#ffc107",
              },
            }}
          >
            {lang === "tr" ? "Ayeti Değiştir" : "Change Ayah"}
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
