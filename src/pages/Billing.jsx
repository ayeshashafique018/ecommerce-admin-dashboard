import React, { useState } from "react";
import { Row, Col, Card, Form, Button, Table } from "react-bootstrap";
import axios from "axios";

const Billing = () => {
  const [customerName, setCustomerName] = useState("");
  const [products, setProducts] = useState([
    { id: 1, name: "Diamond Ring", price: 1200, quantity: 1 },
  ]);

  const handleQuantityChange = (index, value) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity = parseInt(value) || 0;
    setProducts(updatedProducts);
  };

  const handleAddProduct = () => {
    setProducts([...products, { id: Date.now(), name: "", price: 0, quantity: 1 }]);
  };

  const handleProductNameChange = (index, name) => {
    const updatedProducts = [...products];
    updatedProducts[index].name = name;
    setProducts(updatedProducts);
  };

  const handleProductPriceChange = (index, price) => {
    const updatedProducts = [...products];
    updatedProducts[index].price = parseFloat(price) || 0;
    setProducts(updatedProducts);
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const calculateTotal = () => {
    return products.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const invoiceData = {
      customerName,
      products,
      total: calculateTotal(),
      date: new Date(),
    };

    try {
      // Replace this URL with your backend endpoint
      await axios.post("http://localhost:5000/api/billing", invoiceData);
      alert("Invoice submitted successfully!");
      // Reset form
      setCustomerName("");
      setProducts([{ id: 1, name: "Diamond Ring", price: 1200, quantity: 1 }]);
    } catch (error) {
      console.error(error);
      alert("Failed to submit invoice. Check console for details.");
    }
  };

  return (
    <div className="p-4" style={{ minHeight: "100vh", backgroundColor: "#141414", color: "#fff" }}>
      <h2 style={{ color: "#EBBE4D" }}>Billing / Invoice</h2>

      <Card className="p-3 mt-3" style={{ backgroundColor: "#222", border: "1px solid #EBBE4D" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "#EBBE4D" }}>Customer Name</Form.Label>
            <Form.Control
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
              style={{ backgroundColor: "#141414", color: "#EBBE4D", border: "1px solid #EBBE4D" }}
              required
            />
          </Form.Group>

          <Table striped bordered hover responsive style={{ color: "#EBBE4D", borderColor: "#EBBE4D" }}>
            <thead>
              <tr>
                <th style={{ color: "#EBBE4D" }}>Product Name</th>
                <th style={{ color: "#EBBE4D" }}>Price</th>
                <th style={{ color: "#EBBE4D" }}>Quantity</th>
                <th style={{ color: "#EBBE4D" }}>Total</th>
                <th style={{ color: "#EBBE4D" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr key={item.id}>
                  <td>
                    <Form.Control
                      type="text"
                      value={item.name}
                      onChange={(e) => handleProductNameChange(index, e.target.value)}
                      style={{ backgroundColor: "#141414", color: "#EBBE4D", border: "1px solid #EBBE4D" }}
                      required
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      value={item.price}
                      onChange={(e) => handleProductPriceChange(index, e.target.value)}
                      style={{ backgroundColor: "#141414", color: "#EBBE4D", border: "1px solid #EBBE4D" }}
                      required
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(index, e.target.value)}
                      style={{ backgroundColor: "#141414", color: "#EBBE4D", border: "1px solid #EBBE4D" }}
                      min="1"
                      required
                    />
                  </td>
                  <td>{(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => handleRemoveProduct(index)}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Button variant="success" className="mb-3" onClick={handleAddProduct}>
            Add Product
          </Button>

          <h5 style={{ color: "#EBBE4D" }}>Total Amount: ${calculateTotal().toFixed(2)}</h5>

          <Button type="submit" variant="primary">
            Submit Invoice
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Billing;
