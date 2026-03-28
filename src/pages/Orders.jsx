import React, { useState, useMemo } from "react";
import OrdersTable from "../components/Tables/OrdersTable";
import { Card } from "react-bootstrap";

const Orders = () => {
  const [orders, setOrders] = useState([]); // Data will come from OrdersTable via fetch

  // Analytics can still be computed from orders
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);
  const averageOrderValue = totalOrders ? (totalRevenue / totalOrders).toFixed(2) : 0;

  const ordersByStatus = useMemo(() => [
    { name: "Delivered", value: orders.filter(o => o.status === "Delivered").length },
    { name: "Pending", value: orders.filter(o => o.status === "Pending").length },
    { name: "Shipped", value: orders.filter(o => o.status === "Shipped").length },
    { name: "Cancelled", value: orders.filter(o => o.status === "Cancelled").length },
  ], [orders]);

  return (
    <div className="container mt-4">
      <h2 className="mb-3" style={{ color: "#EBBE4D" }}>Orders Dashboard</h2>

      {/* Orders Table */}
      <OrdersTable setOrders={setOrders} />

      {/* Analytics */}
      <div className="d-flex flex-wrap gap-4 mt-4">
        <Card className="p-3 text-center flex-fill" style={{ minWidth: "200px", backgroundColor: "#222", color: "#EBBE4D" }}>
          <h6 style={{ color: "#636363" }}>Total Orders</h6>
          <h3>{totalOrders}</h3>
        </Card>
        <Card className="p-3 text-center flex-fill" style={{ minWidth: "200px", backgroundColor: "#222", color: "#EBBE4D" }}>
          <h6 style={{ color: "#636363" }}>Total Revenue</h6>
          <h3>${totalRevenue.toLocaleString()}</h3>
        </Card>
        <Card className="p-3 text-center flex-fill" style={{ minWidth: "200px", backgroundColor: "#222", color: "#EBBE4D" }}>
          <h6 style={{ color: "#636363" }}>Average Order Value</h6>
          <h3>${averageOrderValue}</h3>
        </Card>
      </div>
    </div>
  );
};

export default Orders;
