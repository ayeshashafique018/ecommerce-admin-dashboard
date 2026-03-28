import React, { useState, useMemo } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

const ProductsTable = ({
  products = [],
  handleAddProduct,
  handleUpdateProduct,
  handleDeleteProduct,
  showAddModal,
  setShowAddModal,
  isAddMode = false
}) => {
  const [search, setSearch] = useState("");
  const [filterLowStock, setFilterLowStock] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: "", description: "", price: 0, stock: 0, image: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => (!filterLowStock || p.stock <= 5))
      .filter(p => (search === "" || p.name.toLowerCase().includes(search.toLowerCase())));
  }, [products, filterLowStock, search]);

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage);

  const saveNewProduct = async () => {
    if (!newProduct.name || !newProduct.price) return Swal.fire("Error", "Name and Price are required", "error");
    await handleAddProduct(newProduct);
    setNewProduct({ name: "", description: "", price: 0, stock: 0, image: "" });
  };

  const saveEditProduct = async () => {
    if (!editProduct.name || !editProduct.price) return Swal.fire("Error", "Name and Price are required", "error");
    await handleUpdateProduct(editProduct._id, editProduct);
    setEditProduct(null);
  };

  return (
    <div>
      {/* Filters */}
      <div className="d-flex flex-wrap gap-2 mb-3 align-items-center">
        <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="form-control" style={{ maxWidth: "250px" }} />
        <button className={`btn ${filterLowStock ? "btn-warning" : "btn-outline-warning"}`} onClick={() => setFilterLowStock(prev => !prev)}>
          {filterLowStock ? "Low Stock Only" : "Show Low Stock"}
        </button>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-dark table-hover align-middle">
          <thead>
            <tr>
              {["Image","Name","Price","Stock","Actions"].map(col => <th key={col}>{col}</th>)}
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map(p => (
              <tr key={p._id} className={p.stock <= 5 ? "text-warning" : ""}>
                <td>{p.image && <img src={p.image} alt={p.name} style={{ width: "50px", height: "50px", objectFit: "cover" }} />}</td>
                <td>{p.name}</td>
                <td>${p.price}</td>
                <td>{p.stock}</td>
                <td>
                  <Button size="sm" variant="warning" className="me-1" onClick={() => setEditProduct(p)}>Edit</Button>
                  <Button size="sm" variant="danger" onClick={() => Swal.fire({
                    title: "Delete product?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes"
                  }).then(result => { if(result.isConfirmed) handleDeleteProduct(p._id) })}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-3 gap-2">
        {Array.from({ length: pageCount }, (_, i) => (
          <Button key={i} size="sm" variant={i+1===currentPage ? "warning" : "secondary"} onClick={() => setCurrentPage(i+1)}>{i+1}</Button>
        ))}
      </div>

      {/* Add Product Modal */}
      {isAddMode && (
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
          <Modal.Header closeButton><Modal.Title>Add Product</Modal.Title></Modal.Header>
          <Modal.Body>
            <Form>
              {["name","description","price","stock","image"].map(field => (
                <Form.Group className="mb-2" key={field}>
                  <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                  <Form.Control
                    type={field==="price" || field==="stock" ? "number" : "text"}
                    value={newProduct[field]}
                    onChange={e => setNewProduct({...newProduct, [field]: field==="price"||field==="stock"? parseFloat(e.target.value) : e.target.value })}
                  />
                </Form.Group>
              ))}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button variant="warning" onClick={saveNewProduct}>Add Product</Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Edit Product Modal */}
      <Modal show={!!editProduct} onHide={() => setEditProduct(null)} centered>
        <Modal.Header closeButton><Modal.Title>Edit Product</Modal.Title></Modal.Header>
        <Modal.Body>
          {editProduct && (
            <Form>
              {["name","description","price","stock","image"].map(field => (
                <Form.Group className="mb-2" key={field}>
                  <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                  <Form.Control
                    type={field==="price" || field==="stock" ? "number" : "text"}
                    value={editProduct[field]}
                    onChange={e => setEditProduct({...editProduct, [field]: field==="price"||field==="stock"? parseFloat(e.target.value) : e.target.value })}
                  />
                </Form.Group>
              ))}
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditProduct(null)}>Cancel</Button>
          <Button variant="warning" onClick={saveEditProduct}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductsTable;
