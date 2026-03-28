import React, { useState, useEffect, useMemo } from "react";
import Swal from "sweetalert2";
import { Modal, Button, Form } from "react-bootstrap";
import { getOrders, updateOrder as updateOrderApi, deleteOrder as deleteOrderApi } from "../../api/adminOrdersApi";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: "_id", direction: "asc" });
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterDate, setFilterDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewOrder, setViewOrder] = useState(null);
  const [editOrder, setEditOrder] = useState(null);

  const rowsPerPage = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await getOrders();
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to fetch orders", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Sorting function
  const sortOrders = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  // Toggle selection
  const toggleSelect = (id) => {
    setSelectedOrders(prev =>
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const selectAll = (e, filtered) => {
    if (e.target.checked) setSelectedOrders(filtered.map(o => o._id));
    else setSelectedOrders([]);
  };

  // Delete single order
  const deleteOrder = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EBBE4D",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!"
    });
    if (confirm.isConfirmed) {
      try {
        await deleteOrderApi(id);
        setOrders(orders.filter(o => o._id !== id));
        Swal.fire("Deleted!", "Order has been deleted.", "success");
      } catch (err) {
        Swal.fire("Error", "Failed to delete order", "error");
      }
    }
  };

  // Save edited order
  const saveEditOrder = async () => {
    try {
      const res = await updateOrderApi(editOrder._id, editOrder);
      setOrders(orders.map(o => o._id === editOrder._id ? res.data : o));
      setEditOrder(null);
      Swal.fire("Saved!", "Order updated successfully.", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to update order", "error");
    }
  };

  // Filtered and sorted orders
  const filteredOrders = useMemo(() => {
    let result = orders.filter(o =>
      (filterStatus === "All" || o.status === filterStatus) &&
      (!filterDate || o.createdAt.slice(0,10) === filterDate) &&
      (search === "" || 
        o.products.some(p => p.product.name.toLowerCase().includes(search.toLowerCase())) ||
        o.user.name.toLowerCase().includes(search.toLowerCase()))
    );

    result.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (typeof aVal === "string") {
        return sortConfig.direction === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
    });

    return result;
  }, [orders, sortConfig, search, filterStatus, filterDate]);

  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="table-responsive">
      {loading ? (
        <div className="text-center mt-5"><div className="spinner-border" /></div>
      ) : (
        <>
          {/* ===== Filters & Actions ===== */}
          <div className="mb-3 d-flex flex-wrap gap-2 align-items-center">
            <input type="text" className="form-control" placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)} style={{ maxWidth: "250px" }}/>
            <Form.Select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ maxWidth: "200px" }}>
              <option value="All">All Statuses</option>
              <option value="Delivered">Delivered</option>
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Cancelled">Cancelled</option>
            </Form.Select>
            <Form.Control type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} style={{ maxWidth: "200px" }}/>
          </div>

          {/* ===== Table ===== */}
          <table className="table table-dark table-striped table-hover align-middle">
            <thead>
              <tr>
                <th><input type="checkbox" checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0} onChange={e => selectAll(e, filteredOrders)} /></th>
                <th>ID</th>
                <th>Customer</th>
                <th>Products</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map(o => (
                <tr key={o._id}>
                  <td><input type="checkbox" checked={selectedOrders.includes(o._id)} onChange={() => toggleSelect(o._id)} /></td>
                  <td>{o._id}</td>
                  <td>{o.user.name}</td>
                  <td>{o.products.map(p => p.product.name).join(", ")}</td>
                  <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td>${o.totalPrice.toLocaleString()}</td>
                  <td>{o.status}</td>
                  <td>
                    <Button size="sm" variant="warning" onClick={() => setEditOrder(o)}>Edit</Button>{" "}
                    <Button size="sm" variant="danger" onClick={() => deleteOrder(o._id)}>Delete</Button>
                  </td>
                </tr>
              ))}
              {paginatedOrders.length === 0 && <tr><td colSpan="8" className="text-center text-warning">No orders found.</td></tr>}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="d-flex justify-content-end gap-2 align-items-center mt-2">
            <Button size="sm" disabled={currentPage===1} onClick={() => setCurrentPage(p => Math.max(p-1,1))}>Previous</Button>
            <span>Page {currentPage} of {totalPages}</span>
            <Button size="sm" disabled={currentPage===totalPages} onClick={() => setCurrentPage(p => Math.min(p+1,totalPages))}>Next</Button>
          </div>

          {/* ===== Edit Modal ===== */}
          <Modal show={!!editOrder} onHide={() => setEditOrder(null)}>
            <Modal.Header closeButton><Modal.Title>Edit Order</Modal.Title></Modal.Header>
            <Modal.Body>
              {editOrder && (
                <Form>
                  <Form.Group className="mb-2">
                    <Form.Label>Status</Form.Label>
                    <Form.Select value={editOrder.status} onChange={e => setEditOrder({...editOrder, status: e.target.value})}>
                      <option>Delivered</option>
                      <option>Pending</option>
                      <option>Shipped</option>
                      <option>Cancelled</option>
                    </Form.Select>
                  </Form.Group>
                </Form>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setEditOrder(null)}>Cancel</Button>
              <Button variant="warning" onClick={saveEditOrder}>Save Changes</Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};

export default OrdersTable;
