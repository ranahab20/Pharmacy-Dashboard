import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { product_id } = useParams();

  const products = [];
  const product = products.find((item) => item.id === Number(product_id));

  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/Pharmacy/home/products");
  };

  return (
    <div className="prd-details-div">
      <div className="prd-details-header">
        <span>تفاصيل المنتج</span>
        <Button className="prd-details-btn" onClick={clickHandler}>
          عودة للمنتجات
        </Button>
      </div>


      {/* بطاقة ملخص المنتج */}
      <div className="prd-summary-card">
        <div className="prd-image-box">
          <img
            src={product?.image || "/path-to-panadol-image.png"}
            alt="صورة المنتج"
          />
        </div>

        <div className="prd-basic-info">
          <h2 className="prd-title">{product?.name || "بنادول"}</h2>
          <span className="badge-status">غير متوفر</span>
          <span className="badge-category">مسكنات</span>
        </div>

        <div className="prd-info-item">
          <span className="info-label">🪙 السعر</span>
          <span className="info-value">656 ل.س</span>
        </div>

        <div className="prd-info-item">
          <span className="info-label">📦 الكمية المتوفرة</span>
          <span className="info-value">0</span>
        </div>

        <div className="prd-info-item">
          <span className="info-label">📋 يتطلب وصفة</span>
          <span className="check-icon">✔</span>
        </div>
      </div>

      {/* تفاصيل ووصف الدواء */}
      <div className="prd-description">
        <div className="section-title">📋 وصف الدواء</div>
        <p className="section-text">
          بنادول يستخدم لتخفيف الألم، وخفض الحرارة الناتجة عن نزلات البرد
          والإنفلونزا والصداع وآلام الجسم.
        </p>

        <div className="details-grid">
          <div className="grid-item">
            <div className="section-title">🩺 الجرعة وطريقة الاستخدام</div>
            <p className="section-text">
              البالغون والأطفال أكبر من 12 سنة : من قرص إلى قرصين كل 4 ساعات إلى
              6 ساعات.
            </p>
          </div>

          <div className="grid-item">
            <div className="section-title">🩺 الاستخدامات</div>
            <p className="section-text">
              تخفيف الصداع، خفض الحرارة، آلام العضلات وآلام الأسنان.
            </p>
          </div>

          <div className="grid-item">
            <div className="section-title">🩺 الآثار الجانبية</div>
            <p className="section-text">
              طفح جلدي وألم معدي معوي لمن يعانون من حساسية ضد مادة السيتامول.
            </p>
          </div>

          <div className="grid-item">
            <div className="section-title">❌ التحذيرات</div>
            <p className="section-text">
              لا يستخدم لمن يعانون من حساسية ضد مادة السيتامول.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
