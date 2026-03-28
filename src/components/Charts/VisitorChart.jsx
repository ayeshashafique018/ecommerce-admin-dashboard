import React, { useRef, useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const VisitorChart = ({ type = "demographics" }) => {
  const chartRef = useRef(null);
  const [chartHeight, setChartHeight] = useState(300);

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        const width = chartRef.current.offsetWidth;
        setChartHeight(width < 576 ? 250 : 300); // smaller height for mobile
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const chartData = {
    demographics: {
      labels: ["USA", "UK", "India", "Germany", "Others"],
      data: [400, 300, 250, 150, 100],
    },
    devices: {
      labels: ["Desktop", "Mobile", "Tablet"],
      data: [700, 400, 100],
    },
    totalVisitors: {
      labels: ["Visitors"],
      data: [1200],
    },
  };

  const currentData = chartData[type] || chartData["demographics"];
  const total = currentData.data.reduce((a, b) => a + b, 0);

  const data = {
    labels: currentData.labels,
    datasets: [
      {
        label: "Visitors",
        data: currentData.data,
        backgroundColor: ["#EBBE4D", "#636363", "#3b3b3b", "#222222", "#141414", "#FF8C00"],
        borderColor: "#141414",
        borderWidth: 2,
        hoverOffset: 20,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    animation: {
      animateRotate: true,
      duration: 1500,
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#EBBE4D",
          font: { size: chartHeight < 300 ? 10 : 12 },
          generateLabels: (chart) =>
            chart.data.labels.map((label, i) => ({
              text: `${label} (${((chart.data.datasets[0].data[i] / total) * 100).toFixed(1)}%)`,
              fillStyle: chart.data.datasets[0].backgroundColor[i],
              hidden: false,
              index: i,
            })),
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#3b3b3b",
        titleColor: "#EBBE4D",
        bodyColor: "#EBBE4D",
        bodyFont: { weight: "500" },
        callbacks: {
          label: function (context) {
            const value = context.dataset.data[context.dataIndex];
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div ref={chartRef} style={{ width: "100%", height: `${chartHeight}px` }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default VisitorChart;
