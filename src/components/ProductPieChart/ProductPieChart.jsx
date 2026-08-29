import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

import "./ProductPieChart.css";

const ProductPieChart = ({ data = [] }) => {
  const productsData = data.map((product) => ({
    name: product.name,
    value: product.percentage,
    quantity: product.quantity,
  }));

  const COLORS = ["#2f4563", "#d62c2c", "#d9a400", "#8bbfc1", "#d1f6f3"];

  return (
    <div className="products-chart">
      <h3>أكثر المنتجات مبيعاً</h3>

      <div className="chart-content">
        {/* Donut Chart */}
        <div className="donut">
          <ResponsiveContainer width="100%" height={230}>
            <PieChart>
              <Pie
                data={productsData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
              >
                {productsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Products List */}
        <div className="products-legend">
          {productsData.map((product, index) => (
            <div className="legend-item" key={product.name}>
              <span
                className="legend-color"
                style={{
                  backgroundColor: COLORS[index],
                }}
              ></span>

              <span className="legend-name">{product.name}</span>

              <span className="legend-value">{product.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPieChart;
