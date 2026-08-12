import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "./Products.css";

import Button from "../../components/Button/Button";
import FormModal from "../../components/FormModal/FormModal";

const initialProducts = [
  {
    id: 1,
    name: "Panadol",
    category: "الأدوية",
    price: 10000,
  },
  {
    id: 2,
    name: "Augmentin",
    category: "الأدوية",
    price: 15000,
  },
  {
    id: 3,
    name: "Vitamin C",
    category: "فيتامينات ومكملات",
    price: 8000,
  },
];

const Products = () => {
  const [productName, setProductName] = useState("");

  // إظهار وإخفاء FormModal
  const [showForm, setShowForm] = useState(false);

  // قائمة المنتجات
  const [products, setProducts] = useState(initialProducts);

  // فتح الفورم
  const openForm = () => {
    setShowForm(true);
  };

  // إغلاق الفورم
  const closeForm = () => {
    setShowForm(false);
    setProductName("");
  };

  // إضافة منتج
  const addProduct = () => {
    // منع الإضافة إذا كان input فارغًا
    if (!productName.trim()) {
      return;
    }

    // البيانات التي سنرسلها للـ Backend لاحقًا
    const productData = {
      name: productName,
    };

    console.log("Product data:", productData);

    // إضافة المنتج مؤقتًا إلى الواجهة
    const newProduct = {
      id: products.length + 1,
      name: productName,
      category: "غير محدد",
      price: 0,
    };

    setProducts((prevProducts) => [...prevProducts, newProduct]);

    // إغلاق الفورم
    closeForm();
  };

  return (
    <div className="prd-div">
      {/* ================= HEADER ================= */}

      <div className="prd-header">
        <h3>المنتجات</h3>

        <Button className="ctg-btn" onClick={openForm}>
          منتج جديد +
        </Button>
      </div>
      <div className="search-prd">
        <input type="text" placeholder="بحث عن .." className="search" />
      </div>

      {/* ================= FORM ================= */}

      {showForm && (
        <FormModal
          title="إضافة منتج جديد"
          label="اسم المنتج"
          placeholder="أدخل اسم المنتج"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          onSubmit={addProduct}
          onClose={closeForm}
        />
      )}

      {/* ================= TABLE ================= */}

      <div className="prd-table">
        <table>
          <thead>
            <tr>
              <th>رقم المنتج</th>
              <th>صورة المنتج</th>
              <th>اسم المنتج</th>
              <th>التصنيف</th>
              <th>الوصف</th>
              <th>السعر</th>
              <th>الكمية</th>
              <th>يتطلب وصفة</th>
              <th>الحالة</th>
              <th>تعديل</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>

                <td>{product.name}</td>

                <td>{product.category}</td>

                <td>{product.price}</td>

                <td>
                  <button className="edit-btn">✏️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
