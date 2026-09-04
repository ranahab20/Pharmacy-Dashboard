import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./ProductDetails.css";
import Loading from "../Loading/Loading";
import api from "../../api/axiosInstance";

const ProductDetails = () => {
  const { product_id } = useParams();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/Pharmacy/home/products");
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/products/${product_id}`);

        console.log("Product:", response.data.data);
        console.log("Details:", response.data.data.details);

        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching product details:", error);

        setError(
          error.response?.data?.message || "حدث خطأ أثناء جلب تفاصيل المنتج",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [product_id]);

  if (loading) {
    return <Loading text="جاري تحميل تفاصيل المنتج..." />;
  }

  if (error) {
    return <div className="product-error">{error}</div>;
  }

  if (!product) {
    return <div className="product-error">المنتج غير موجود</div>;
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
            src={product.image_url || "/path-to-panadol-image.png"}
            alt={product.name || "صورة المنتج"}
          />
        </div>

        <div className="prd-basic-info">
          <h2 className="prd-title">{product.name || "-"}</h2>

          <span className="badge-status">
            {product.stock_status_label || "-"}
          </span>

          <span className="badge-category">
            {product.category?.name || "-"}
          </span>
        </div>

        <div className="prd-info-item">
          <span className="info-label">🪙 السعر</span>

          <span className="info-value">{product.price} ل.س</span>
        </div>

        <div className="prd-info-item">
          <span className="info-label">📦 الكمية المتوفرة</span>

          <span className="info-value">{product.quantity}</span>
        </div>

        <div className="prd-info-item">
          <span className="info-label">📋 يتطلب وصفة</span>

          <span className="check-icon">
            {product.is_required_prescription ? "✔" : "✖"}
          </span>
        </div>
      </div>

      {/* وصف وتفاصيل المنتج */}
      <div className="prd-description">
        <div className="section-title">📋 وصف الدواء</div>

        <p className="section-text">{product.description || "-"}</p>

        <div className="details-grid">
          {product.details.map((detail) => (
            <div className="grid-item" key={detail.id}>
              <div className="section-title">
                {detail.type === "warnings" && "❌ التحذيرات"}

                {detail.type === "usage_method" && "🩺 الجرعة وطريقة الاستخدام"}

                {detail.type === "indications" && "🩺 الاستخدامات"}

                {detail.type === "side_effects" && "🩺 الآثار الجانبية"}
              </div>

              <p className="section-text">{detail.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
