import React, { useState, useEffect, useRef } from "react";
import ReactApexChart from "react-apexcharts";

const RevenueChart = () => {
  const [view, setView] = useState("monthly"); // daily, monthly, yearly
  const chartRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) setChartWidth(chartRef.current.offsetWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const revenueData = {
    daily: {
      categories: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
      revenue: Array.from({ length: 30 }, () => Math.floor(Math.random() * 5000 + 2000)),
      target: Array.from({ length: 30 }, () => 4000),
    },
    monthly: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      revenue: [30000, 40000, 35000, 50000, 55000, 60000, 65000, 70000, 68000, 72000, 75000, 77000],
      target: [32000, 38000, 36000, 48000, 54000, 61000, 64000, 69000, 67000, 71000, 74000, 76000],
    },
    yearly: {
      categories: ["2021", "2022", "2023", "2024", "2025"],
      revenue: [300000, 400000, 350000, 500000, 550000],
      target: [320000, 380000, 360000, 480000, 600000],
    },
  };

  const current = revenueData[view];

  const series = [
    { name: "Revenue", type: "bar", data: current.revenue },
    { name: "Target", type: "line", data: current.target },
  ];

  const options = {
    chart: { type: "line", background: "#141414", stacked: false, toolbar: { show: true } },
    colors: ["#EBBE4D", "#FF8C00"],
    stroke: { width: [0, 3], curve: "smooth" },
    plotOptions: { bar: { borderRadius: 5, horizontal: false } },
    dataLabels: { enabled: false },
    xaxis: {
      categories: current.categories,
      labels: { style: { colors: "#EBBE4D", fontSize: chartWidth < 576 ? "10px" : "12px" } },
    },
    yaxis: {
      labels: {
        style: { colors: "#EBBE4D", fontSize: chartWidth < 576 ? "10px" : "12px" },
        formatter: (val) => "$" + val.toLocaleString(),
      },
    },
    grid: { borderColor: "#3b3b3b" },
    tooltip: { theme: "dark", shared: true, y: { formatter: (val) => "$" + val.toLocaleString() } },
    legend: {
      labels: { colors: "#EBBE4D", useSeriesColors: true },
      position: "top",
      horizontalAlign: "center",
      fontSize: chartWidth < 576 ? "10px" : "14px",
    },
  };

  return (
    <div ref={chartRef} style={{ width: "100%" }}>
      {/* Toggle Buttons */}
      <div className="d-flex gap-2 mb-3 flex-wrap">
        {["daily", "monthly", "yearly"].map((item) => (
          <button
            key={item}
            className={`btn ${view === item ? "btn-warning" : "btn-outline-warning"}`}
            onClick={() => setView(item)}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>

      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={chartWidth < 576 ? 250 : 350} // smaller height for mobile
      />
    </div>
  );
};

export default RevenueChart;
