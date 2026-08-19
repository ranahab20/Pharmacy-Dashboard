import React, { useState } from "react";
import Button from "../../components/Button/Button";
import "./AddProduct.css";
import Input from "../../components/Input/Input";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: 0,
    minQuantity: 0,
    requiresPrescription: false,
    description: "",
    dosage: "",
    uses: "",
    sideEffects: "",
    warnings: "",
    image: null,
  });
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
  return (
    <>
      <div className="add-prd-div">
        <div className="add-prd-header">
          إضافة منتج جديد :<Button onClick={backToPrd}>عودة للمنتجات</Button>
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
              onChange={handleChange}
            ></Input>
            <label htmlFor="prdName">التصنيف :</label>
            <Input
              type="text"
              placeholder="أدخل التصنيف "
              id="prdctg"
              name="category_id"
              onChange={handleChange}
            ></Input>
            <label htmlFor="prdName">الوصف :</label>
            <Input
              type="text"
              placeholder="أدخل الوصف"
              id="prddesc"
              name="description "
              onChange={handleChange}
            ></Input>
            <div className="flex-add-prd">
              <div>
                <label htmlFor="prdName">السعر (ل.س ) :</label>
                <Input
                  type="number"
                  placeholder="0"
                  id="prdprice"
                  name="price "
                  onChange={handleChange}
                ></Input>
              </div>
              <div>
                <label htmlFor="prdName">الحد الأدنى للكمية :</label>
                <Input
                  type="text"
                  placeholder="0"
                  id="prdquantity"
                  name="quantity   "
                  onChange={handleChange}
                ></Input>
              </div>
            </div>
            <div className="check">
              <label htmlFor="prdName">هل يتطلب وصفة:</label>
              <Input
                type="checkbox"
                placeholder=""
                id="prdquantity"
                name="quantity   "
                onChange={handleChange}
              ></Input>
            </div>
          </div>

          <div className="img-add-prd"></div>
          <div className="description-add-prd"></div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
