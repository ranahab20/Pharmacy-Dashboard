import React from "react";
import { useNavigate } from "react-router-dom";
import { FiAlertTriangle, FiHome, FiArrowLeft } from "react-icons/fi";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-page">
      <div className="notfound-card">
        <div className="notfound-icon-wrapper">
          <FiAlertTriangle className="notfound-icon" />
        </div>

        <h1 className="notfound-code">404</h1>

        <h2 className="notfound-title">الصفحة غير موجودة</h2>

        <p className="notfound-text">
          عذراً، يبدو أن الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى مكان
          آخر.
        </p>

        <div className="notfound-line">
          <span></span>
          <span className="active"></span>
          <span></span>
        </div>

        <div className="notfound-actions">
          <button className="notfound-back" onClick={() => navigate(-1)}>
            <FiArrowLeft />
            الرجوع للخلف
          </button>

          <button
            className="notfound-home"
            onClick={() => navigate("/Pharmacy/home")}
          >
            <FiHome />
            العودة للرئيسية
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
