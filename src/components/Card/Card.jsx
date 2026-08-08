import React from "react";
import "./Card.css";

const Card = ({ title, icon, data,className, children }) => {
  return (
    <div className="statistic-card">

      {/* Icon */}
      <div className={className}>
        {icon}
      </div>

      {/* Chart */}
      <div className="statistic-chart">
        {children}
      </div>

      {/* Information */}
      <div className="statistic-info">
        <span>{title}</span>
        <h2>{data}</h2>
      </div>

    </div>
  );
};

export default Card;