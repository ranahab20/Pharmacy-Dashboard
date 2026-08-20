import React, { useState } from "react";
import Button from "../../components/Button/Button";
import "./AddProduct.css";
import Input from "../../components/Input/Input";
import { useNavigate } from "react-router-dom";
import UploadFile from "../../components/UploadFile/UploadFile";
import { FaChevronLeft } from "react-icons/fa";

const initialFormData={
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
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
    
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
    console.log(formData);
    // هنا سترسلين البيانات إلى Backend
  };
 const cancelHandler=()=>{
     setFormData(initialFormData);
 }
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
            <label htmlFor="prdName">التصنيف :</label>
            <Input
              type="text"
              placeholder="أدخل التصنيف "
              id="prdctg"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
            ></Input>
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
                  type="text"
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
                placeholder=""
                id="is_required_prescription"
                name="is_required_prescription"
                value={formData.is_required_prescription}
                onChange={handleChange}
              ></Input>
            </div>
          </div>

          <div>
            <UploadFile>صورة المنتج :</UploadFile>
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
        <Button type='submit'onSubmit={submitHandler} className="save-new-prd">
          إضافة المنتج
        </Button>
        <Button type='button' onClick={cancelHandler} className="cancel-new-prd">
          إلغاء
        </Button>
      </div>
    </>
  );
};

export default AddProduct;
