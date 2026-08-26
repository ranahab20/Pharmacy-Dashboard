import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import "./Sidebar.css";
import { BiCategoryAlt } from "react-icons/bi";
import { RiHome3Line } from "react-icons/ri";
import { GiMedicines } from "react-icons/gi";
import { TbChecklist } from "react-icons/tb";
import { IoPeople } from "react-icons/io5";
import { FaCarAlt } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa6";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

const Sidebar = ({ isOpen, onClose }) => {
  const { pathname } = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(false);

    // لاحقًا إذا عندك token:
    // localStorage.removeItem("token");

    navigate("/Pharmacy/login");
  };
  return (
    <>
      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <ul className="sidebar-list">
          <li>
            <Link
              to="/Pharmacy/home"
              className={`nav-link ${
                pathname === "/Pharmacy/home" ? "active" : ""
              }`}
              onClick={onClose}
            >
              <RiHome3Line />
              <span>الرئيسية</span>
            </Link>
          </li>

          <li>
            <Link
              to="/Pharmacy/home/categories"
              onClick={onClose}
              className={`nav-link ${
                pathname === "/Pharmacy/home/categories" ? "active" : ""
              }`}
            >
              <BiCategoryAlt />
              <span>التصنيفات</span>
            </Link>
          </li>

          <li>
            <Link
              to="/Pharmacy/home/products"
              onClick={onClose}
              className={`nav-link ${
                pathname.startsWith("/Pharmacy/home/products") ||
                pathname === "/Pharmacy/home/addProduct"
                  ? "active"
                  : ""
              }`}
            >
              <GiMedicines />
              <span>المنتجات</span>
            </Link>
          </li>

          <li>
            <Link
              to="/Pharmacy/home/orders"
              onClick={onClose}
              className={`nav-link ${
                pathname.startsWith("/Pharmacy/home/orders") ||
                pathname === "/Pharmacy/home/orderDetails"
                  ? "active"
                  : ""
              }`}
            >
              <TbChecklist />
              <span>الطلبات</span>
            </Link>
          </li>

          <li>
            <Link
              to="/Pharmacy/home/customers"
              onClick={onClose}
              className={`nav-link ${
                pathname === "/Pharmacy/home/customers" ? "active" : ""
              }`}
            >
              <IoPeople />
              <span>العملاء</span>
            </Link>
          </li>

          <li>
            <Link
              onClick={onClose}
              to="/Pharmacy/home/drivers"
              className={`nav-link ${
                pathname.startsWith("/Pharmacy/home/drivers") ||
                pathname === "/Pharmacy/home/AddDriver"
                  ? "active"
                  : ""
              }`}
            >
              <FaCarAlt />
              <span>مندوبو التوصيل</span>
            </Link>
          </li>

          <li className="Logout">
            <button
              className="logout-btn"
              onClick={() => setShowLogoutModal(true)}
            >
              تسجيل الخروج
            </button>
          </li>
        </ul>
      </aside>
      <ConfirmModal
        isOpen={showLogoutModal}
        title="تأكيد تسجيل الخروج"
        message="هل أنت متأكد أنك تريد تسجيل الخروج؟"
        confirmText="تسجيل الخروج"
        cancelText="إلغاء"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </>
  );
};

export default Sidebar;
