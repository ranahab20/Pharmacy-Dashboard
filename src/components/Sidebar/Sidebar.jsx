import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { BiCategoryAlt } from "react-icons/bi";
import { RiHome3Line } from "react-icons/ri";
import { GiMedicines } from "react-icons/gi";
import { TbChecklist } from "react-icons/tb";
import { IoPeople } from "react-icons/io5";
import { FaCarAlt } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa6";
import { IoPersonOutline } from "react-icons/io5";

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <aside className="sidebar">
      <ul className="sidebar-list">
        <li>
          <Link
            to="/Pharmacy/home"
            className={`nav-link ${
              pathname === "/Pharmacy/home" ? "active" : ""
            }`}
          >
            <RiHome3Line />
            <span>الرئيسية</span>
          </Link>
        </li>

        <li>
          <Link
            to="/Pharmacy/home/categories"
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
            to="/Pharmacy/home/drivers"
            className={`nav-link ${
              pathname.startsWith("/Pharmacy/home/drivers") ||  pathname === "/Pharmacy/home/AddDriver"  ? "active" : ""
            }`}
          >
            <FaCarAlt />
            <span>مندوبو التوصيل</span>
          </Link>
        </li>

        <li>
          <Link
            to="/Pharmacy/home/profile"
            className={`nav-link ${
              pathname === "/Pharmacy/home/profile" ? "active" : ""
            }`}
          >
            <IoPersonOutline />
            <span>الملف الشخصي</span>
          </Link>
        </li>

        <li className="Logout">
          <Link
            to="/Pharmacy/login"
            className={`nav-link ${
              pathname === "/Pharmacy/login" ? "active" : ""
            }`}
          >
            <FaPowerOff />
            <span>تسجيل الخروج</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
