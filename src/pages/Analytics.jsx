import React, { useState } from "react";
import { Row, Col, Card, Form } from "react-bootstrap";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

const Analytics = () => {
  const [dateRange, setDateRange] = useState("lastMonth");

  // Dummy data (replace with API data later)
  const salesData = [
    { date: "2025-12-01", sales: 1200 },
    { date: "2025-12-02", sales: 2100 },
    { date: "2025-12-03", sales: 800 },
    { date: "2025-12-04", sales: 1600 },
    { date: "2025-12-05", sales: 900 },
    { date: "2025-12-06", sales: 1700 },
    { date: "2025-12-07", sales: 2000 },
  ];

  const categoryData = [
    { category: "Rings", revenue: 4500 },
    { category: "Necklaces", revenue: 3000 },
    { category: "Earrings", revenue: 2000 },
    { category: "Bracelets", revenue: 1500 },
  ];

  const ordersGenderData = [
    { gender: "Men", orders: 120 },
    { gender: "Women", orders: 180 },
  ];

  const ordersCityData = [
    { city: "Karachi", orders: 80 },
    { city: "Lahore", orders: 70 },
    { city: "Islamabad", orders: 50 },
    { city: "Other", orders: 100 },
  ];

  const topProducts = [
    { name: "Diamond Ring", sales: 50 },
    { name: "Gold Necklace", sales: 40 },
    { name: "Silver Bracelet", sales: 35 },
    { name: "Pearl Earrings", sales: 30 },
  ];

  // Yellow theme
  const COLORS = ["#EBBE4D", "#FFDA6F", "#FFD966", "#FFE599"];

  return (
    <div className="p-4" style={{ color: "#fff", backgroundColor: "#141414", minHeight: "100vh" }}>
      <h2 className="mb-4" style={{ color: "#EBBE4D" }}>Analytics Dashboard</h2>

      {/* Date Range Picker */}
      <Form.Select
        className="mb-4 w-auto"
        value={dateRange}
        onChange={(e) => setDateRange(e.target.value)}
        style={{ backgroundColor: "#222", color: "#EBBE4D", border: "1px solid #EBBE4D" }}
      >
        <option value="last7days">Last 7 Days</option>
        <option value="lastMonth">Last Month</option>
        <option value="lastYear">Last Year</option>
      </Form.Select>

      {/* Charts Section */}
      <Row className="mb-4">
        <Col md={6}>
          <Card className="p-3 mb-3" style={{ backgroundColor: "#222", border: "1px solid #EBBE4D" }}>
            <h5 style={{ color: "#EBBE4D" }}>Sales Over Time</h5>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid stroke="#636363" strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="#EBBE4D" />
                <YAxis stroke="#EBBE4D" />
                <Tooltip contentStyle={{ backgroundColor: "#222", borderColor: "#EBBE4D", color: "#fff" }} />
                <Legend wrapperStyle={{ color: "#EBBE4D" }} />
                <Line type="monotone" dataKey="sales" stroke="#EBBE4D" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="p-3 mb-3" style={{ backgroundColor: "#222", border: "1px solid #EBBE4D" }}>
            <h5 style={{ color: "#EBBE4D" }}>Revenue by Category</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid stroke="#636363" strokeDasharray="3 3" />
                <XAxis dataKey="category" stroke="#EBBE4D" />
                <YAxis stroke="#EBBE4D" />
                <Tooltip contentStyle={{ backgroundColor: "#222", borderColor: "#EBBE4D", color: "#fff" }} />
                <Legend wrapperStyle={{ color: "#EBBE4D" }} />
                <Bar dataKey="revenue" fill="#EBBE4D" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card className="p-3 mb-3" style={{ backgroundColor: "#222", border: "1px solid #EBBE4D" }}>
            <h5 style={{ color: "#EBBE4D" }}>Orders by Gender</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ordersGenderData}
                  dataKey="orders"
                  nameKey="gender"
                  outerRadius={100}
                  label={{ fill: "#EBBE4D" }}
                >
                  {ordersGenderData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#222", borderColor: "#EBBE4D", color: "#fff" }} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="p-3 mb-3" style={{ backgroundColor: "#222", border: "1px solid #EBBE4D" }}>
            <h5 style={{ color: "#EBBE4D" }}>Orders by City</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ordersCityData}>
                <CartesianGrid stroke="#636363" strokeDasharray="3 3" />
                <XAxis dataKey="city" stroke="#EBBE4D" />
                <YAxis stroke="#EBBE4D" />
                <Tooltip contentStyle={{ backgroundColor: "#222", borderColor: "#EBBE4D", color: "#fff" }} />
                <Legend wrapperStyle={{ color: "#EBBE4D" }} />
                <Bar dataKey="orders" fill="#EBBE4D" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Top Products */}
      <Row className="mb-4">
        <Col md={12}>
          <Card className="p-3" style={{ backgroundColor: "#222", border: "1px solid #EBBE4D" }}>
            <h5 style={{ color: "#EBBE4D" }}>Top Selling Products</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart layout="vertical" data={topProducts}>
                <CartesianGrid stroke="#636363" strokeDasharray="3 3" />
                <XAxis type="number" stroke="#EBBE4D" />
                <YAxis dataKey="name" type="category" stroke="#EBBE4D" />
                <Tooltip contentStyle={{ backgroundColor: "#222", borderColor: "#EBBE4D", color: "#fff" }} />
                <Legend wrapperStyle={{ color: "#EBBE4D" }} />
                <Bar dataKey="sales" fill="#EBBE4D" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Analytics;
