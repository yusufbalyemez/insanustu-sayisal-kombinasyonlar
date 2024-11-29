import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaExchangeAlt } from "react-icons/fa";
import { MdOutlineFormatListNumberedRtl } from "react-icons/md";
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
import { useQuran } from "../context/quranListContext";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const { quranList, setQuranList } = useQuran();
  const [tempQuranList, setTempQuranList] = useState([]);

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
    setQuranList(tempQuranList);
    localStorage.setItem("quranList", JSON.stringify(tempQuranList));
    setIsLeftDrawerOpen(false);
  };

  const handleDefaultQuranList = () => {
    const defaultQuranList = JSON.parse(JSON.stringify(quran));
    setQuranList(defaultQuranList);
    setTempQuranList(defaultQuranList);
    localStorage.setItem("quranList", JSON.stringify(defaultQuranList));
    setIsLeftDrawerOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-center bg-gradient-to-l from-gray-700 to-gray-800 px-2 md:px-10">
        <div className="w-20 pt-1">
          <img src={logo} alt="Logo" onClick={toggleDrawer2(true)} />
        </div>
        <div className="flex  items-center justify-center gap-5 text-white text-xl mr-1">
          <div
            className=" cursor-pointer flex gap-1 items-center justify-center hover:text-yellow-300 duration-300"
            onClick={toggleDrawer2(true)}
          >
            <CiViewList />
            Tablo
          </div>
          <div
            className=" cursor-pointer flex gap-1 items-center justify-center hover:text-yellow-300 duration-300"
            onClick={toggleDrawer(true)}
          >
            <MdOutlineFormatListNumberedRtl />
            Sayılar
          </div>
          {/* <div
            className="text-white text-3xl border border-gray-400 p-3 rounded-md cursor-pointer"
            onClick={toggleDrawer(true)}
          >
            <GiHamburgerMenu />
          </div> */}
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
          <span className="my-2 border-b">SUPERHUMAN NUMBERS</span>
        </div>
        <List
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          sx={{ color: "white" }}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
            (issue, index) => (
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
                  primary={issue === 0 ? "Anasayfa" : `Sayı ${issue}`}
                />
              </ListItem>
            )
          )}
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
            SUPERHUMAN NUMBERS
          </span>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <Button
            type="submit"
            variant="contained"
            color="success"
            onClick={handleDefaultQuranList}
          >
            Varsayılana Ayarla
          </Button>
        </div>
        <table className="text-white text-center">
          <thead>
            <tr className="h-10 bg-gray-600">
              <th>No</th>
              <th>Sure</th>
              <th>Ayetler</th>
              <th>Huruf</th>
              <th>Besmele</th>
              <th>Değiştir</th>
            </tr>
          </thead>
          <tbody>
            {tempQuranList.map((sura, index) => (
              <tr key={index} className="odd:bg-gray-700 even:bg-gray-600">
                <td>{sura.surahNumber}</td>
                <td>{sura.surahName}</td>
                <td>
                  <input
                    className="w-10 text-yellow-300 text-center border-b outline-none bg-transparent"
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
            Varsayılana Ayarla
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
