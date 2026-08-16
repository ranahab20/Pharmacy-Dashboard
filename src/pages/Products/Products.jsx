import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./Products.css";
import Button from "../../components/Button/Button";
import FormModal from "../../components/FormModal/FormModal";
import panadol from "../../assets/panadol.png";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";

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
const Products = () => {
  const [product_name, setProductName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();
  const [editions, setEditions] = useState({
    name: "",
    quantity: 0,
    image: null,
    category: "",
    status: false,
    is_requires_prescription: false,
    price: 0,
    description: "",
  });

  const openForm = () => {
    setShowForm(true);
  };
  const closeForm = () => {
    setShowForm(false);
    setProductName("");
  };
  const editprod = (product) => {
    setEditingId(product.id);
    setEditions({
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      description: product.description,
      is_requires_prescription: product.is_requires_prescription,
      status: product.status,
      image: product.image,
    });
  };

  const saveEdit = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            ...editions,
          };
        }

        return product;
      }),
    );

    setEditingId(null);

    setEditions({
      name: "",
      quantity: 0,
      image: null,
      category: "",
      status: false,
      is_requires_prescription: false,
      price: 0,
      description: "",
    });
  };

  const addProduct = () => {
    if (!product_name.trim()) {
      return;
    }

    const productData = {
      name: product_name,
    };

    console.log("Product data:", productData);
    const newProduct = {
      id: products.length + 1,
      name: product_name,
      category: "غير محدد",
      price: 0,
    };

    setProducts((prevProducts) => [...prevProducts, newProduct]);
    closeForm();
  };
  const viewProduct = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="prd-div">
      <div className="prd-header">
        المنتجات
        <Button className="ctg-btn" onClick={openForm}>
          منتج جديد +
        </Button>
      </div>
      <div className="search-prd">
        <input type="text" placeholder="بحث عن .." className="search" />
      </div>

      {showForm && (
        <FormModal
          title="إضافة منتج جديد"
          label="اسم المنتج"
          placeholder="أدخل اسم المنتج"
          value={product_name}
          onChange={(e) => setProductName(e.target.value)}
          onSubmit={addProduct}
          onClose={closeForm}
        />
      )}

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
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  {editingId === product.id ? (
                    <input
                      value={editions.name}
                      onChange={(e) =>
                        setEditions({
                          ...editions,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td>
                  {editingId === product.id ? (
                    <input
                      value={editions.image}
                      onChange={(e) =>
                        setEditions({
                          ...editions,
                          image: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="prd-img"
                    />
                  )}
                </td>
                <td>
                  {editingId === product.id ? (
                    <input
                      value={editions.category}
                      onChange={(e) =>
                        setEditions({
                          ...editions,
                          category: e.target.value,
                        })
                      }
                    />
                  ) : (
                    product.category
                  )}
                </td>
                <td>
                  {editingId === product.id ? (
                    <input
                      value={editions.description}
                      onChange={(e) =>
                        setEditions({
                          ...editions,
                          description: e.target.value,
                        })
                      }
                    />
                  ) : (
                    product.description
                  )}
                </td>
                <td>
                  {editingId === product.id ? (
                    <input
                      value={editions.price}
                      onChange={(e) =>
                        setEditions({
                          ...editions,
                          price: e.target.value,
                        })
                      }
                    />
                  ) : (
                    product.price
                  )}
                </td>
                <td>
                  {editingId === product.id ? (
                    <input
                      value={editions.quantity}
                      onChange={(e) =>
                        setEditions({
                          ...editions,
                          quantity: e.target.value,
                        })
                      }
                    />
                  ) : (
                    product.quantity
                  )}
                </td>
                <td>
                  {editingId === product.id ? (
                    <input
                      value={editions.is_requires_prescription}
                      checked={editions.is_requires_prescription}
                      onChange={(e) =>
                        setEditions({
                          ...editions,
                          is_requires_prescription: e.target.checked,
                        })
                      }
                    />
                  ) : product.is_requires_prescription ? (
                    "لا"
                  ) : (
                    " نعم"
                  )}
                </td>
                <td>
                  {editingId === product.id ? (
                    <input
                      value={editions.status}
                      onChange={(e) =>
                        setEditions({
                          ...editions,
                          status: e.target.value,
                        })
                      }
                    />
                  ) : (
                    product.status
                  )}
                </td>
                <td>
                  {editingId === product.id ? (
                    <button
                      className="save-edit"
                      onClick={() => saveEdit(product.id)}
                    >
                      حفظ
                    </button>
                  ) : (
                    <button
                      className="edit-btn"
                      onClick={() => editprod(product)}
                    >
                      ✏️
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="prd-info"
                    onClick={viewProduct(product.id)}
                  >
                    <IoEyeOutline />
                  </button>
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
