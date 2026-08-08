import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { BiCategoryAlt } from "react-icons/bi";
import { RiHome3Line } from "react-icons/ri";
import { GiMedicines } from "react-icons/gi";
import { TbChecklist } from "react-icons/tb";
import { LiaPrescriptionBottleSolid } from "react-icons/lia";
import { IoPeople } from "react-icons/io5";
import { FaCarAlt } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa6";


const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul className="sidebar-list">
        <li>
          <RiHome3Line />
          <Link to="/Pharmacy/home">الرئيسية</Link>
        </li>
        <li>
          <BiCategoryAlt />
          <Link to="/Pharmacy/home/categories" >التصنيفات</Link>
        </li>
        <li>
          <GiMedicines />
          <Link to="/Pharmacy/home/products">المنتجات</Link>
        </li>
        <li>
          <TbChecklist />
          <Link to="/Pharmacy/home/orders">الطلبات</Link>
        </li>
        <li>
          <LiaPrescriptionBottleSolid />
          <Link to="/Pharmacy/home/prescriptions">الوصفات الطبية</Link>
        </li>
        <li>
          <IoPeople />
          <Link to="/Pharmacy/home/customers">العملاء</Link>
        </li>
        <li>
          <FaCarAlt />
          <Link to="/Pharmacy/home/drivers">مندوبو التوصيل</Link>
        </li>
        <li className="Logout">
          <FaPowerOff />
          <Link to="/Pharmacy/login">تسجيل الخروج</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
