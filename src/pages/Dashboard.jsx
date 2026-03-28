import React from "react";
import SalesChart from "../components/Charts/SalesChart";
import RevenueChart from "../components/Charts/RevenueChart";
import VisitorChart from "../components/Charts/VisitorChart";
import ConversionFunnel from "../components/Charts/ConversionFunnel";
import StatCard from "../components/Cards/StatCard";
import OrdersTable from "../components/Tables/OrdersTable";
import ProductsTable from "../components/Tables/ProductsTable";
import UsersTable from "../components/Tables/UsersTable";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Dashboard = () => {
  const stats = [
    { title: "Total Customers", value: 1245, icon: "bi-people-fill", bg: "#3b3b3b", trend: [1000, 1100, 1200, 1245] },
    { title: "Total Orders", value: 862, icon: "bi-bag-fill", bg: "#222222", trend: [800, 820, 840, 862] },
    { title: "Monthly Revenue", value: "$56,320", icon: "bi-currency-dollar", bg: "#3b3b3b", trend: [45000, 50000, 55000, 56320] },
    { title: "Today’s Sales", value: "$4,120", icon: "bi-cart-fill", bg: "#222222", trend: [3000, 3500, 4000, 4120] },
    { title: "Pending Orders", value: 21, icon: "bi-clock-fill", bg: "#3b3b3b", trend: [15, 18, 20, 21] },
    { title: "Low Stock Items", value: 12, icon: "bi-exclamation-triangle-fill", bg: "#222222", trend: [20, 18, 15, 12] },
  ];

  return (
    <div className="container-fluid p-3 p-md-4" style={{ background: "#141414", minHeight: "100vh", color: "#EBBE4D" }}>
      
      {/* ===== Stats Cards: 3 per row on all screen sizes ===== */}
      <div className="row g-3 mb-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="col-12 col-md-4">
            <StatCard title={stat.title} value={stat.value} icon={stat.icon} bg={stat.bg} trend={stat.trend} />
          </div>
        ))}
      </div>

      {/* ===== Monthly Sales (full width) ===== */}
      <div className="row g-3 mb-4">
        <div className="col-12">
          <div className="p-3 rounded" style={{ background: "#222222", minHeight: "400px" }}>
            <h6 className="mb-3">Monthly Sales</h6>
            <SalesChart />
          </div>
        </div>
      </div>

      {/* ===== Revenue vs Target (full width) ===== */}
      <div className="row g-3 mb-4">
        <div className="col-12">
          <div className="p-3 rounded" style={{ background: "#222222", minHeight: "400px" }}>
            <h6 className="mb-3">Revenue vs Target</h6>
            <RevenueChart />
          </div>
        </div>
      </div>

      {/* ===== Visitors (full width) ===== */}
      <div className="row g-3 mb-4">
        <div className="col-12">
          <div className="p-3 rounded" style={{ background: "#222222", minHeight: "350px" }}>
            <h6 className="mb-3">Visitors</h6>
            <VisitorChart />
          </div>
        </div>
      </div>

      {/* ===== Conversion Funnel (full width) ===== */}
      <div className="row g-3 mb-4">
        <div className="col-12">
          <div className="p-3 rounded" style={{ background: "#222222", minHeight: "350px" }}>
            <h6 className="mb-3">Conversion Funnel</h6>
            <ConversionFunnel />
          </div>
        </div>
      </div>

      {/* ===== Recent Orders (full width) ===== */}
      <div className="row g-3 mb-4">
        <div className="col-12">
          <div className="p-3 rounded" style={{ background: "#222222", minHeight: "350px" }}>
            <h6 className="mb-3">Recent Orders</h6>
            <OrdersTable />
          </div>
        </div>
      </div>


    </div>
  );
};

export default Dashboard;
