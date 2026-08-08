import React from "react";
import "./Home.css";
import Card from "../../components/Card/Card";
import { IoPeople } from "react-icons/io5";
import { GiMedicines } from "react-icons/gi";
import { FaClipboardList } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import ProductPieChart from "../../components/ProductPieChart/ProductPieChart";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import SalesBarChart from "../../components/SalesBarChart/SalesBarChart";

const Home = () => {
  const customersData = [
    { value: 120 },
    { value: 140 },
    { value: 130 },
    { value: 170 },
    { value: 190 },
    { value: 220 },
    { value: 247 },
  ];
  return (
    <>
      <div className="container-home">
        <header className="title">
          <h3>أهلاً بك عزيزي الصيدلي أحمد ,</h3>
          <h3>لنخبرك بعملك اليوم</h3>
        </header>
        <div className="card-div">
          <Card title="العملاء" data="247" icon={<IoPeople />} className="crd1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={customersData}>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#d9a400"
                  fill="#f4df91"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
          <Card
            title="الأدوية المتوفرة"
            data="247"
            icon={<GiMedicines />}
            className="crd2"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={customersData}>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#d62c2c"
                  fill="#d58383"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
          <Card
            title="إجمالي الطلبات"
            data="247"
            icon={<FaClipboardList />}
            className="crd3"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={customersData}>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="rgb(65, 227, 242)"
                  fill="rgb(150, 230, 239)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
          <Card
            title="طلبات اليوم"
            data="247"
            icon={<GiMoneyStack />}
            className="crd4"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={customersData}>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="rgb(12, 147, 53)"
                  fill="rgb(115, 168, 131)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>
        <div className="buttom-section">
          <div className="piechart">
            <ProductPieChart/>
          </div>
          <div className="barchart">
            <SalesBarChart/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
