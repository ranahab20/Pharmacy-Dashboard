import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import "./Drivers.css";
import api from "../../api/axiosInstance";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";

const Drivers = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [drivers, setDrivers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [editions, setEditions] = useState({
    name: "",
    phone: "",
    vehicle_type: "",
    vehicle_number: "",
    is_available: "",
  });

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setLoading(true);
        const response = await api.get("/deliveries");
        console.log("Drivers:", response.data.data);
        setDrivers(response.data.data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  const addHandler = () => {
    navigate("/Pharmacy/home/AddDriver");
  };

  const editDriver = (driver) => {
    setEditingId(driver.id);

    setEditions({
      name: driver.name,
      phone: driver.phone,
      vehicle_type: driver.vehicle_type,
      vehicle_number: driver.vehicle_number,
      is_available: driver.is_available,
    });
  };

  const saveEdit = async (id) => {
    try {
      const response = await api.put(`/deliveries/${id}`, {
        name: editions.name,
        phone: editions.phone,
        vehicle_type: editions.vehicle_type,
        vehicle_number: editions.vehicle_number,
        is_available: editions.is_available,
      });
      console.log("Update driver:", response.data);

      const updatedDriver = response.data.data ?? response.data;

      setDrivers(
        (prevDrivers) =>
          prevDrivers.map((driver) =>
            driver.id === id ? updatedDriver : driver,
          ),
        console.log(updatedDriver),
      );
      toast.success(response.data.message || "تم تعديل بيانات المندوب بنجاح");

      setEditingId(null);
    } catch (error) {
      console.error("Error updating driver:", error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);

    setEditions({
      name: "",
      phone: "",
      vehicle_type: "",
      vehicle_number: "",
      is_available: "",
    });
  };
  if (loading) {
    return <Loading text="جاري تحميل مندوبو التوصيل..." />;
  }
  return (
    <div className="drv-div">
      <div className="drv-header">
        <h3>مندوبو التوصيل :</h3>

        <Button className="ctg-btn" onClick={addHandler}>
          إضافة مندوب جديد +
        </Button>
      </div>

      <div className="search-drv">
        <input type="text" placeholder="بحث عن .." className="search" />
      </div>

      <div className="drv-table">
        <table>
          <thead>
            <tr>
              <th>رقم المندوب</th>
              <th>المندوب</th>
              <th>رقم الهاتف</th>
              <th>نوع المركبة</th>
              <th>رقم المركبة</th>
              <th>حالة التوفر</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id}>
                <td>{driver.id}</td>

                <td>
                  {editingId === driver.id ? (
                    <input
                      type="text"
                      value={editions.name}
                      onChange={(e) =>
                        setEditions({
                          ...editions,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    driver.name
                  )}
                </td>

                <td>
                  {editingId === driver.id ? (
                    <input
                      type="text"
                      value={editions.phone}
                      onChange={(e) =>
                        setEditions({
                          ...editions,
                          phone: e.target.value,
                        })
                      }
                    />
                  ) : (
                    driver.phone
                  )}
                </td>

                <td>
                  {editingId === driver.id ? (
                    <input
                      type="text"
                      value={editions.vehicle_type}
                      onChange={(e) =>
                        setEditions({
                          ...editions,
                          vehicle_type: e.target.value,
                        })
                      }
                    />
                  ) : (
                    driver.vehicle_type
                  )}
                </td>

                <td>
                  {editingId === driver.id ? (
                    <input
                      type="text"
                      value={editions.vehicle_number}
                      onChange={(e) =>
                        setEditions({
                          ...editions,
                          vehicle_number: e.target.value,
                        })
                      }
                    />
                  ) : (
                    driver.vehicle_number
                  )}
                </td>

                <td>
                  {editingId === driver.id ? (
                    <select
                      value={String(editions.is_available)}
                      onChange={(e) =>
                        setEditions({
                          ...editions,
                          is_available: e.target.value === "true",
                        })
                      }
                    >
                      <option value="true">متاح</option>

                      <option value="false">غير متاح</option>
                    </select>
                  ) : driver.is_available ? (
                    "متاح"
                  ) : (
                    "غير متاح"
                  )}
                </td>

                <td>
                  {editingId === driver.id ? (
                    <>
                      <button
                        className="save-edit"
                        onClick={() => saveEdit(driver.id)}
                      >
                        حفظ
                      </button>
                    </>
                  ) : (
                    <button
                      className="edit-btn"
                      onClick={() => editDriver(driver)}
                    >
                      ✏️
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Drivers;
