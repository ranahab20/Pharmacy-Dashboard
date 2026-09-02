import React, { useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./AddDriver.css";
import toast from "react-hot-toast";
import api from "../../api/axiosInstance";


const initialDriverData = {
  name: "",
  phone: "",
  vehicle_type: "",
  vehicle_number: "",
};

const AddDriver = () => {
  const navigate = useNavigate();

  const [DriverData, setDriverData] = useState(initialDriverData);

  const backToDrivers = () => {
    navigate("/Pharmacy/home/drivers");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDriverData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/deliveries", DriverData);

      console.log("Add driver:", response.data.data);

      toast.success(response.data.message || "تمت إضافة المندوب بنجاح");

      setDriverData(initialDriverData);

      navigate("/Pharmacy/home/drivers");
    } catch (error) {
      console.error("Error adding driver:", error);

      toast.error(error.response?.data?.message || "تعذر إضافة المندوب");
    }
  };

  const cancelHandler = () => {
    setDriverData(initialDriverData);
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
            name="name"
            placeholder="أدخل اسم المندوب"
            value={DriverData.name}
            onChange={handleChange}
          />

          <label htmlFor="driverPhone">رقم الهاتف :</label>

          <Input
            type="text"
            id="driverPhone"
            name="phone"
            placeholder="أدخل رقم الهاتف"
            value={DriverData.phone}
            onChange={handleChange}
          />

          <label htmlFor="vehicleType">نوع المركبة :</label>

          <Input
            type="text"
            id="vehicleType"
            name="vehicle_type"
            placeholder="أدخل نوع المركبة"
            value={DriverData.vehicle_type}
            onChange={handleChange}
          />

          <label htmlFor="vehicleNumber">رقم المركبة :</label>

          <Input
            type="text"
            id="vehicleNumber"
            name="vehicle_number"
            placeholder="أدخل رقم المركبة"
            value={DriverData.vehicle_number}
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
