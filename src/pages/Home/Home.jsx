import React, { useEffect, useState } from "react";
import "./Home.css";
import Card from "../../components/Card/Card";
import { IoPeople } from "react-icons/io5";
import { GiMedicines } from "react-icons/gi";
import { FaClipboardList } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import ProductPieChart from "../../components/ProductPieChart/ProductPieChart";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import SalesBarChart from "../../components/SalesBarChart/SalesBarChart";
import api from "../../api/axiosInstance";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    today_orders: 0,
    total_orders: 0,
    available_products: 0,
    customers_count: 0,
    sales_last_7_days: [],
    top_products: [],
  });

  useEffect(() => {
    const fetchHome = async () => {
      try {
        setLoading(true);
        const response = await api.get("/dashboard");
        console.log("Cards", response.data);
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHome();
  }, []);
  return (
    <>
      <div className="container-home">
        <header className="title">
          <h3>أهلاً بك عزيزي الصيدلي أحمد ,</h3>
          <h3>لنخبرك بعملك اليوم</h3>
        </header>
        <div className="card-div">
          <Card
            title="العملاء"
            data={dashboardData.customers_count}
            icon={<IoPeople />}
            className="crd1"
          >
            <ResponsiveContainer width="100%" height="100%">
          
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#d9a400"
                  fill="#f4df91"
                  strokeWidth={2}
                />
              
            </ResponsiveContainer>
          </Card>
          <Card
            title="الأدوية المتوفرة"
            data={dashboardData.available_products}
            icon={<GiMedicines />}
            className="crd2"
          >
            <ResponsiveContainer width="100%" height="100%">
              
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#d62c2c"
                  fill="#d58383"
                  strokeWidth={2}
                />
              
            </ResponsiveContainer>
          </Card>
          <Card
            title="إجمالي الطلبات"
            data={dashboardData.total_orders}
            icon={<FaClipboardList />}
            className="crd3"
          >
            <ResponsiveContainer width="100%" height="100%">
             
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="rgb(65, 227, 242)"
                  fill="rgb(150, 230, 239)"
                  strokeWidth={2}
                />
              
            </ResponsiveContainer>
          </Card>
          <Card
            title="إجمالي الطلبات المكتملة"
            data={dashboardData.today_orders}
            icon={<GiMoneyStack />}
            className="crd4"
          >
            <ResponsiveContainer width="100%" height="100%">
             
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="rgb(12, 147, 53)"
                  fill="rgb(115, 168, 131)"
                  strokeWidth={2}
                />
              
            </ResponsiveContainer>
          </Card>
        </div>
        <div className="buttom-section">
          <div className="piechart">
            <ProductPieChart data={dashboardData.top_products} />
          </div>
          <div className="barchart">
            <SalesBarChart  data={dashboardData.sales_last_7_days} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
