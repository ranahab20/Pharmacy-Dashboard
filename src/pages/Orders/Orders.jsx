import React from "react";
import "./Orders.css";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const initialOrders = [
  {
    id: 1,
    customer: "أحمد محمد",
    orderDate: "2026-08-10",
    completionDate: "2026-08-10",
    amount: 45000,
    status: "مكتمل",
    deliveryAgent: "محمد علي",
  },
  {
    id: 2,
    customer: "سارة أحمد",
    orderDate: "2026-08-11",
    completionDate: "2026-08-11",
    amount: 75000,
    status: "مكتمل",
    deliveryAgent: "خالد حسن",
  },
  {
    id: 3,
    customer: "ليان خالد",
    orderDate: "2026-08-12",
    completionDate: null,
    amount: 32000,
    status: "قيد التجهيز",
    deliveryAgent: "لم يتم التعيين",
  },
  {
    id: 4,
    customer: "عمر إبراهيم",
    orderDate: "2026-08-12",
    completionDate: null,
    amount: 58000,
    status: "قيد التوصيل",
    deliveryAgent: "أحمد سامر",
  },
  {
    id: 5,
    customer: "نور محمد",
    orderDate: "2026-08-13",
    completionDate: "2026-08-13",
    amount: 27000,
    status: "مكتمل",
    deliveryAgent: "محمد علي",
  },
  {
    id: 6,
    customer: "ريم أحمد",
    orderDate: "2026-08-13",
    completionDate: null,
    amount: 91000,
    status: "قيد التوصيل",
    deliveryAgent: "خالد حسن",
  },
  {
    id: 7,
    customer: "يوسف خالد",
    orderDate: "2026-08-14",
    completionDate: null,
    amount: 15000,
    status: "ملغي",
    deliveryAgent: "لم يتم التعيين",
  },
  {
    id: 8,
    customer: "جنى علي",
    orderDate: "2026-08-14",
    completionDate: "2026-08-14",
    amount: 63000,
    status: "مكتمل",
    deliveryAgent: "أحمد سامر",
  },
];
const Orders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const navigate = useNavigate();
  const viewOrder = (orderId) => {
    navigate(`/Pharmacy/home/orders/${orderId}`);
  };

  return (
    <>
      <div className="ord-div">
        <div className="ord-header">كل الطلبات</div>
        <div className="search-ord">
          <input type="text" placeholder="بحث عن .." className="search" />
        </div>
        <div className="ord-table">
          <table>
            <thead>
              <tr>
                <th>رقم الطلب</th>
                <th>العميل</th>
                <th>تاريخ الطلب</th>
                <th>تاريخ الاكتمال</th>
                <th>المبلغ</th>
                <th>الحالة</th>
                <th>عامل التوصيل</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.orderDate}</td>
                  <td>{order.completionDate}</td>
                  <td>{order.amount}</td>
                  <td className="ord-status">{order.status}</td>
                  <td>{order.deliveryAgent}</td>
                  <td className="">
                    <button
                      className="ord-info"
                      onClick={() => viewOrder(order.id)}
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
    </>
  );
};

export default Orders;
