import React, { useState,useEffect } from "react";
import "./Orders.css";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import Loading from "../Loading/Loading";

const statusVar = (order) => {
  return order.status === "pending"
    ? "status-yellow"
    : order.status === "delivered"
      ? "status-green"
      : order.status === "on_delivery"
        ? "status-blue"
        : order.status === "accepted"
          ? "status-g"
          : order.status === "rejected"
            ? "status-red"
            : "";
};

const getStatusLabel = (status) => {
  const labels = {
    pending: "قيد المراجعة",
    accepted: "مقبول",
    rejected: "مرفوض",
    on_delivery: "قيد التوصيل",
    delivered: "مكتمل",
  };

  return labels[status] || status;
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const[loading,setLoading]=useState(true)
  const navigate = useNavigate();

  const viewOrder = (orderId) => {
    navigate(`/Pharmacy/home/orders/${orderId}`);
  };

    useEffect(() => {
      const fetchOrders = async () => {
        try {
          setLoading(true);
          const response = await api.get("/orders?status=pending");

          console.log("Orders:", response.data);

          setOrders(response.data.data);

        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    }, []);
  

  if (loading) {
  return <Loading text="جاري تحميل الطلبات..." />;
}

  return (
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

                <td>{order.user_id}</td>

                <td>{order.assigned_at}</td>

                <td>{order.delivered_at || "-"}</td>

                <td>{order.total_price}</td>

                <td className="ord-status">
                  <span className={statusVar(order)}>
                    {getStatusLabel(order.status)}
                  </span>
                </td>

                <td>{order.delivery_id}</td>

                <td>
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
  );
};

export default Orders;
