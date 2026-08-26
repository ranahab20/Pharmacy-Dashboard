import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../components/Button/Button";

import {
  FaChevronLeft,
  FaMapMarkerAlt,
  FaUser,
  FaTruck,
  FaPrescriptionBottleAlt,
} from "react-icons/fa";
import panadol from "../../assets/panadol.png";
import "./OrderDetails.css";

const USE_DUMMY_DATA = true;

const dummyOrder = {
  id: 1,
  status: "pending",
  created_at: "2026-08-22 11:15",
  total: 1600,
  customer: {
    id: 1,
    name: "محمد علي أحمد",
    delivery_price: 200,
  },

  delivery_agent: {
    id: 2,
    name: "محمد علي",
  },

  delivery_id: 2,

  address: {
    city: "الحمدانية",
    details: "أمام جامع الصديق",
  },

  prescription: {
    image: panadol,
  },

  products: [
    {
      id: 1,
      name: "Panadol",
      image: panadol,
      price: 656,
      quantity: 1,
      subtotal: 656,
      requires_prescription: false,
    },

    {
      id: 2,
      name: "Panadol Extra",
      image: panadol,
      price: 250,
      quantity: 2,
      subtotal: 500,
      requires_prescription: true,
    },

    {
      id: 3,
      name: "Panadol Cold",
      image: panadol,
      price: 148,
      quantity: 3,
      subtotal: 444,
      requires_prescription: false,
    },
  ],
};

const dummyDrivers = [
  {
    id: 1,
    name: "أحمد محمد",
  },

  {
    id: 2,
    name: "محمد علي",
  },

  {
    id: 3,
    name: "خالد حسن",
  },
];

