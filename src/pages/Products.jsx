import React, { useEffect, useState, useMemo } from "react";
import { Card, Button, Badge, Spinner, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import ProductsTable from "../components/Tables/ProductsTable";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../api/adminApi";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch products", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (newProduct) => {
    try {
      const res = await addProduct(newProduct);
      setProducts(prev => [...prev, res.data]);
      Swal.fire("Success", "Product added", "success");
      setShowAddModal(false);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to add product", "error");
    }
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    try {
      const payload = {
        name: updatedProduct.name,
        description: updatedProduct.description,
        price: updatedProduct.price,
        stock: updatedProduct.stock,
        image: updatedProduct.image
      };
      const res = await updateProduct(id, payload);
      setProducts(prev => prev.map(p => (p._id === id ? res.data : p)));
      Swal.fire("Success", "Product updated", "success");
    } catch (err) {
      console.error(err.response || err);
      Swal.fire("Error", "Failed to update product", "error");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p._id !== id));
      Swal.fire("Deleted!", "Product removed", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete product", "error");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Analytics
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const lowStockProducts = products.filter(p => p.stock <= 5).length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-warning">Products Dashboard</h2>

      <div className="d-flex justify-content-between mb-3">
        <h6 className="text-white">Products Overview</h6>
        <Button variant="warning" onClick={() => setShowAddModal(true)}>Add Product</Button>
      </div>

      <ProductsTable
        products={products}
        handleUpdateProduct={handleUpdateProduct}
        handleDeleteProduct={handleDeleteProduct}
      />

      <div className="d-flex flex-wrap gap-4 mt-4">
        <Card className="p-3 text-center flex-fill" style={{ backgroundColor: "#222", color: "#EBBE4D" }}>
          <h6 style={{ color: "#636363" }}>Total Products</h6>
          <h3>{totalProducts}</h3>
        </Card>
        <Card className="p-3 text-center flex-fill" style={{ backgroundColor: "#222", color: "#EBBE4D" }}>
          <h6 style={{ color: "#636363" }}>Total Stock</h6>
          <h3>{totalStock}</h3>
        </Card>
        <Card className="p-3 text-center flex-fill" style={{ backgroundColor: "#222", color: "#EBBE4D" }}>
          <h6 style={{ color: "#636363" }}>Low Stock</h6>
          <h3><Badge bg="warning">{lowStockProducts}</Badge></h3>
        </Card>
        <Card className="p-3 text-center flex-fill" style={{ backgroundColor: "#222", color: "#EBBE4D" }}>
          <h6 style={{ color: "#636363" }}>Total Value</h6>
          <h3>${totalValue.toLocaleString()}</h3>
        </Card>
      </div>

      {/* Add Product Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton><Modal.Title>Add Product</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Name" onChange={e => setProducts(prev => ({...prev, name: e.target.value}))} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Description" onChange={e => setProducts(prev => ({...prev, description: e.target.value}))} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Price" onChange={e => setProducts(prev => ({...prev, price: parseFloat(e.target.value)}))} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="number" placeholder="Stock" onChange={e => setProducts(prev => ({...prev, stock: parseInt(e.target.value)}))} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="text" placeholder="Image URL" onChange={e => setProducts(prev => ({...prev, image: e.target.value}))} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
          <Button variant="warning" onClick={() => handleAddProduct(products)}>Add Product</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Products;
