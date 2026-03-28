import React, { useState, useEffect, useMemo } from "react";
import Swal from "sweetalert2";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import api from "../services/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [viewUser, setViewUser] = useState(null);
  const [editUser, setEditUser] = useState(null);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to fetch users", "error");
      }
    };
    fetchUsers();
  }, []);

  // Sorting
  const sortUsers = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  // Filter + search + sort
  const filteredUsers = useMemo(() => {
    let filtered = users.filter(u =>
      (filterRole === "All" || u.role === filterRole) &&
      (filterStatus === "All" || u.status === filterStatus) &&
      (search === "" || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
    );

    filtered.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (typeof aVal === "string") return sortConfig.direction === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
    });

    return filtered;
  }, [users, search, filterRole, filterStatus, sortConfig]);

  // Select & bulk actions
  const toggleSelect = (id) => setSelectedUsers(prev => prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]);
  const selectAll = (e) => e.target.checked ? setSelectedUsers(filteredUsers.map(u => u._id)) : setSelectedUsers([]);
  const toggleStatus = (id) => setUsers(users.map(u => u._id === id ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" } : u));
  const bulkToggleStatus = () => {
    setUsers(users.map(u => selectedUsers.includes(u._id) ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" } : u));
    setSelectedUsers([]);
  };
  const deleteUser = (id) => {
    Swal.fire({
      title: "Delete user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EBBE4D",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes"
    }).then(result => {
      if (result.isConfirmed) setUsers(users.filter(u => u._id !== id));
    });
  };
  const bulkDelete = () => {
    Swal.fire({
      title: "Delete selected users?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EBBE4D",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes"
    }).then(result => {
      if (result.isConfirmed) {
        setUsers(users.filter(u => !selectedUsers.includes(u._id)));
        setSelectedUsers([]);
      }
    });
  };

  const saveEditUser = () => {
    setUsers(users.map(u => u._id === editUser._id ? editUser : u));
    setEditUser(null);
    Swal.fire("Saved!", "User updated successfully.", "success");
  };

  const statusColor = (status) => status === "Active" ? "text-success" : "text-danger";

  return (
    <div>
      <h2 className="text-2xl mb-4">Users</h2>

      {/* Filters */}
      <div className="d-flex flex-wrap gap-2 mb-3 align-items-center">
        <input type="text" className="form-control" placeholder="Search by name/email..." value={search} onChange={e => setSearch(e.target.value)} style={{ maxWidth: "250px" }} />
        <Form.Select value={filterRole} onChange={e => setFilterRole(e.target.value)} style={{ maxWidth: "200px" }}>
          <option value="All">All Roles</option>
          {[...new Set(users.map(u => u.role))].map(role => <option key={role} value={role}>{role}</option>)}
        </Form.Select>
        <Form.Select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ maxWidth: "200px" }}>
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Blocked">Blocked</option>
        </Form.Select>
        {selectedUsers.length > 0 && (
          <>
            <button className="btn btn-warning btn-sm" onClick={bulkToggleStatus}>Toggle Status</button>
            <button className="btn btn-danger btn-sm" onClick={bulkDelete}>Delete Selected</button>
          </>
        )}
      </div>

      {/* Users Table */}
      <div className="table-responsive">
        <table className="table table-dark table-hover table-striped align-middle">
          <thead>
            <tr>
              <th><input type="checkbox" onChange={selectAll} checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0} /></th>
              {["_id", "name", "email", "role", "status", "actions"].map(col => (
                <th key={col} style={{ cursor: col !== "actions" ? "pointer" : "default" }} onClick={() => col !== "actions" && sortUsers(col)}>
                  {col.toUpperCase()} {sortConfig.key === col ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user._id}>
                <td><input type="checkbox" checked={selectedUsers.includes(user._id)} onChange={() => toggleSelect(user._id)} /></td>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className={statusColor(user.status)}>{user.status}</td>
                <td>
                  <button className={`btn btn-sm ${user.status === "Active" ? "btn-warning" : "btn-success"} me-2`} onClick={() => toggleStatus(user._id)}>
                    {user.status === "Active" ? "Block" : "Unblock"}
                  </button>
                  <button className="btn btn-sm btn-info me-2" onClick={() => setViewUser(user)}>View</button>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && <tr><td colSpan="6" className="text-center text-warning">No users found.</td></tr>}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      <Modal show={!!viewUser} onHide={() => setViewUser(null)}>
        <Modal.Header closeButton><Modal.Title>User Details</Modal.Title></Modal.Header>
        <Modal.Body>
          {viewUser && (
            <>
              <p><strong>ID:</strong> {viewUser._id}</p>
              <p><strong>Name:</strong> {viewUser.name}</p>
              <p><strong>Email:</strong> {viewUser.email}</p>
              <p><strong>Role:</strong> {viewUser.role}</p>
              <p><strong>Status:</strong> {viewUser.status}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer><Button variant="secondary" onClick={() => setViewUser(null)}>Close</Button></Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={!!editUser} onHide={() => setEditUser(null)}>
        <Modal.Header closeButton><Modal.Title>Edit User</Modal.Title></Modal.Header>
        <Modal.Body>
          {editUser && (
            <Form>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={editUser.name} onChange={e => setEditUser({...editUser, name: e.target.value})} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={editUser.email} onChange={e => setEditUser({...editUser, email: e.target.value})} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Role</Form.Label>
                    <Form.Select value={editUser.role} onChange={e => setEditUser({...editUser, role: e.target.value})}>
                      <option>Admin</option>
                      <option>Customer</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Select value={editUser.status} onChange={e => setEditUser({...editUser, status: e.target.value})}>
                      <option>Active</option>
                      <option>Blocked</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditUser(null)}>Cancel</Button>
          <Button variant="warning" onClick={saveEditUser}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Users;
