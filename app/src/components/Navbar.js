import React, { useState } from "react";
import logo from "../images/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { FaHome } from "react-icons/fa";
import { AiOutlineNumber } from "react-icons/ai";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
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
          <ListItem button>
            <FaHome className="mr-1" />
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button>
            <AiOutlineNumber className="mr-1" />
            <ListItemText primary="Issue 1" />
          </ListItem>
          <ListItem button>
            <AiOutlineNumber className="mr-1" />
            <ListItemText primary="Issue 2" />
          </ListItem>
          <ListItem button>
            <AiOutlineNumber className="mr-1" />
            <ListItemText primary="Issue 3" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
