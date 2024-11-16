import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  Button,
  Checkbox,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { FaHome } from "react-icons/fa";
import { AiOutlineNumber } from "react-icons/ai";
import { Link } from "react-router-dom";
import quran from "../assets/SurahInfo.json";
import { useQuran } from "../context/quranListContext";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const { quranList, setQuranList } = useQuran();
  const [tempQuranList, setTempQuranList] = useState([]);

  // İlk yüklemede localStorage'dan veriyi al
  useEffect(() => {
    const storedQuranList = localStorage.getItem("quranList");
    if (storedQuranList) {
      setQuranList(JSON.parse(storedQuranList));
      setTempQuranList(JSON.parse(storedQuranList));
    } else {
      setQuranList(quranList);
      setTempQuranList(quranList);
    }
  }, []);

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

  // Ayet sayısını geçici listeye kaydetme
  const handleAyahChange = (index, value) => {
    const updatedTempList = [...tempQuranList];
    updatedTempList[index].totalAyahs = parseInt(value) || 0;
    setTempQuranList(updatedTempList);
  };

  // Huruf Muqattaat Checkbox'ını geçici listeye kaydetme
  const handleHurufCheckboxChange = (index) => {
    const updatedTempList = [...tempQuranList];
    updatedTempList[index].startsWithHurufMuqattaat =
      !updatedTempList[index].startsWithHurufMuqattaat;
    setTempQuranList(updatedTempList);
  };

  // Basmala Checkbox'ını geçici listeye kaydetme
  const handleBasmalaCheckboxChange = (index) => {
    const updatedTempList = [...tempQuranList];
    updatedTempList[index].startsWithBasmala =
      !updatedTempList[index].startsWithBasmala;
    setTempQuranList(updatedTempList);
  };

  // `Değiştir` butonuna tıklandığında tempQuranList'i quranList'e aktar ve localStorage'a kaydet
  const handleUpdateQuranList = () => {
    setQuranList(tempQuranList);
    localStorage.setItem("quranList", JSON.stringify(tempQuranList));
    setIsLeftDrawerOpen(false);
  };

  const handleDefaultQuranList = () => {
    const defaultQuranList = JSON.parse(JSON.stringify(quran)); // Derin kopya al
    setQuranList(defaultQuranList); // Global state güncelle
    setTempQuranList(defaultQuranList); // Temp listeyi de güncelle
    localStorage.setItem("quranList", JSON.stringify(defaultQuranList)); // LocalStorage kaydet
    setIsLeftDrawerOpen(false); // Drawer kapat
  };
  

  return (
    <>
      <div className="flex justify-between items-center  bg-gradient-to-l from-gray-700 to-gray-800 px-2 md:px-10">
        <div className="w-20 pt-1">
          <img src={logo} alt="Logo" onClick={toggleDrawer2(true)} />
        </div>
        <div
          className="text-white text-3xl border border-gray-400 p-3 rounded-md cursor-pointer"
          onClick={toggleDrawer(true)}
        >
          <GiHamburgerMenu />
        </div>
      </div>

      {/* Sağ Drawer Bileşeni */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { width: 240, bgcolor: "#374151", padding: "5px" },
        }}
      >
        <div className="flex flex-col items-center justify-center text-center text-white">
          <span className="my-2 border-b">SUPERHUMAN NUMBERS</span>
        </div>
        <List
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          sx={{ color: "white" }}
        >
          <Link to={"/"}>
            <ListItem
              button
              onClick={() => handleListItemClick(0)}
              sx={{
                bgcolor: selectedItem === 0 ? "black" : "inherit",
                "&:hover": {
                  bgcolor: "black",
                },
              }}
            >
              <FaHome className="mr-1" />
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
            (issue, index) => (
              <Link to={`${issue}`} key={index}>
                <ListItem
                  button
                  onClick={() => handleListItemClick(issue)}
                  sx={{
                    bgcolor: selectedItem === issue ? "black" : "inherit",
                    "&:hover": {
                      bgcolor: "black",
                    },
                  }}
                >
                  <AiOutlineNumber className="mr-1" />
                  <ListItemText primary={`Issue ${issue}`} />
                </ListItem>
              </Link>
            )
          )}
        </List>
      </Drawer>

      {/* Sol Drawer Bileşeni */}
      <Drawer
        anchor="left"
        open={isLeftDrawerOpen}
        onClose={toggleDrawer2(false)}
        PaperProps={{
          sx: { width: 400, bgcolor: "#374151", padding: "5px" },
        }}
      >
        {/* Çarpı Butonu */}
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
            SUPERHUMAN NUMBERS
          </span>
        </div>
        <table className="text-white text-center">
          <thead>
            <tr className="h-10 bg-gray-600">
              <th>No</th>
              <th>Sure</th>
              <th>Ayetler</th>
              <th>Huruf</th>
              <th>Besmele</th>
            </tr>
          </thead>
          <tbody>
            {tempQuranList.map((sura, index) => (
              <tr key={index} className="odd:bg-gray-700 even:bg-gray-600">
                <td>{sura.surahNumber}</td>
                <td>{sura.surahName}</td>
                <td>
                  <input
                    className="w-10 text-yellow-300 text-center border-b  outline-none bg-transparent"
                    type="text"
                    value={sura.totalAyahs}
                    onChange={(e) => handleAyahChange(index, e.target.value)}
                  />
                </td>
                <td>
                  <Checkbox
                    checked={sura.startsWithHurufMuqattaat}
                    onChange={() => handleHurufCheckboxChange(index)}
                  />
                </td>
                <td>
                  <Checkbox
                    checked={sura.startsWithBasmala}
                    onChange={() => handleBasmalaCheckboxChange(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-col gap-2 mt-2">
          <Button
            type="submit"
            variant="contained"
            onClick={handleUpdateQuranList}
          >
            Değiştir
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="success"
            onClick={handleDefaultQuranList}
          >
            Varsayılana Ayarla
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
