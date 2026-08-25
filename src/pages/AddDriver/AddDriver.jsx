import React, { useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./AddDriver.css";

const initialFormData = {
  full_name: "",
  phone: "",
  vehicle_type: "",
  vehicle_number: "",
};

const AddDriver = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);

  const backToDrivers = () => {
    navigate("/Pharmacy/home/drivers");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    console.log("Driver data:", formData);

    // لاحقاً عند الربط مع Backend:
    // await axios.post("API_URL/deliveries", formData);

    // مؤقتاً بعد الحفظ نفرغ الحقول
    setFormData(initialFormData);
  };

  const cancelHandler = () => {
    setFormData(initialFormData);
  };

  return (
    <div className="add-prd-div">
      <div className="add-prd-header">
        <h3>إضافة مندوب جديد :</h3>

        <Button type="button" onClick={backToDrivers} className="back-Prd-btn">
          <FaChevronLeft className="chevron-icon-back" />
          عودة للمندوبين
        </Button>
      </div>

      <form onSubmit={submitHandler}>
        <div className="add-driver-div">
          <h4>معلومات أساسية: ⓘ</h4>

          <label htmlFor="driverName">اسم المندوب :</label>

          <Input
            type="text"
            id="driverName"
            name="full_name"
            placeholder="أدخل اسم المندوب"
            value={formData.full_name}
            onChange={handleChange}
          />

          <label htmlFor="driverPhone">رقم الهاتف :</label>

          <Input
            type="text"
            id="driverPhone"
            name="phone"
            placeholder="أدخل رقم الهاتف"
            value={formData.phone}
            onChange={handleChange}
          />

          <label htmlFor="vehicleType">نوع المركبة :</label>

          <Input
            type="text"
            id="vehicleType"
            name="vehicle_type"
            placeholder="أدخل نوع المركبة"
            value={formData.vehicle_type}
            onChange={handleChange}
          />

          <label htmlFor="vehicleNumber">رقم المركبة :</label>

          <Input
            type="text"
            id="vehicleNumber"
            name="vehicle_number"
            placeholder="أدخل رقم المركبة"
            value={formData.vehicle_number}
            onChange={handleChange}
          />
        </div>

        <div className="add-driver-actions">
          <Button type="submit" className="save-new-prd">
            إضافة مندوب
          </Button>

          <Button
            type="button"
            onClick={cancelHandler}
            className="cancel-new-prd"
          >
            إلغاء
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddDriver;
