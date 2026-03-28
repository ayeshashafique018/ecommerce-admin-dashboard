import React, { useEffect, useState } from "react";
import { BsFillPeopleFill, BsBagFill, BsCartFill, BsCurrencyDollar, BsClockFill, BsExclamationTriangleFill } from "react-icons/bs";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

// Map icon strings to actual React Icons (now black)
const iconMap = {
  "bi-people-fill": <BsFillPeopleFill size={28} color="#000" />,
  "bi-bag-fill": <BsBagFill size={28} color="#000" />,
  "bi-cart-fill": <BsCartFill size={28} color="#000" />,
  "bi-currency-dollar": <BsCurrencyDollar size={28} color="#000" />,
  "bi-clock-fill": <BsClockFill size={28} color="#000" />,
  "bi-exclamation-triangle-fill": <BsExclamationTriangleFill size={28} color="#000" />,
};

// Animated Number with commas
const AnimatedNumber = ({ value, duration = 1200 }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 16);
    const animate = () => {
      start += increment;
      if (start < value) {
        setDisplay(Math.floor(start));
        requestAnimationFrame(animate);
      } else {
        setDisplay(value);
      }
    };
    animate();
  }, [value, duration]);

  return display.toLocaleString();
};

const StatCard = ({ title, value, icon, bg = "#222222", sparkline }) => {
  // Sparkline data
  const data = {
    labels: sparkline ? sparkline.map((_, i) => i + 1) : [],
    datasets: [
      {
        data: sparkline || [],
        fill: true,
        backgroundColor: "rgba(235, 190, 77, 0.2)",
        borderColor: "#EBBE4D",
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { display: false }, y: { display: false } },
  };

  return (
    <div
      className="card p-3 position-relative"
      style={{
        background: bg,
        borderRadius: "18px",
        color: "#EBBE4D",
        cursor: "pointer",
        transition: "all 0.4s ease",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        overflow: "hidden",
      }}
    >
      {/* Hover Animation */}
      <style>
        {`
          .card:hover {
            transform: translateY(-10px) scale(1.03);
            box-shadow: 0 14px 40px rgba(235,190,77,0.6);
          }
        `}
      </style>

      {/* Icon in Gradient Circle */}
      <div
        className="d-flex align-items-center justify-content-center mb-3 mx-auto"
        style={{
          background: "linear-gradient(135deg, #EBBE4D, #FFEB99)",
          width: "65px",
          height: "65px",
          borderRadius: "50%",
          boxShadow: "0 0 25px rgba(235,190,77,0.5)",
        }}
      >
        {iconMap[icon]}
      </div>

      {/* Title */}
      <h6 className="text-center mb-1" style={{ fontWeight: 500, letterSpacing: "0.5px" }}>
        {title}
      </h6>

      {/* Animated Value */}
      <h2 className="text-center mb-3" style={{ fontWeight: 700 }}>
        <AnimatedNumber value={parseInt(value.toString().replace(/\D/g, ""))} />
        {value.toString().replace(/\d/g, "")}
      </h2>

      {/* Sparkline Chart */}
      {sparkline && (
        <div style={{ width: "100%", height: "50px", marginTop: "-10px" }}>
          <Line data={data} options={options} />
        </div>
      )}

      {/* Subtle Glow Effect */}
      <div
        style={{
          position: "absolute",
          top: "-20px",
          right: "-20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "rgba(235,190,77,0.1)",
          filter: "blur(20px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-20px",
          left: "-20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "rgba(235,190,77,0.1)",
          filter: "blur(20px)",
        }}
      />
    </div>
  );
};

export default StatCard;
