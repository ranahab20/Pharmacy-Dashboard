import React, { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import { IoPeople } from "react-icons/io5";
import "./Customers.css";
import api from "../../api/axiosInstance";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCustumers, setTotalCustomers] = useState(0);
  const [activeCustomers, setActiveCustomers] = useState(0);
  const [inactiveCustomers, setInactiveCustomers] = useState(0);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const response = await api.get("/customers");

        console.log("customers:", response.data);

        setCustomers(response.data.data);

        setTotalCustomers(response.data.stats.total);
        setActiveCustomers(response.data.stats.active);
        setInactiveCustomers(response.data.stats.inactive);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const deleteCtm = async (id) => {
    try {
      const response = await api.delete(`/customers/${id}`);
      console.log("Delete response:", response.data);
      toast.success(response.data.message);
      setCustomers((prevCustomers) =>
        prevCustomers.map((customer) =>
          customer.id === id
            ? {
                ...customer,
                is_active: false,
              }
            : customer,
        ),
      );
    } catch (error) {
      console.error("Error deleting customer:", error);
      toast.error(error.response?.data?.message);
    }
  };

  if (loading) {
    return <Loading text="جاري تحميل العملاء..." />;
  }
  return (
    <>
      <div className="ctm-div">
        <div className="ctm-header">
          <h3>كل العملاء :</h3>
        </div>
        <div className="ctm-card">
          <Card
            icon={<IoPeople />}
            title="عملاء نشطون "
            className="ctm-card1"
            data={activeCustomers}
          />
          <Card
            icon={<IoPeople />}
            title=" عملاء غير نشطين"
            className="ctm-card2"
            data={inactiveCustomers}
          />
          <Card
            icon={<IoPeople />}
            title="إجمالي العملاء"
            className="ctm-card3"
            data={totalCustumers}
          />
        </div>
        <div className="ctm-table">
          <table>
            <thead>
              <tr>
                <th>رقم العميل</th>
                <th>اسم العميل</th>
                <th>رقم الهاتف</th>
                <th>البريد الإلكتروني</th>
                <th>حالة الحساب</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className={customer.is_active ? "" : "inactive-customer-row"}
                >
                  <td>{customer.id}</td>

                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.email}</td>
                  <td>
                    <span
                      className={
                        customer.is_active === true
                          ? "customer-active"
                          : "customer-inactive"
                      }
                    >
                      {customer.is_active === true ? "نشط" : "غير نشط"}
                    </span>
                  </td>

                  <td>
                    {" "}
                    <button
                      className="delete-btn"
                      onClick={() => deleteCtm(customer.id)}
                      disabled={!customer.is_active}
                    >
                      🗑️
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

export default Customers;
