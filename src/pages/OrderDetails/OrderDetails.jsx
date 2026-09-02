import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Button from "../../components/Button/Button";
import Loading from "../Loading/Loading";

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

import api from "../../api/axiosInstance";

const OrderDetails = () => {
  const { order_id } = useParams();

  const navigate = useNavigate();

  /* =========================================
     STATES
  ========================================= */

  const [order, setOrder] = useState(null);

  const [drivers, setDrivers] = useState([]);

  const [selectedDriver, setSelectedDriver] = useState("");

  /*
    هذا الـ state يعني أن المستخدم
    اختار سائقاً وضغط "تعيين العامل"

    لكنه لم يُرسل للباك بعد.
  */
  const [driverReady, setDriverReady] = useState(false);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [updating, setUpdating] = useState(false);

  /* =========================================
     REJECTION MODAL
  ========================================= */

  const [showRejectModal, setShowRejectModal] = useState(false);

  const [rejectionReason, setRejectionReason] = useState("");

  const rejectionReasons = [
    {
      value: "prescription_mismatch",
      label: "الوصفة الطبية غير مطابقة",
    },
  ];

  /* =========================================
     FETCH ORDER
  ========================================= */

  const fetchOrder = async () => {
    try {
      setLoading(true);

      setError("");

      const response = await api.get(`/orders/${order_id}`);

      console.log("Order Details:", response.data.data);

      const orderData = response.data.data;

      setOrder(orderData);

      /*
        إذا كان الطلب لديه سائق
        من قبل، نخزن id الخاص به.
      */

      if (orderData.delivery_id) {
        setSelectedDriver(String(orderData.delivery_id));
      }
    } catch (error) {
      console.error("Error fetching order:", error);

      setError(
        error.response?.data?.message || "حدث خطأ أثناء جلب تفاصيل الطلب",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [order_id]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await api.get("/deliveries");

        console.log("Drivers:", response.data.data);

        // نعرض فقط السائقين المتاحين
        const availableDrivers = response.data.data.filter(
          (driver) => driver.is_available,
        );

        setDrivers(availableDrivers);
      } catch (error) {
        console.error("Error fetching drivers:", error);

        toast.error(
          error.response?.data?.message || "تعذر تحميل مندوبي التوصيل",
        );
      }
    };

    fetchDrivers();
  }, []);

  /* =========================================
     BACK
  ========================================= */

  const backToOrders = () => {
    navigate("/Pharmacy/home/orders");
  };

  /* =========================================
     ACCEPT ORDER
     POST /orders/:id/accept
  ========================================= */

  const acceptOrder = async () => {
    try {
      setUpdating(true);

      const response = await api.post(`/orders/${order_id}/accept`);

      console.log("Accept response:", response.data);

      toast.success(response.data.message || "تم قبول الطلب بنجاح");

      /*
        نجلب الطلب من جديد
        للحصول على status = accepted
      */

      await fetchOrder();
    } catch (error) {
      console.error("Error accepting order:", error);

      toast.error(error.response?.data?.message || "حدث خطأ أثناء قبول الطلب");
    } finally {
      setUpdating(false);
    }
  };

  /* =========================================
     OPEN REJECT MODAL
  ========================================= */

  const openRejectModal = () => {
    setRejectionReason("");

    setShowRejectModal(true);
  };

  /* =========================================
     CANCEL REJECT
  ========================================= */

  const cancelReject = () => {
    setShowRejectModal(false);

    setRejectionReason("");
  };

  /* =========================================
     REJECT ORDER
     POST /orders/:id/reject
  ========================================= */

  const confirmReject = async () => {
    if (!rejectionReason) {
      toast.error("يرجى اختيار سبب الرفض");

      return;
    }

    try {
      setUpdating(true);

      const response = await api.post(`/orders/${order_id}/reject`, {
        rejection_reason: rejectionReason,
      });

      console.log("Reject response:", response.data);

      toast.success(response.data.message || "تم رفض الطلب بنجاح");

      setShowRejectModal(false);

      setRejectionReason("");

      /*
        نجلب الطلب بعد الرفض
        حتى تصبح الحالة rejected
      */

      await fetchOrder();
    } catch (error) {
      console.error("Error rejecting order:", error);

      toast.error(error.response?.data?.message || "حدث خطأ أثناء رفض الطلب");
    } finally {
      setUpdating(false);
    }
  };

  /* =========================================
     PRESCRIPTION
  ========================================= */

  const hasPrescription = Boolean(
    order?.prescription_id || order?.prescription,
  );

  /* =========================================
     SELECT DRIVER LOCALLY
  ========================================= */

  const assignDriver = () => {
    if (!selectedDriver) {
      toast.error("يرجى اختيار عامل التوصيل");

      return;
    }

    /*
      لا نرسل API هنا.

      فقط نقول إن المستخدم
      أكد اختيار السائق.
    */

    setDriverReady(true);

    toast.success("تم اختيار عامل التوصيل");
  };

  /* =========================================
     START DELIVERY

     هنا نستدعي:
     POST /orders/:id/assign-delivery
  ========================================= */

  const startDelivery = async () => {
    if (!selectedDriver) {
      toast.error("يرجى اختيار عامل التوصيل أولاً");

      return;
    }

    try {
      setUpdating(true);

      const response = await api.post(`/orders/${order_id}/assign-delivery`, {
        delivery_id: Number(selectedDriver),
      });

      console.log("Assign Delivery Response:", response.data);

      toast.success(response.data.message || "تم بدء التوصيل بنجاح");

      /*
        بعد نجاح assign-delivery
        نعيد جلب الطلب.

        الباك يجب أن يعيد الحالة
        الجديدة on_delivery.
      */

      await fetchOrder();

      setDriverReady(false);
    } catch (error) {
      console.error("Error assigning delivery:", error);

      toast.error(error.response?.data?.message || "تعذر بدء التوصيل");
    } finally {
      setUpdating(false);
    }
  };

  /* =========================================
     MARK DELIVERED

     POST /orders/:id/mark-delivered
  ========================================= */

  const completeOrder = async () => {
    try {
      setUpdating(true);

      const response = await api.post(`/orders/${order_id}/mark-delivered`);

      console.log("Mark delivered response:", response.data);

      toast.success(response.data.message || "تم تأكيد تسليم الطلب");

      /*
        تحديث الطلب بعد التسليم
      */

      await fetchOrder();
    } catch (error) {
      console.error("Error marking delivered:", error);

      toast.error(error.response?.data?.message || "تعذر تأكيد تسليم الطلب");
    } finally {
      setUpdating(false);
    }
  };

  /* =========================================
     STATUS LABEL
  ========================================= */

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

  /* =========================================
     LOADING / ERROR
  ========================================= */

  if (loading) {
    return <Loading text="جاري تحميل تفاصيل الطلب..." />;
  }

  if (error) {
    return <div className="order-message error">{error}</div>;
  }

  if (!order) {
    return <div className="order-message">الطلب غير موجود</div>;
  }

  /* =========================================
     هل يمكن بدء التوصيل؟
  ========================================= */

  /*
    بدون وصفة:
    pending + تم اختيار سائق

    مع وصفة:
    accepted + تم اختيار سائق
  */

  const canStartDelivery =
    driverReady &&
    ((!hasPrescription && order.status === "pending") ||
      (hasPrescription && order.status === "accepted"));

  /* =========================================
     UI
  ========================================= */

  return (
    <>
      <div className="order-details-div">
        <div className="order-details-header">
          <h3>تفاصيل الطلب :</h3>

          <Button className="order-back-btn" onClick={backToOrders}>
            عودة للطلبات
            <FaChevronLeft />
          </Button>
        </div>

        <div className="order-summary-card">
          <div className="order-main-info">
            <h3>رقم الطلب: {order.id}</h3>

            <span className={`order-status status-${order.status}`}>
              {getStatusLabel(order.status)}
            </span>

            <p>
              {order.created_at
                ? new Date(order.created_at).toLocaleString("ar")
                : "-"}
            </p>
          </div>

          <div className="summary-item">
            <div className="summary-title">
              <FaUser />
              العميل
            </div>

            <strong>{order.user?.name || "-"}</strong>
          </div>

          <div className="summary-item">
            <div className="summary-title">
              <FaTruck />
              عامل التوصيل
            </div>

            <strong>
              {order.delivery
                ? `مندوب #${order.delivery.id}`
                : "لم يتم التعيين"}
            </strong>
          </div>

          <div className="summary-item">
            <div className="summary-title">
              <FaPrescriptionBottleAlt />
              يتطلب وصفة
            </div>

            <strong className={hasPrescription ? "requires-rx" : "no-rx"}>
              {hasPrescription ? "نعم" : "لا"}
            </strong>
          </div>
        </div>

        <div className="order-content">
          <div className="order-products">
            <div className="products-title">المنتجات المطلوبة</div>

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
                {order.order_items?.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="order-product">
                        <img
                          src={item.product?.image_url || panadol}
                          alt={item.product?.name || "صورة المنتج"}
                        />

                        <span>
                          {item.product?.name || `منتج #${item.product_id}`}
                        </span>
                      </div>
                    </td>

                    <td>{item.price} ل.س</td>

                    <td>{item.quantity}</td>

                    <td>
                      {(Number(item.price) * Number(item.quantity)).toFixed(2)}{" "}
                      ل.س
                    </td>

                    <td
                      className={
                        item.product?.is_required_prescription
                          ? "requires-rx"
                          : "no-rx"
                      }
                    >
                      {item.product?.is_required_prescription ? "نعم" : "لا"}
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

                <strong>{order.total_price} ل.س</strong>
              </div>
            </div>
          </div>

          <div className="order-side-info">
            <div className="order-info-card">
              <h4>
                <FaMapMarkerAlt />
                عنوان التوصيل
              </h4>

              <p>{order.address || "-"}</p>
            </div>

            {(order.status === "pending" || order.status === "accepted") && (
              <div className="order-info-card">
                <h4>
                  <FaTruck />
                  عامل التوصيل
                </h4>

                <select
                  className="driver-select"
                  value={selectedDriver}
                  onChange={(e) => {
                    setSelectedDriver(e.target.value);

                    /*
                      إذا غيّر المستخدم السائق
                      بعد تأكيده، نعيد
                      driverReady إلى false.
                    */

                    setDriverReady(false);
                  }}
                >
                  <option value="">اختر عامل التوصيل</option>

                  {drivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name}
                    </option>
                  ))}
                </select>

                <Button
                  className="assign-driver-btn"
                  onClick={assignDriver}
                  disabled={!selectedDriver || updating}
                >
                  تعيين العامل
                </Button>
              </div>
            )}

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

              {canStartDelivery && (
                <Button
                  className="update-status-btn"
                  onClick={startDelivery}
                  disabled={updating}
                >
                  {updating ? "جاري بدء التوصيل..." : "بدء التوصيل"}
                </Button>
              )}

              {order.status === "on_delivery" && (
                <Button
                  className="update-status-btn"
                  onClick={completeOrder}
                  disabled={updating}
                >
                  {updating ? "جاري التأكيد..." : "تأكيد التسليم"}
                </Button>
              )}
            </div>
          </div>
        </div>

        {hasPrescription && (
          <div className="prescription-review">
            <h3>مراجعة الوصفة الطبية</h3>

            <div className="prescription-content">
              {order.prescription?.image_url && (
                <img
                  src={order.prescription.image_url}
                  alt="الوصفة الطبية"
                  className="prescription-image"
                />
              )}

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

      {/* =========================================
          REJECTION MODAL
      ========================================= */}

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

                {rejectionReasons.map((reason) => (
                  <option key={reason.value} value={reason.value}>
                    {reason.label}
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
