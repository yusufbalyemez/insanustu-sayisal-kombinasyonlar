import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaExchangeAlt } from "react-icons/fa";
import { MdOutlineFormatListNumberedRtl, MdOutlineLanguage } from "react-icons/md";
import { CiViewList } from "react-icons/ci";

import {
  Button,
  Checkbox,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
/* import { FaHome } from "react-icons/fa"; */
import { AiOutlineNumber } from "react-icons/ai";
import { Link } from "react-router-dom";
import quran from "../assets/SurahInfo.json";
import tr_quran from "../assets/SurahInfo_tr.json";
import { useQuran } from "../context/quranListContext";
import { useDifferentRefs } from "../context/DifferentRefsContext";

import { useLanguage } from "../context/LanguageContext";


const Navbar = () => {
  const { translations } = useLanguage(); // Çeviri verilerini al
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const { quranList, setQuranList } = useQuran();
  const [tempQuranList, setTempQuranList] = useState([]);
  const { scrollToDifferent, clearDifferentRefs } = useDifferentRefs(); // Scroll fonksiyonunu al
  const lang = localStorage.getItem('lang_quran_evidence');

  // Dil Context'i
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value); // Dili değiştir
  };

  useEffect(() => {
    const storedQuranList = localStorage.getItem("quranList");
    if (storedQuranList) {
      setQuranList(JSON.parse(storedQuranList));
      setTempQuranList(JSON.parse(storedQuranList));
    } else {
      setQuranList(quranList);
      setTempQuranList(quranList);
    }
  }, []); // Bu bağımlılıklarla `quranList` güncellemelerine doğru tepki verilir

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

  const handleAyahChange = (index, value) => {
    const updatedTempList = [...tempQuranList];
    updatedTempList[index].totalAyahs = parseInt(value) || 0;
    setTempQuranList(updatedTempList);
  };

  const handleHurufCheckboxChange = (index) => {
    const updatedTempList = [...tempQuranList];
    updatedTempList[index].startsWithHurufMuqattaat =
      !updatedTempList[index].startsWithHurufMuqattaat;
    setTempQuranList(updatedTempList);
  };

  const handleBasmalaCheckboxChange = (index) => {
    const updatedTempList = [...tempQuranList];
    updatedTempList[index].startsWithBasmala =
      !updatedTempList[index].startsWithBasmala;
    setTempQuranList(updatedTempList);
  };

  const handleUpdateQuranList = () => {
    clearDifferentRefs(); // Referansları temizle
    setQuranList(tempQuranList); // Yeni listeyi güncelle
    localStorage.setItem("quranList", JSON.stringify(tempQuranList)); // Listeyi localStorage'a kaydet

    // DOM'un güncellenmesini bekle ve scroll'u tetikle
    setTimeout(() => {
      scrollToDifferent();
    }, 200); // Daha güvenli bir şekilde DOM değişikliklerini beklemek için kısa bir gecikme ekleyin
    setIsLeftDrawerOpen(false);
  };
  const handleDefaultQuranList = () => {
    clearDifferentRefs();
    let defaultQuranList = [];
    if(language === 'tr'){
      defaultQuranList = JSON.parse(JSON.stringify(tr_quran));
    }else{
      defaultQuranList = JSON.parse(JSON.stringify(quran));
    }

    setQuranList(defaultQuranList);
    setTempQuranList(defaultQuranList);
    localStorage.setItem("quranList", JSON.stringify(defaultQuranList));
    setIsLeftDrawerOpen(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full flex justify-between items-center bg-gradient-to-l from-gray-700 to-gray-800 px-2 md:px-10 z-50">
        <div className="w-20 pt-1">
          <img src={logo} alt="Logo" onClick={toggleDrawer2(true)} />
        </div>
        <div className="flex  items-center justify-center gap-5 text-white text-xl mr-1">

          <div
            className=" cursor-pointer flex gap-1 items-center justify-center hover:text-yellow-300 duration-300"
            onClick={toggleDrawer2(true)}
          >
            <CiViewList style={{ marginTop: '3px' }}/>
            {lang === 'tr' ? "Sure Listesi" : "Surah List"}
          </div>
          <div
            className=" cursor-pointer flex gap-1 items-center justify-center hover:text-yellow-300 duration-300"
            onClick={toggleDrawer(true)}
          >
            <MdOutlineFormatListNumberedRtl style={{ marginTop: '3px' }}/>
            {lang === 'tr' ? "Sayılar" : "Numbers"}
          </div>
          {/* <div
            className="text-white text-3xl border border-gray-400 p-3 rounded-md cursor-pointer"
            onClick={toggleDrawer(true)}
          >
            <GiHamburgerMenu />
          </div> */}
          {/* Dil Seçme Dropdown */}
          <select
            value={language}
            onChange={handleLanguageChange}
            className="bg-gray-800 text-white border rounded px-2 py-1"
          >
            <option value="tr">Türkçe</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      {/* Sağ Drawer */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { width: 240, bgcolor: "#374151", padding: "5px" },
        }}
      >
        <div className="flex flex-col items-center justify-center text-center text-white">
          <span className="my-2 border-b">{translations.navbar.title}</span>
        </div>
        <List
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          sx={{ color: "white" }}
        >
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
              component={Link}
              to={issue === 0 ? "/" : `/${issue}`}
              onClick={() => handleListItemClick(issue)}
              sx={{
                bgcolor: selectedItem === issue ? "black" : "inherit",
                "&:hover": {
                  bgcolor: "black",
                },
              }}
            >
              <AiOutlineNumber className="mr-1" />
              <ListItemText
                primary={
                  issue === 0
                    ? lang === 'tr'
                      ? "Anasayfa"
                      : "Home"
                    : issue === "basmala"
                      ? lang === 'tr'
                        ? "Besmele Etkisi"
                        : "Effect of Basmala"
                      : lang === 'tr'
                        ? `Sayı ${issue}`
                        : `Number ${issue}`
                }
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
          sx: { width: 425, bgcolor: "#374151", padding: "5px" },
        }}
      >
        <div className="absolute top-2 right-5 border px-2 border-yellow-400 rounded-md">
          <button
            onClick={toggleDrawer2(false)}
            className="text-yellow-400 text-xl font-bold cursor-pointer"
          >
            ×
          </button>
        </div>

        <div className="flex flex-col items-center justify-center text-center text-white">
          <span className="my-2 text-blue-300 font-bold">
          {lang === 'tr' ? "İNSANÜSTÜ SAYILAR" : "SUPERHUMAN NUMBERS"}
          </span>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <Button
            type="submit"
            variant="contained"
            color="success"
            onClick={handleDefaultQuranList}
          >
             {lang === 'tr' ? "Varsayılana Ayarla" : "Set Default"}
          </Button>
        </div>
        <table className="text-white text-center">
          <thead>
            <tr className="h-10 bg-gray-600">
              <th>No</th>
              <th> {lang === 'tr' ? "Sure" : "Sura"}</th>
              <th>{lang === 'tr' ? "Ayetler" : "Ayahs"}</th>
              <th>Huruf</th>
              <th>{lang === 'tr' ? "Besmele" : "Basmala"}</th>
              <th>{lang === 'tr' ? "Değiştir" : "Change"}</th>
            </tr>
          </thead>
          <tbody>
            {tempQuranList.map((sura, index) => (
              <tr key={index} className="odd:bg-gray-700 even:bg-gray-600">
                <td>{sura.surahNumber}</td>
                <td>{language === "tr" ? tr_quran[index].surahName : quran[index].surahName}</td>
                <td>
                  <input
                    id={`ayah-input-${index}`}
                    name={`ayah-input-${index}`}
                    className="w-10 text-yellow-300 text-center border-b outline-none bg-transparent"
                    type="text"
                    value={sura.totalAyahs}
                    onChange={(e) => handleAyahChange(index, e.target.value)}
                  />
                </td>
                <td>
                  <Checkbox
                    id={`huruf-checkbox-${index}`} // Dinamik id
                    name={`huruf-checkbox-${index}`} // Dinamik name
                    checked={sura.startsWithHurufMuqattaat}
                    onChange={() => handleHurufCheckboxChange(index)}
                  />
                </td>
                <td>
                  <Checkbox
                    id={`basmala-checkbox-${index}`} // Dinamik id
                    name={`basmala-checkbox-${index}`} // Dinamik name
                    checked={sura.startsWithBasmala}
                    onChange={() => handleBasmalaCheckboxChange(index)}
                  />
                </td>
                <td>
                  <Button
                    type="submit"
                    variant="contained"
                    onClick={handleUpdateQuranList}
                  >
                    <FaExchangeAlt />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-col gap-2 mt-2">
          <Button
            type="submit"
            variant="contained"
            color="success"
            onClick={handleDefaultQuranList}
          >
             {lang === 'tr' ? "Varsayılana Ayarla" : "Set Default"}
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
