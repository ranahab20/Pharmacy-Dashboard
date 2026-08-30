import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./ProductDetails.css";
import Loading from "../Loading/Loading";
import api from "../../api/axiosInstance";

const ProductDetails = () => {
  const { product_id } = useParams();
  const [loading, setLoading] = useState(true);
  // const product = products.find((item) => item.id === Number(product_id));
  const [products, setProducts] = useState(null);
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/Pharmacy/home/products");
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/products/${product_id}`)
        console.log("Details", response.data.data);
        setProducts(response.data.data);
        console.log("Product:", response.data.data);
console.log("Details:", response.data.data.details);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, []);

  if (loading) {
    return <Loading text="جاري تحميل تفاصيل المنتج..." />;
  }

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
            src={products?.image_url || "/path-to-panadol-image.png"}
            alt={products?.name || "صورة المنتج"}
          />
        </div>

        <div className="prd-basic-info">
          <h2 className="prd-title">{products?.name || "بنادول"}</h2>
          <span className="badge-status"> {products?.stock_status_label}</span>
          <span className="badge-category"> {products?.category?.name}</span>
        </div>

        <div className="prd-info-item">
          <span className="info-label">🪙 السعر</span>
          <span className="info-value"> {products?.price} ل.س</span>
        </div>

        <div className="prd-info-item">
          <span className="info-label">📦 الكمية المتوفرة</span>
          <span className="info-value">{products?.quantity}</span>
        </div>

        <div className="prd-info-item">
          <span className="info-label">📋 يتطلب وصفة</span>
          <span className="check-icon">{products?.is_required_prescription  ? "✔"
              : "✖"}</span>
        </div>
      </div>

      {/* تفاصيل ووصف الدواء */}
      <div className="prd-description">
        <div className="section-title">📋 وصف الدواء</div>
        <p className="section-text">
          {products?.description || "-"}
        </p>

        <div className="details-grid">
          {products?.details?.map((detail) => (
  <div className="grid-item" key={detail.id}>

    <div className="section-title">

      {detail.type === "warnings" && "❌ التحذيرات"}

      {detail.type === "usage_method" &&
        "🩺 الجرعة وطريقة الاستخدام"}

      {detail.type === "indications" &&
        "🩺 الاستخدامات"}

      {detail.type === "side_effects" &&
        "🩺 الآثار الجانبية"}

    </div>

    <p className="section-text">
      {detail.content}
    </p>
</div>
 
))}
</div>
    </div>
  </div>);}



export default ProductDetails;