const OrderDetails = () => {
  const { orderId } = useParams();

  const navigate = useNavigate();

  const [order, setOrder] = useState(USE_DUMMY_DATA ? dummyOrder : null);

  const [drivers, setDrivers] = useState(USE_DUMMY_DATA ? dummyDrivers : []);

  const [selectedDriver, setSelectedDriver] = useState(
    dummyOrder.delivery_id ? String(dummyOrder.delivery_id) : "",
  );

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [updating, setUpdating] = useState(false);

  //  Fetch Order Later

  useEffect(() => {
    if (USE_DUMMY_DATA) {
      return;
    }

    const fetchOrder = async () => {
      try {
        setLoading(true);

        /*
        const response = await axios.get(
          `http://localhost:8000/api/orders/${orderId}`
        );

        setOrder(response.data);
        */
      } catch (error) {
        console.error(error);

        setError("حدث خطأ أثناء جلب تفاصيل الطلب");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const backToOrders = () => {
    navigate("/Pharmacy/home/orders");
  };

  const updateOrderStatus = async (newStatus) => {
    if (USE_DUMMY_DATA) {
      setOrder((prev) => ({
        ...prev,
        status: newStatus,
      }));

      return;
    }

    try {
      setUpdating(true);

      /*
      const response = await axios.patch(
        `http://localhost:8000/api/orders/${orderId}`,
        {
          status: newStatus,
        }
      );

      setOrder(response.data);
      */
    } catch (error) {
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  const acceptOrder = () => {
    updateOrderStatus("accepted");
  };

  const rejectOrder = () => {
    updateOrderStatus("rejected");
  };

  const assignDriver = () => {
    if (!selectedDriver) {
      alert("يرجى اختيار عامل التوصيل");

      return;
    }

    const driver = drivers.find((item) => item.id === Number(selectedDriver));

    setOrder((prev) => ({
      ...prev,

      delivery_id: Number(selectedDriver),

      delivery_agent: driver,
    }));
  };

  /* =========================
     Start Delivery
  ========================= */

  const startDelivery = () => {
    if (!selectedDriver) {
      alert("يرجى اختيار عامل التوصيل أولاً");

      return;
    }

    updateOrderStatus("on_delivery");
  };

  /* =========================
     Complete Order
  ========================= */

  const completeOrder = () => {
    updateOrderStatus("delivered");
  };

  /* =========================
     Arabic Status
  ========================= */

  const getStatusLabel = (status) => {
    switch (status) {
      case "pending":
        return "قيد المراجعة";

      case "accepted":
        return "مقبول";

      case "rejected":
        return "مرفوض";

      case "on_delivery":
        return "قيد التوصيل";

      case "delivered":
        return "تم التسليم";

      default:
        return status;
    }
  };

  /* =========================
     Loading
  ========================= */

  if (loading) {
    return <div className="order-message">جاري تحميل تفاصيل الطلب...</div>;
  }

  if (error) {
    return <div className="order-message error">{error}</div>;
  }

  if (!order) {
    return <div className="order-message">الطلب غير موجود</div>;
  }

  return (
    <div className="order-details-div">
      {/* ================= HEADER ================= */}

      <div className="order-details-header">
        <h3>تفاصيل الطلب :</h3>

        <Button className="order-back-btn" onClick={backToOrders}>
          عودة للطلبات
          <FaChevronLeft />
        </Button>
      </div>

      {/* ================= ACTIONS ================= */}

      {/* <div className="order-top-actions">
        <Button className="edit-order-btn">تعديل الطلب</Button>

        <Button className="delete-order-btn">حذف الطلب</Button>
      </div> */}

      {/* ================= SUMMARY ================= */}

      <div className="order-summary-card">
        <div className="order-main-info">
          <h3>رقم الطلب: {order.id}</h3>

          <span className={`order-status status-${order.status}`}>
            {getStatusLabel(order.status)}
          </span>

          <p>{order.created_at}</p>
        </div>

        <div className="summary-item">
          <div className="summary-title">
            <FaUser />
            العميل
          </div>

          <strong>{order.customer?.name}</strong>
        </div>

        <div className="summary-item">
          <div className="summary-title">
            <FaTruck />
            عامل التوصيل
          </div>

          <strong>{order.delivery_agent?.name || "لم يتم التعيين"}</strong>
        </div>

        <div className="summary-item">
          <div className="summary-title">
            <FaPrescriptionBottleAlt />
            يتطلب وصفة
          </div>

          <strong className={order.prescription ? "requires-rx" : "no-rx"}>
            {order.prescription ? "نعم" : "لا"}
          </strong>
        </div>
      </div>

      {/* ================= MAIN ================= */}

      <div className="order-content">
        {/* PRODUCTS */}

        <div className="order-products">
          <div className="products-title">
            المنتجات المطلوبة
            <span>({order.products.length})</span>
          </div>

          <table>
            <thead>
              <tr>
                <th>المنتج</th>
                <th>السعر</th>
                <th>الكمية</th>
                <th>الإجمالي</th>
                <th>يتطلب وصفة</th>
              </tr>
            </thead>

            <tbody>
              {order.products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="order-product">
                      <img src={product.image} alt={product.name} />

                      <span>{product.name}</span>
                    </div>
                  </td>

                  <td>{product.price} ل.س</td>

                  <td>{product.quantity}</td>

                  <td>{product.subtotal} ل.س</td>

                  <td
                    className={
                      product.requires_prescription ? "requires-rx" : "no-rx"
                    }
                  >
                    {product.requires_prescription ? "نعم" : "لا"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="order-total">
            <div>
              <span>سعر التوصيل :</span>
              <strong>{order.tax}</strong>
            </div>
            <div>
              <span>الإجمالي الكلي:</span>

              <strong>{order.total} ل.س</strong>
            </div>
          </div>
        </div>

        {/* ================= SIDE INFO ================= */}

        <div className="order-side-info">
          <div className="order-info-card">
            <h4>
              <FaMapMarkerAlt />
              عنوان التوصيل
            </h4>

            <p>{order.address?.city}</p>

            <p>{order.address?.details}</p>
          </div>

          {/* ================= DRIVER ================= */}

          {order.status === "accepted" && (
            <div className="order-info-card">
              <h4>
                <FaTruck />
                عامل التوصيل
              </h4>

              <select
                className="driver-select"
                value={selectedDriver}
                onChange={(e) => setSelectedDriver(e.target.value)}
              >
                <option value="">اختر عامل التوصيل</option>

                {drivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.name}
                  </option>
                ))}
              </select>

              <Button className="assign-driver-btn" onClick={assignDriver}>
                تعيين العامل
              </Button>
            </div>
          )}

          {/* ================= STATUS ================= */}

          <div className="order-info-card">
            <h4>تحديث حالة الطلب</h4>

            <div className="status-list">
              <div>
                <span className="dot pending-dot"></span>
                قيد المراجعة
              </div>

              <div>
                <span className="dot accepted-dot"></span>
                مقبول
              </div>

              <div>
                <span className="dot delivery-dot"></span>
                قيد التوصيل
              </div>

              <div>
                <span className="dot delivered-dot"></span>
                تم التسليم
              </div>

              <div>
                <span className="dot rejected-dot"></span>
                مرفوض
              </div>
            </div>

            {order.status === "accepted" && (
              <Button className="update-status-btn" onClick={startDelivery}>
                بدء التوصيل
              </Button>
            )}

            {order.status === "on_delivery" && (
              <Button className="update-status-btn" onClick={completeOrder}>
                تأكيد التسليم
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* ================= PRESCRIPTION ================= */}

      {order.prescription && (
        <div className="prescription-review">
          <h3>مراجعة الوصفة الطبية</h3>

          <div className="prescription-content">
            <img
              src={order.prescription.image}
              alt="الوصفة الطبية"
              className="prescription-image"
            />

            {order.status === "pending" && (
              <div className="prescription-actions">
                <button
                  className="accept-order-btn"
                  onClick={acceptOrder}
                  disabled={updating}
                >
                  قبول الطلب
                </button>

                <button
                  className="reject-order-btn"
                  onClick={rejectOrder}
                  disabled={updating}
                >
                  رفض الطلب
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
