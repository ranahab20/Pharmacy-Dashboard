import React, { useEffect, useState } from "react";
import "./Products.css";

import Button from "../../components/Button/Button";
import Loading from "../Loading/Loading";

import panadol from "../../assets/panadol.png";

import { useNavigate } from "react-router-dom";

import { IoEyeOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";

import api from "../../api/axiosInstance";
import toast from "react-hot-toast";

/* ==========================================
   Empty Edit Form
========================================== */

const emptyEditForm = {
  name: "",
  image: null,
  description: "",
  price: "",
  quantity: "",
  is_required_prescription: false,
};

const Products = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [editions, setEditions] = useState(emptyEditForm);

  const [previewUrl, setPreviewUrl] = useState("");

  /* ==========================================
     GET Products
  ========================================== */

  const fetchProducts = async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true);
      }

      const response = await api.get("/products");

      console.log("Products response:", response.data);

      const productsData = Array.isArray(response.data.data)
        ? response.data.data
        : [];

      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching Products:", error);
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  };

  const deleteCat = async (id) => {
    try {
      const response = await api.delete(`/products/${id}`);
      console.log("Delete response:", response.data);
      toast.success(response.data.message);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id),
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addHandler = () => {
    navigate("/Pharmacy/home/addProduct");
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;

    setEditions((prev) => ({
      ...prev,

      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ==========================================
     Start Editing
  ========================================== */

  const editProduct = (product) => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);

      setPreviewUrl("");
    }

    setEditingId(product.id);

    setEditions({
      name: product.name || "",
      image: null,
      description: product.description || "",
      price: product.price ?? "",
      quantity: product.quantity ?? "",
      is_required_prescription: product.is_required_prescription ?? false,
    });
  };

  /* ==========================================
     Image Change
  ========================================== */

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const newPreviewUrl = URL.createObjectURL(file);

    setPreviewUrl(newPreviewUrl);

    setEditions((prev) => ({
      ...prev,

      image: file,
    }));
  };

  const saveEdit = async (id) => {
    if (!editions.name.trim()) {
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", editions.name);

      formData.append("description", editions.description);

      formData.append("price", editions.price);

      formData.append("quantity", editions.quantity);

      formData.append(
        "is_required_prescription",
        editions.is_required_prescription ? "1" : "0",
      );

      /* New Image */

      if (editions.image instanceof File) {
        formData.append("image", editions.image);
      }

      const response = await api.post(`/products/${id}`, formData);

      console.log("Update response:", response.data);

      toast.success(response.data.message || "تم تعديل المنتج بنجاح");

      await fetchProducts(false);

      setPreviewUrl("");

      resetEdit();
    } catch (error) {
      console.error("Error updating Product:", error);

      console.log("Backend response:", error.response?.data);

      toast.error(
        error.response?.data?.message || "حدث خطأ أثناء تعديل المنتج",
      );
    }
  };

  /* ==========================================
     Cancel Edit
  ========================================== */

  const cancelEdit = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);

      setPreviewUrl("");
    }

    resetEdit();
  };

  const resetEdit = () => {
    setEditingId(null);

    setEditions(emptyEditForm);
  };

  const viewProduct = (productId) => {
    navigate(`/Pharmacy/home/products/${productId}`);
  };

  const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase().trim();

    return (
      product.name?.toLowerCase().includes(search) ||
      product.category?.name?.toLowerCase().includes(search) ||
      product.description?.toLowerCase().includes(search)
    );
  });

  /* ==========================================
     Cleanup Preview
  ========================================== */

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  if (loading) {
    return <Loading text="جاري تحميل المنتجات..." />;
  }

  return (
    <div className="prd-div">
      <div className="prd-header">
        <h3>المنتجات</h3>

        <Button className="ctg-btn" onClick={addHandler}>
          منتج جديد +
        </Button>
      </div>

      <div className="search-prd">
        <FaSearch className="product-search-icon" />

        <input
          type="text"
          placeholder="بحث عن منتج..."
          className="product-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="prd-table">
        <table>
          <thead>
            <tr>
              <th>رقم المنتج</th>
              <th>اسم المنتج</th>
              <th>صورة المنتج</th>
              <th>التصنيف</th>
              <th>الوصف</th>
              <th>السعر</th>
              <th>الكمية</th>
              <th>يتطلب وصفة</th>
              <th>الحالة</th>
              <th>تعديل</th>
              <th>حذف</th>
              <th>التفاصيل</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const isEditing = editingId === product.id;

                return (
                  <tr key={product.id}>
                    <td>{product.id}</td>

                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={editions.name}
                          onChange={handleEditChange}
                          className="edit-input"
                        />
                      ) : (
                        product.name
                      )}
                    </td>

                    <td>
                      {isEditing ? (
                        <div className="edit-image-container">
                          <img
                            src={previewUrl || product.image_url || panadol}
                            alt={product.name}
                            className="prd-img"
                          />

                          <input
                            type="file"
                            id={`image-${product.id}`}
                            accept="image/*"
                            onChange={handleImageChange}
                            hidden
                          />

                          <label
                            htmlFor={`image-${product.id}`}
                            className="change-image-btn"
                          >
                            تغيير الصورة
                          </label>
                        </div>
                      ) : (
                        <img
                          src={product.image_url || panadol}
                          alt={product.name}
                          className="prd-img"
                        />
                      )}
                    </td>

                    <td>{product.category?.name || "-"}</td>

                    <td>
                      {isEditing ? (
                        <textarea
                          name="description"
                          value={editions.description}
                          onChange={handleEditChange}
                          className="edit-input edit-description"
                        />
                      ) : (
                        product.description || "-"
                      )}
                    </td>

                    <td>
                      {isEditing ? (
                        <input
                          type="number"
                          name="price"
                          min="0"
                          step="0.01"
                          value={editions.price}
                          onChange={handleEditChange}
                          className="edit-input"
                        />
                      ) : (
                        `${product.price} ل.س`
                      )}
                    </td>

                    <td>
                      {isEditing ? (
                        <input
                          type="number"
                          name="quantity"
                          min="0"
                          value={editions.quantity}
                          onChange={handleEditChange}
                          className="edit-input"
                        />
                      ) : (
                        product.quantity
                      )}
                    </td>

                    <td>
                      {isEditing ? (
                        <label className="checkbox-edit">
                          <input
                            type="checkbox"
                            name="is_required_prescription"
                            checked={editions.is_required_prescription}
                            onChange={handleEditChange}
                          />

                          <span>يتطلب وصفة</span>
                        </label>
                      ) : product.is_required_prescription ? (
                        "نعم"
                      ) : (
                        "لا"
                      )}
                    </td>

                    <td>
                      <span className={`status status-${product.stock_status}`}>
                        {product.stock_status_label}
                      </span>
                    </td>

                    <td>
                      {isEditing ? (
                        <div className="edit-actions">
                          <button
                            type="button"
                            className="save-edit"
                            onClick={() => saveEdit(product.id)}
                          >
                            حفظ
                          </button>

                          <button
                            type="button"
                            className="cancel-edit"
                            onClick={cancelEdit}
                          >
                            إلغاء
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="edit-btn"
                          onClick={() => editProduct(product)}
                          aria-label="تعديل المنتج"
                        >
                          ✏️
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => deleteCat(product.id)}
                      >
                        🗑️
                      </button>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="prd-info"
                        onClick={() => viewProduct(product.id)}
                        aria-label="تفاصيل المنتج"
                      >
                        <IoEyeOutline />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="11" className="no-products">
                  لا يوجد منتجات مطابقة للبحث
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
