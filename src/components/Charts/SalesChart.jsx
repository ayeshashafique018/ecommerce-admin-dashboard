import React, { useRef, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const SalesChart = () => {
  const chartRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        setChartWidth(chartRef.current.parentElement.offsetWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Gradient for the line fill
  const gradient = (ctx) => {
    const chart = ctx.chart;
    const { ctx: context, chartArea } = chart;
    if (!chartArea) return null;

    const gradientFill = context.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradientFill.addColorStop(0, "rgba(235, 190, 77, 0.1)");
    gradientFill.addColorStop(1, "rgba(235, 190, 77, 0.3)");
    return gradientFill;
  };

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "2025 Sales",
        data: [12000, 15000, 14000, 18000, 19000, 22000, 20000, 21000, 23000, 25000, 24000, 26000],
        fill: true,
        backgroundColor: function (context) {
          return gradient(context);
        },
        borderColor: "#EBBE4D",
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: "#EBBE4D",
        pointBorderColor: "#000",
        pointRadius: chartWidth < 576 ? 2 : 5, // smaller points on mobile
        pointHoverRadius: chartWidth < 576 ? 4 : 7,
      },
      {
        label: "2024 Sales",
        data: [10000, 13000, 12000, 15000, 16000, 18000, 17000, 19000, 20000, 21000, 20500, 22000],
        fill: false,
        borderColor: "#FF8C00",
        borderDash: [5, 5],
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // allows height to adjust
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#EBBE4D",
          font: { size: chartWidth < 576 ? 10 : 14, weight: "500" },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#3b3b3b",
        titleColor: "#EBBE4D",
        bodyColor: "#fff",
        bodyFont: { weight: "500" },
        mode: "index",
        intersect: false,
      },
      title: {
        display: true,
        text: "Monthly Sales Overview",
        color: "#EBBE4D",
        font: { size: chartWidth < 576 ? 14 : 18, weight: "600" },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    scales: {
      y: {
        ticks: {
          color: "#EBBE4D",
          font: { size: chartWidth < 576 ? 10 : 12, weight: "500" },
          callback: function (value) {
            return "$" + value.toLocaleString();
          },
        },
        grid: { color: "#3b3b3b" },
      },
      x: {
        ticks: {
          color: "#EBBE4D",
          font: { size: chartWidth < 576 ? 10 : 12, weight: "500" },
        },
        grid: { color: "#3b3b3b" },
      },
    },
  };

  return (
    <div ref={chartRef} style={{ width: "100%", minHeight: "350px" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default SalesChart;
