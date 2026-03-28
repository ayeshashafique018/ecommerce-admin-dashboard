import React from "react";

const RevenueCard = ({ title, value, trend }) => {
  return (
    <div
      className="card d-flex flex-column align-items-center p-3 mb-3"
      style={{
        background: "#222222",
        color: "#EBBE4D",
        borderRadius: "18px",
        width: "100%",
        minHeight: "140px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
    >
      {/* Hover effect */}
      <style>
        {`
          .card:hover {
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 12px 30px rgba(235,190,77,0.5);
          }
        `}
      </style>

      {/* Title */}
      <h6 className="text-center mb-2 text-truncate" style={{ width: "100%", fontWeight: 500 }}>
        {title}
      </h6>

      {/* Value */}
      <h4 className="text-center mb-2" style={{ fontWeight: 700, fontSize: "1.4rem", wordBreak: "break-word" }}>
        {value}
      </h4>

      {/* Trend data */}
      {trend && (
        <small
          className="text-center"
          style={{ color: "#888", fontSize: "0.85rem", wordBreak: "break-word" }}
        >
          {Array.isArray(trend) ? trend.join(" → ") : trend}
        </small>
      )}
    </div>
  );
};

export default RevenueCard;
