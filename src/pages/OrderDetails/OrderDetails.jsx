import React from "react";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const OrderDetails = () => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/Pharmacy/home/orders");
  };
  return (
    <>
      <div className="prd-details-div">
        <div className="prd-details-header">
          <span>تفاصيل المنتج</span>
          <Button className="prd-details-btn" onClick={clickHandler}>
            عودة للطلبات
          </Button>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
