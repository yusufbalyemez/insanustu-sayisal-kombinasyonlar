import React, { useState } from "react";
import logo from "../images/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { FaHome } from "react-icons/fa";
import { AiOutlineNumber } from "react-icons/ai";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  // Tıklanan öğenin indeksini günceller
  const handleListItemClick = (index) => {
    setSelectedItem(index);
  };

  return (
    <>
      <div className="flex justify-between items-center bg-gray-700 px-2 md:px-10">
        <div className="w-24">
          <img src={logo} alt="Logo" />
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
          <ListItem
            button
            onClick={() => handleListItemClick(0)}
            sx={{ bgcolor: selectedItem === 0 ? "black" : "inherit","&:hover": {
      bgcolor: "black", // Fare imleci üzerine gelince siyah yap
    },  }}
          >
            <FaHome className="mr-1" />
            <ListItemText primary="Home" />
          </ListItem>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
            (issue, index) => (
              <ListItem
                button
                key={index}
                onClick={() => handleListItemClick(issue)}
                sx={{ bgcolor: selectedItem === issue ? "black" : "inherit","&:hover": {
      bgcolor: "black", // Fare imleci üzerine gelince siyah yap
    }, }}
              >
                <AiOutlineNumber className="mr-1" />
                <ListItemText primary={`Issue ${issue}`} />
              </ListItem>
            )
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
