import React, { useState } from "react";
import Card from "../../components/Card/Card";
import { IoPeople } from "react-icons/io5";
import "./Customers.css";

const initialCustomers = [
  {
    user_id: 1,
    full_name: "محمد علي أحمد",
    phone: "0977553366",
    created_at: "2026-05-12",
    created_time: "10:30 ص",
    email: "mohammad@gmail.com",
    status: "active",
  },
  {
    user_id: 2,
    full_name: "سارة محمود",
    phone: "0933445566",
    created_at: "2026-05-14",
    created_time: "09:15 ص",
    email: "sara@gmail.com",
    status: "active",
  },
  {
    user_id: 3,
    full_name: "أحمد خالد",
    phone: "0955667788",
    created_at: "2026-05-18",
    created_time: "01:20 م",
    email: "ahmad@gmail.com",
    status: "inactive",
  },
  {
    user_id: 4,
    full_name: "نور علي",
    phone: "0944778899",
    created_at: "2026-06-02",
    created_time: "11:45 ص",
    email: "nour@gmail.com",
    status: "active",
  },
  {
    user_id: 5,
    full_name: "ليان محمد",
    phone: "0988112233",
    created_at: "2026-06-08",
    created_time: "03:10 م",
    email: "layan@gmail.com",
    status: "inactive",
  },
  {
    user_id: 6,
    full_name: "عمر إبراهيم",
    phone: "0966332211",
    created_at: "2026-06-15",
    created_time: "08:55 ص",
    email: "omar@gmail.com",
    status: "active",
  },
];
const Customers = () => {
  const [customers, setCustomers] = useState(initialCustomers);
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
            data="10"
          />
          <Card
            icon={<IoPeople />}
            title=" عملاء غير نشطين"
            className="ctm-card2"
            data="10"
          />
          <Card
            icon={<IoPeople />}
            title="إجمالي العملاء"
            className="ctm-card3"
            data="10"
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
                <tr key={customer.user_id}>
                  <td>{customer.user_id}</td>

                  <td>{customer.full_name}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.email}</td>
                  <td>
                    <span
                      className={
                        customer.status === "active"
                          ? "customer-active"
                          : "customer-inactive"
                      }
                    >
                      {customer.status === "active" ? "نشط" : "غير نشط"}
                    </span>
                  </td>

                  <td>
                    {" "}
                    <button className="delete-btn">🗑️</button>
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
