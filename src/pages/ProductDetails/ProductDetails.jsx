import React from 'react';
import { useNavigate } from "react-router-dom";
import Button from '../../components/Button/Button';
import './ProductDetails.css'

const ProductDetails = () => {
    const navigate = useNavigate();
 const clickHandler=()=>{
    navigate('/Pharmacy/home/products')
 }
  return (
    <>
    <div className="prd-details-div">
        <div className="prd-details-header">
            تفاصيل المنتج
            <Button className="prd-details-btn" onClick={clickHandler} >عودة للمنتجات</Button>
        </div>
        <div className='prd-summary-card'>
            <div className="prd-image-box">

            </div>
            <div className="prd-basic-info">

            </div>
            <div className="prd-status">

            </div>
            <div className="prd-info-item">

            </div>
            <div className="prd-info-item">

            </div>
            <div className="prd-info-item">

            </div>

        </div>
        <div className='prd-description'>

        </div>
    </div>
    </>
  )
}

export default ProductDetails
