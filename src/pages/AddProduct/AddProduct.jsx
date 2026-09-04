import Button from "../../components/Button/Button";
import "./AddProduct.css";
import Input from "../../components/Input/Input";
import { useNavigate } from "react-router-dom";
import UploadFile from "../../components/UploadFile/UploadFile";
import { FaChevronLeft } from "react-icons/fa";
import api from "../../api/axiosInstance";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";

const initialFormData = {
  name: "",
  category_id: "",
  price: 0,
  quantity: 0,
  is_required_prescription: false,
  description: "",
  indications: "",
  usage_method: "",
  side_effects: "",
  warnings: "",
  image: null,
};
const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);

  // get categories

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        console.log("Categories:", response.data);

        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const backToPrd = () => {
    navigate("/Pharmacy/home/products");
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    console.log(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("category_id", formData.category_id);
      data.append("price", formData.price);
      data.append("quantity", formData.quantity);

      data.append(
        "is_required_prescription",
        formData.is_required_prescription ? "1" : "0",
      );

      data.append("description", formData.description);

      // تفاصيل المنتج
      data.append("details[0][type]", "usage_method");
      data.append("details[0][content]", formData.usage_method);

      data.append("details[1][type]", "indications");
      data.append("details[1][content]", formData.indications);

      data.append("details[2][type]", "side_effects");
      data.append("details[2][content]", formData.side_effects);

      data.append("details[3][type]", "warnings");
      data.append("details[3][content]", formData.warnings);

      if (formData.image) {
        data.append("image", formData.image);
      }

      for (const [key, value] of data.entries()) {
        console.log(key, value);
      }

      const response = await api.post("/products", data);

      console.log("Add Product Response:", response.data);

      toast.success(response.data.message || "تمت إضافة المنتج بنجاح");

      setFormData(initialFormData);

      navigate("/Pharmacy/home/products");
    } catch (error) {
      console.error("Error adding product:", error);

      console.log("Backend response:", error.response?.data);

      toast.error(
        error.response?.data?.message || "حدث خطأ أثناء إضافة المنتج",
      );
    }
  };
  const cancelHandler = () => {
    setFormData(initialFormData);
    navigate("/Pharmacy/home/products");
  };
  return (
    <>
      <div className="add-prd-div">
        <div className="add-prd-header">
          إضافة منتج جديد :
          <Button onClick={backToPrd} className="back-Prd-btn">
            <FaChevronLeft className="chevron-icon-back" />
            عودة للمنتجات
          </Button>
        </div>
        <form onSubmit={submitHandler}>
          <div className="info-add-prd">
            <div className="basic-info-add-prd">
              <h4>معلومات اساسية: ⓘ </h4>
              <label htmlFor="prdName">اسم المنتج :</label>
              <Input
                type="text"
                placeholder="أدخل اسم المنتج"
                id="prdName"
                name="name"
                value={formData.name}
                onChange={handleChange}
              ></Input>
              <label htmlFor="category_id">التصنيف :</label>

              <select
                id="category_id"
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
              >
                <option value="">اختر التصنيف</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {/* <Input
              type="text"
              placeholder="أدخل التصنيف "
              id="prdctg"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
            ></Input> */}
              <label htmlFor="prdName">الوصف :</label>
              <Input
                type="text"
                placeholder="أدخل الوصف"
                id="prddesc"
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></Input>
              <div className="flex-add-prd">
                <div>
                  <label htmlFor="prdName">السعر (ل.س ) :</label>
                  <Input
                    type="number"
                    placeholder="0"
                    id="prdprice"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  ></Input>
                </div>
                <div>
                  <label htmlFor="prdName">الحد الأدنى للكمية :</label>
                  <Input
                    type="number"
                    placeholder="0"
                    id="prdquantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                  ></Input>
                </div>
              </div>
              <div className="check">
                <label htmlFor="prdName">هل يتطلب وصفة:</label>
                <Input
                  type="checkbox"
                  id="is_required_prescription"
                  name="is_required_prescription"
                  checked={formData.is_required_prescription}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <UploadFile
                onFileSelect={(file) =>
                  setFormData((prev) => ({
                    ...prev,
                    image: file,
                  }))
                }
              >
                صورة المنتج :
              </UploadFile>
            </div>
            <div className="description-add-prd">
              <p> وصف وتفاصيل المنتج :</p>
              <div className="flex-desc-add-prd">
                <label htmlFor="prdName">الجرعة وطريقة الاستخدام :</label>
                <Input
                  type="text"
                  placeholder="أدخل الجرعة وطريقة الاستخدام"
                  id="usage_method"
                  name="usage_method"
                  value={formData.usage_method}
                  onChange={handleChange}
                ></Input>
                <label htmlFor="prdName">الاستخدامات :</label>
                <Input
                  type="text"
                  placeholder="أدخل الاستخدامات "
                  id="indications"
                  name="indications"
                  value={formData.indications}
                  onChange={handleChange}
                ></Input>
                <label htmlFor="prdName">الآثار الجانبية :</label>
                <Input
                  type="text"
                  placeholder="أدخل الآثار الجانبية"
                  id="side_effects"
                  name="side_effects"
                  value={formData.side_effects}
                  onChange={handleChange}
                ></Input>
                <label htmlFor="prdName">التحذيرات :</label>
                <Input
                  type="text"
                  placeholder="أدخل التحذيرات"
                  id="warnings"
                  name="warnings"
                  value={formData.warnings}
                  onChange={handleChange}
                ></Input>
              </div>
            </div>
          </div>
          <Button type="submit" className="save-new-prd">
            إضافة المنتج
          </Button>
          <Button
            type="button"
            onClick={cancelHandler}
            className="cancel-new-prd"
          >
            إلغاء
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
