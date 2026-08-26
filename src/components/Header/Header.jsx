import React from "react";
import logo from "../../assets/logo.png";

import { FaSearch } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { CiBellOn } from "react-icons/ci";
import { HiMenu } from "react-icons/hi";

import "./Header.css";

const Header = ({ onMenuClick }) => {
  return (
    <header className="header">

      <button
        className="menu-btn"
        onClick={onMenuClick}
      >
        <HiMenu />
      </button>

      <div className="logo-box">
        <img src={logo} alt="Logo" />

        <p>إدارة نظام دواءك</p>
      </div>

      <div className="search-box">

        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="بحث عن .."
          className="search"
        />

        <TiDeleteOutline className="delete-icon" />

      </div>

      <div className="bell-box">
        <CiBellOn className="bell" />
      </div>

    </header>
  );
};

export default Header;