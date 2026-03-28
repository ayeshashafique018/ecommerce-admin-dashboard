import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { login } from "../api/adminApi";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const response = await login(email, password);

      const userData = response.data; 

      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Welcome ${userData.name}`,
      });

      navigate("/dashboard", { replace: true });
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data ||
        "Invalid email or password";

      Swal.fire({
        icon: "error",
        title: "Authentication Failed",
        text: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", backgroundColor: "#141414" }}
    >
      <div
        className="card shadow-lg"
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#222222",
          borderColor: "#3b3b3b",
          borderRadius: "1rem",
        }}
      >
        <div className="card-body p-4">
          <h1 className="text-center mb-3" style={{ color: "#EBBE4D" }}>
            Crown Jewels
          </h1>
          <p
            className="text-center mb-4"
            style={{ color: "#636363", fontSize: "0.85rem" }}
          >
            Admin Control Panel
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" style={{ color: "#636363" }}>
                Email
              </label>
              <input
                type="email"
                className="form-control"
                style={{
                  backgroundColor: "#141414",
                  color: "#fff",
                  borderColor: "#3b3b3b",
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label" style={{ color: "#636363" }}>
                Password
              </label>
              <input
                type="password"
                className="form-control"
                style={{
                  backgroundColor: "#141414",
                  color: "#fff",
                  borderColor: "#3b3b3b",
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn w-100"
              style={{ backgroundColor: "#EBBE4D", color: "#000" }}
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
