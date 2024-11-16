import React, { useState } from "react";
import logo from "../images/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button, Checkbox, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { FaHome } from "react-icons/fa";
import { AiOutlineNumber } from "react-icons/ai";
import { Link } from "react-router-dom";
import quran from "../assets/SurahInfo.json";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const [quranList,setQuranList] = useState(quran)

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
  // Tıklanan öğenin indeksini günceller
  const handleListItemClick = (index) => {
    setSelectedItem(index);
  };

  return (
    <>
      <div className="flex justify-between items-center bg-gray-700 px-2 md:px-10">
        <div className="w-24">
          <img src={logo} alt="Logo" onClick={toggleDrawer2(true)} />
        </div>
        <div
          className="text-white text-3xl border border-gray-400 p-3 rounded-md cursor-pointer"
          onClick={toggleDrawer(true)} // Ikona tıklanınca Drawer açılır
        >
          <GiHamburgerMenu />
        </div>
      </div>

      {/* Drawer Bileşeni */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { width: 240, bgcolor: "#374151", padding: "5px" }, // Drawer genişliği burada ayarlanıyor
        }}
      >
        <div className=" flex flex-col items-center justify-center  text-center text-white">
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
                  bgcolor: "black", // Fare imleci üzerine gelince siyah yap
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
                  key={index}
                  onClick={() => handleListItemClick(issue)}
                  sx={{
                    bgcolor: selectedItem === issue ? "black" : "inherit",
                    "&:hover": {
                      bgcolor: "black", // Fare imleci üzerine gelince siyah yap
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
      <Drawer
        anchor="left"
        open={isLeftDrawerOpen}
        onClose={toggleDrawer2(false)}
        PaperProps={{
          sx: { width: 400, bgcolor: "#374151", padding: "5px" }, // Drawer genişliği burada ayarlanıyor
        }}
      >
        <div className=" flex flex-col items-center justify-center  text-center text-white">
          <span className="my-2 border-b">SUPERHUMAN NUMBERS</span>
        </div>
        <table className="text-white text-center">
          <thead>
            <th>No</th>
            <th>Sure</th>
            <th>Ayetler</th>
            <th>Huruf</th>
            <th>Besmele</th>
          </thead>
          <tbody>
            {
              quranList.map((sura,index)=>(
                <tr key={index}>
              <td>{sura.surahNumber}</td>
              <td>{sura.surahName}</td>
              <td>
                <input className="w-10 text-black" type="text" value={sura.totalAyahs}/>
              </td>
              <td>
                <Checkbox checked={sura.startsWithHurufMuqattaat}></Checkbox>
              </td>
              <td>
                <Checkbox checked={sura.startsWithBasmala}></Checkbox>
              </td>
            </tr>
              ))
            }
          </tbody>
        </table>
        <Button>Değiştir</Button>
      </Drawer>
    </>
  );
};

export default Navbar;
