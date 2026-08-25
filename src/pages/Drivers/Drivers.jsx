import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import "./Drivers.css";

const USE_DUMMY_DATA = true;

const initialDrivers = [
  {
    delivery_id: 1,
    full_name: "محمد علي",
    phone: "0999999999",
    vehicle_type: "دراجة نارية",
    vehicle_number: "ABC-123",
    availability_status: "available",
  },
  {
    delivery_id: 2,
    full_name: "أحمد خالد",
    phone: "0988888888",
    vehicle_type: "سيارة",
    vehicle_number: "XYZ-456",
    availability_status: "unavailable",
  },
  {
    delivery_id: 3,
    full_name: "سامر حسن",
    phone: "0966778899",
    vehicle_type: "دراجة نارية",
    vehicle_number: "MTR-789",
    availability_status: "available",
  },
];

const Drivers = () => {
  const navigate = useNavigate();

  const [drivers, setDrivers] = useState(USE_DUMMY_DATA ? initialDrivers : []);

  const [editingId, setEditingId] = useState(null);

  const [editions, setEditions] = useState({
    full_name: "",
    phone: "",
    vehicle_type: "",
    vehicle_number: "",
    availability_status: "",
  });

  useEffect(() => {
    if (USE_DUMMY_DATA) return;

    const fetchDrivers = async () => {
      try {
        const response = await axios.get("YOUR_API_URL/deliveries");

        setDrivers(response.data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchDrivers();
  }, []);

  const addHandler = () => {
    navigate("/Pharmacy/home/AddDriver");
  };

  const editDriver = (driver) => {
    setEditingId(driver.delivery_id);

    setEditions({
      full_name: driver.full_name,
      phone: driver.phone,
      vehicle_type: driver.vehicle_type,
      vehicle_number: driver.vehicle_number,
      availability_status: driver.is_available,
    });
  };

  const saveEdit = async (id) => {
    if (USE_DUMMY_DATA) {
      setDrivers((prevDrivers) =>
        prevDrivers.map((driver) =>
          driver.delivery_id === id
            ? {
                ...driver,
                ...editions,
              }
            : driver,
        ),
      );

      setEditingId(null);

      return;
    }

    try {
      const response = await axios.patch(
        `YOUR_API_URL/deliveries/${id}`,
        editions,
      );

      setDrivers((prevDrivers) =>
        prevDrivers.map((driver) =>
          driver.delivery_id === id ? response.data : driver,
        ),
      );

      setEditingId(null);
    } catch (error) {
      console.error("Error updating driver:", error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);

    setEditions({
      full_name: "",
      phone: "",
      vehicle_type: "",
      vehicle_number: "",
      availability_status: "",
    });
  };

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
              <tr key={driver.delivery_id}>
                <td>{driver.delivery_id}</td>

                <td>
                  {editingId === driver.delivery_id ? (
                    <input
                      type="text"
                      value={editions.full_name}
                      onChange={(e) =>
                        setEditions({
                          ...editions,
                          full_name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    driver.full_name
                  )}
                </td>

                <td>
                  {editingId === driver.delivery_id ? (
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
                  {editingId === driver.delivery_id ? (
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
                  {editingId === driver.delivery_id ? (
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
                  {editingId === driver.delivery_id ? (
                    <select
                      value={editions.availability_status}
                      onChange={(e) =>
                        setEditions({
                          ...editions,
                          availability_status: e.target.value,
                        })
                      }
                    >
                      <option value="available">متاح</option>

                      <option value="unavailable">غير متاح</option>
                    </select>
                  ) : driver.availability_status === "available" ? (
                    "متاح"
                  ) : (
                    "غير متاح"
                  )}
                </td>

                <td>
                  {editingId === driver.delivery_id ? (
                    <>
                      <button
                        className="save-edit"
                        onClick={() => saveEdit(driver.delivery_id)}
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
