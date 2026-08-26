import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../components/Button/Button";

import {
  FaChevronLeft,
  FaMapMarkerAlt,
  FaUser,
  FaTruck,
  FaPrescriptionBottleAlt,
  FaTimes,
} from "react-icons/fa";

import panadol from "../../assets/panadol.png";

import "./OrderDetails.css";

const USE_DUMMY_DATA = true;

const dummyOrder = {
  id: 1,

  status: "pending",

  created_at: "2026-08-22 11:15",

  total: 1600,

  delivery_price: 200,

  customer: {
    id: 1,
    name: "محمد علي أحمد",
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

  // ================================
  // REJECTION MODAL
  // ================================

  const [showRejectModal, setShowRejectModal] = useState(false);

  const [rejectionReason, setRejectionReason] = useState("");

  const rejectionReasons = [
    "الوصفة الطبية غير مطابقة",
    "الوصفة الطبية غير واضحة",

  ];

  // ================================
  // FETCH ORDER
  // ================================

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

  // ================================
  // BACK
  // ================================

  const backToOrders = () => {
    navigate("/Pharmacy/home/orders");
  };

  // ================================
  // UPDATE STATUS
  // ================================

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

  // ================================
  // ACCEPT ORDER
  // ================================

  const acceptOrder = () => {
    updateOrderStatus("accepted");
  };

  // ================================
  // OPEN REJECT MODAL
  // ================================

  const openRejectModal = () => {
    setRejectionReason("");

    setShowRejectModal(true);
  };

  // ================================
  // CANCEL REJECTION
  // ================================

  const cancelReject = () => {
    setShowRejectModal(false);

    setRejectionReason("");

    // لا نغير حالة الطلب
    // ستبقى pending
  };

  // ================================
  // CONFIRM REJECTION
  // ================================

  const confirmReject = async () => {
    if (!rejectionReason) {
      alert("يرجى اختيار سبب الرفض");

      return;
    }

    // Dummy data
    if (USE_DUMMY_DATA) {
      setOrder((prev) => ({
        ...prev,

        status: "rejected",

        rejection_reason: rejectionReason,
      }));

      setShowRejectModal(false);

      setRejectionReason("");

      return;
    }

    // Backend
    try {
      setUpdating(true);

      /*
      const response = await axios.patch(
        `http://localhost:8000/api/orders/${orderId}`,
        {
          status: "rejected",
          rejection_reason: rejectionReason,
        }
      );

      setOrder(response.data);
      */

      setShowRejectModal(false);

      setRejectionReason("");
    } catch (error) {
      console.error("Error rejecting order:", error);
    } finally {
      setUpdating(false);
    }
  };

  // ================================
  // ASSIGN DRIVER
  // ================================

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

  // ================================
  // START DELIVERY
  // ================================

  const startDelivery = () => {
    if (!selectedDriver) {
      alert("يرجى اختيار عامل التوصيل أولاً");

      return;
    }

    updateOrderStatus("on_delivery");
  };

  // ================================
  // COMPLETE ORDER
  // ================================

  const completeOrder = () => {
    updateOrderStatus("delivered");
  };

  // ================================
  // STATUS LABEL
  // ================================

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

  // ================================
  // LOADING
  // ================================

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
    <>
      <div className="order-details-div">
        {/* ================= HEADER ================= */}

        <div className="order-details-header">
          <h3>تفاصيل الطلب :</h3>

          <Button className="order-back-btn" onClick={backToOrders}>
            عودة للطلبات
            <FaChevronLeft />
          </Button>
        </div>

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

                <strong>{order.delivery_price} ل.س</strong>
              </div>

              <div>
                <span>الإجمالي الكلي :</span>

                <strong>{order.total} ل.س</strong>
              </div>

            </div>
          </div>

          {/* ================= SIDE ================= */}

          <div className="order-side-info">
            <div className="order-info-card">
              <h4>
                <FaMapMarkerAlt />
                عنوان التوصيل
              </h4>

              <p>{order.address?.city}</p>

              <p>{order.address?.details}</p>
            </div>

            {/* DRIVER */}

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

            {/* STATUS */}

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
                    onClick={openRejectModal}
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

      {/* ===================================
          REJECTION MODAL
      =================================== */}

      {showRejectModal && (
        <div className="reject-modal-overlay">
          <div className="reject-modal">
            {/* HEADER */}

            <div className="reject-modal-header">
              <div className="reject-title">
                <span className="reject-icon">×</span>

                <h3>رفض الطلب</h3>
              </div>

              <button className="reject-modal-close" onClick={cancelReject}>
                <FaTimes />
              </button>
            </div>

            {/* BODY */}

            <div className="reject-modal-body">
              <p className="reject-description">
                يرجى اختيار سبب الرفض قبل إرسال القرار
              </p>

              <label htmlFor="rejectionReason">
                سبب الرفض
                <span className="required-star">*</span>
              </label>

              <select
                id="rejectionReason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="reject-reason-select"
              >
                <option value="">اختر سبب الرفض</option>

                {rejectionReasons.map((rejection_reason, index) => (
                  <option key={index} value={rejection_reason}>
                    {rejection_reason}
                  </option>
                ))}
              </select>
            </div>

            {/* ACTIONS */}

            <div className="reject-modal-actions">
              <button
                type="button"
                className="reject-send-btn"
                onClick={confirmReject}
                disabled={!rejectionReason || updating}
              >
                {updating ? "جاري الإرسال..." : "إرسال"}
              </button>

              <button
                type="button"
                className="reject-cancel-btn"
                onClick={cancelReject}
              >
                إلغاء
              </button>
            </div>

            {/* NOTE */}

            <div className="reject-modal-note">
              <p>عند الإلغاء سيتم إغلاق النافذة وسيبقى الطلب بحالته الحالية.</p>

              <p className="reject-warning">
                عند إرسال الطلب سيتم تغيير حالته إلى مرفوض.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
