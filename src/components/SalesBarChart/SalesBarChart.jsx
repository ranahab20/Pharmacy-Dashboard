import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./SalesBarChart.css";

const SalesBarChart = ({ data = [] }) => {
  const salesData = data.map((item) => ({
    day: new Date(`${item.date}T00:00:00`).toLocaleDateString("ar", {
      weekday: "long",
    }),

    sales: Number(item.quantity),
  }));

  console.log("Sales chart data:", salesData);

  return (
    <div className="sales-chart">
      <h3>المبيعات خلال آخر 7 أيام</h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={salesData}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis dataKey="day" tick={{ fontSize: 12 }} />

          <YAxis tick={{ fontSize: 12 }} />

          <Tooltip />

          <Bar
            dataKey="sales"
            fill="#2f4563"
            radius={[6, 6, 0, 0]}
            barSize={25}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesBarChart;
