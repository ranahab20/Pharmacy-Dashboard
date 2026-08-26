import React, { useEffect, useState } from "react";
import "./Products.css";
import Button from "../../components/Button/Button";
import panadol from "../../assets/panadol.png";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";

const initialProducts = [
  {
    id: 1,
    name: "Panadol Extra",
    image: panadol,
    category: "مسكنات",
    description: "مسكن للألم وخافض للحرارة",
    price: 15000,
    quantity: 120,
    is_requires_prescription: false,
    status: "متوفر",
  },

  {
    id: 2,
    name: "Augmentin 625mg",
    image: "/images/augmentin.jpg",
    category: "مضادات حيوية",
    description: "مضاد حيوي لعلاج الالتهابات البكتيرية",
    price: 35000,
    quantity: 45,
    is_requires_prescription: true,
    status: "متوفر",
  },

  {
    id: 3,
    name: "Vitamin C",
    image: "/images/vitamin-c.jpg",
    category: "فيتامينات ومكملات",
    description: "مكمل غذائي لدعم جهاز المناعة",
    price: 12000,
    quantity: 80,
    is_requires_prescription: false,
    status: "متوفر",
  },

  {
    id: 4,
    name: "Brufen 400mg",
    image: "/images/brufen.jpg",
    category: "مسكنات",
    description: "مسكن ومضاد للالتهاب",
    price: 10000,
    quantity: 8,
    is_requires_prescription: false,
    status: "كمية قليلة",
  },

  {
    id: 5,
    name: "Amoxicillin 500mg",
    image: "/images/amoxicillin.jpg",
    category: "مضادات حيوية",
    description: "مضاد حيوي لعلاج العدوى البكتيرية",
    price: 22000,
    quantity: 0,
    is_requires_prescription: true,
    status: "غير متوفر",
  },

  {
    id: 6,
    name: "Omega 3",
    image: "/images/omega3.jpg",
    category: "فيتامينات ومكملات",
    description: "مكمل غذائي يحتوي على أحماض أوميغا 3",
    price: 28000,
    quantity: 32,
    is_requires_prescription: false,
    status: "متوفر",
  },

  {
    id: 7,
    name: "CeraVe Moisturizer",
    image: "/images/cerave.jpg",
    category: "العناية بالبشرة",
    description: "مرطب للبشرة الجافة والحساسة",
    price: 45000,
    quantity: 25,
    is_requires_prescription: false,
    status: "متوفر",
  },

  {
    id: 8,
    name: "Ventolin Inhaler",
    image: "/images/ventolin.jpg",
    category: "أدوية الجهاز التنفسي",
    description: "بخاخ يساعد على تخفيف أعراض الربو",
    price: 18000,
    quantity: 12,
    is_requires_prescription: true,
    status: "متوفر",
  },
];

/* ==========================================
   Empty Edit Form
========================================== */

const emptyEditForm = {
  name: "",
  quantity: "",
  image: null,
  category: "",
  status: "",
  is_requires_prescription: false,
  price: "",
  description: "",
};

const Products = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [editions, setEditions] = useState(emptyEditForm);

  const [previewUrl, setPreviewUrl] = useState("");

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
     Start Editing Product
  ========================================== */

  const editProduct = (product) => {
    // في حال كان هناك preview سابق لم يتم حفظه
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl("");
    }

    setEditingId(product.id);

    setEditions({
      name: product.name,
      quantity: product.quantity,
      image: null,

      category: product.category,

      status: product.status,

      is_requires_prescription: product.is_requires_prescription,

      price: product.price,

      description: product.description,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // حذف preview القديم من الذاكرة
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

  const saveEdit = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id !== id) {
          return product;
        }

        return {
          ...product,

          name: editions.name,

          category: editions.category,

          description: editions.description,

          price: Number(editions.price),

          quantity: Number(editions.quantity),

          status: editions.status,

          is_requires_prescription: editions.is_requires_prescription,

          /*
            إذا اختار المستخدم صورة جديدة
            استخدم previewUrl.

            إذا لم يختر صورة
            احتفظ بالصورة القديمة.
          */
          image: editions.image instanceof File ? previewUrl : product.image,
        };
      }),
    );

    /*
      لا نستخدم revoke هنا للصورة المحفوظة
      لأن product.image أصبح يستخدم previewUrl.
    */

    setPreviewUrl("");

    resetEdit();
  };

  /* ==========================================
     Cancel Editing
  ========================================== */

  const cancelEdit = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl("");
    }

    resetEdit();
  };

  /* ==========================================
     Reset Edit State
  ========================================== */

  const resetEdit = () => {
    setEditingId(null);

    setEditions(emptyEditForm);
  };

  /* ==========================================
     Product Details
  ========================================== */

  const viewProduct = (productId) => {
    navigate(`/Pharmacy/home/products/${productId}`);
  };

  /* ==========================================
     Search
  ========================================== */

  const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase().trim();

    return (
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search)
    );
  });

  /*
    إذا خرجنا من الصفحة وفيه preview
    غير مستخدم، نحاول تنظيفه.
  */

  useEffect(() => {
    return () => {
      if (previewUrl && editions.image instanceof File) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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
              <th>التفاصيل</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const isEditing = editingId === product.id;

                return (
                  <tr key={product.id}>
                    {/* ID */}

                    <td>{product.id}</td>

                    {/* Name */}

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

                    {/* Image */}

                    <td>
                      {isEditing ? (
                        <div className="edit-image-container">
                          <img
                            src={previewUrl || product.image}
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
                          src={product.image}
                          alt={product.name}
                          className="prd-img"
                        />
                      )}
                    </td>

                    {/* Category */}

                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          name="category"
                          value={editions.category}
                          onChange={handleEditChange}
                          className="edit-input"
                        />
                      ) : (
                        product.category
                      )}
                    </td>

                    {/* Description */}

                    <td>
                      {isEditing ? (
                        <textarea
                          name="description"
                          value={editions.description}
                          onChange={handleEditChange}
                          className="edit-input edit-description"
                        />
                      ) : (
                        product.description
                      )}
                    </td>

                    {/* Price */}

                    <td>
                      {isEditing ? (
                        <input
                          type="number"
                          name="price"
                          min="0"
                          value={editions.price}
                          onChange={handleEditChange}
                          className="edit-input"
                        />
                      ) : (
                        `${product.price} ل.س`
                      )}
                    </td>

                    {/* Quantity */}

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

                    {/* Prescription */}

                    <td>
                      {isEditing ? (
                        <label className="checkbox-edit">
                          <input
                            type="checkbox"
                            name="is_requires_prescription"
                            checked={editions.is_requires_prescription}
                            onChange={handleEditChange}
                          />

                          <span>يتطلب وصفة</span>
                        </label>
                      ) : product.is_requires_prescription ? (
                        "نعم"
                      ) : (
                        "لا"
                      )}
                    </td>

                    {/* Status */}

                    <td>
                      {isEditing ? (
                        <select
                          name="status"
                          value={editions.status}
                          onChange={handleEditChange}
                          className="edit-input"
                        >
                          <option value="متوفر">متوفر</option>

                          <option value="كمية قليلة">كمية قليلة</option>

                          <option value="غير متوفر">غير متوفر</option>
                        </select>
                      ) : (
                        <span className={`status status-${product.status}`}>
                          {product.status}
                        </span>
                      )}
                    </td>

                    {/* Edit / Save */}

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
                    {/* Details */}
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
