import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      const savedUser = JSON.parse(localStorage.getItem("user"));

      // Demo credentials
      if (email === "admin@demo.com" && password === "123456") {
        localStorage.setItem("token", "demo_token_123456");

        Swal.fire({
          icon: "success",
          title: "Demo Login Successful",
        });

        navigate("/dashboard");
      }
      // If user signed up before
      else if (savedUser && savedUser.email === email) {
        localStorage.setItem("token", "user_token_123");

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome ${savedUser.name}`,
        });

        navigate("/dashboard");
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid credentials",
        });
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", backgroundColor: "#141414" }}>
      <div className="card shadow-lg" style={{ width: "100%", maxWidth: "400px", backgroundColor: "#222", borderColor: "#3b3b3b", borderRadius: "1rem" }}>
        <div className="card-body p-4">
          <h1 className="text-center mb-3" style={{ color: "#EBBE4D" }}>
            Crown Jewels
          </h1>

          <p className="text-center mb-3" style={{ color: "#636363", fontSize: "0.85rem" }}>
            Admin Login
          </p>

          {/* Demo hint */}
          <div className="mb-3 text-center" style={{ color: "#aaa", fontSize: "0.8rem" }}>
            Demo: <br />
            Email: <code>admin@demo.com</code> <br />
            Password: <code>123456</code>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="form-control mb-3"
              style={{ backgroundColor: "#141414", color: "#fff" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="form-control mb-4"
              style={{ backgroundColor: "#141414", color: "#fff" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="btn w-100" style={{ backgroundColor: "#EBBE4D", color: "#000" }} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-3" style={{ color: "#636363", fontSize: "0.8rem" }}>
            Don’t have an account?{" "}
            <span style={{ color: "#EBBE4D", cursor: "pointer" }} onClick={() => navigate("/signup")}>
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { login } from "../api/adminApi";

// export default function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (loading) return;

//     setLoading(true);

//     try {
//       const response = await login(email, password);

//       const userData = response.data; 

//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: `Welcome ${userData.name}`,
//       });

//       navigate("/dashboard", { replace: true });
//     } catch (err) {
//       const message =
//         err?.response?.data?.message ||
//         err?.response?.data ||
//         "Invalid email or password";

//       Swal.fire({
//         icon: "error",
//         title: "Authentication Failed",
//         text: message,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="d-flex align-items-center justify-content-center"
//       style={{ minHeight: "100vh", backgroundColor: "#141414" }}
//     >
//       <div
//         className="card shadow-lg"
//         style={{
//           width: "100%",
//           maxWidth: "400px",
//           backgroundColor: "#222222",
//           borderColor: "#3b3b3b",
//           borderRadius: "1rem",
//         }}
//       >
//         <div className="card-body p-4">
//           <h1 className="text-center mb-3" style={{ color: "#EBBE4D" }}>
//             Crown Jewels
//           </h1>
//           <p
//             className="text-center mb-4"
//             style={{ color: "#636363", fontSize: "0.85rem" }}
//           >
//             Admin Control Panel
//           </p>

//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="form-label" style={{ color: "#636363" }}>
//                 Email
//               </label>
//               <input
//                 type="email"
//                 className="form-control"
//                 style={{
//                   backgroundColor: "#141414",
//                   color: "#fff",
//                   borderColor: "#3b3b3b",
//                 }}
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label className="form-label" style={{ color: "#636363" }}>
//                 Password
//               </label>
//               <input
//                 type="password"
//                 className="form-control"
//                 style={{
//                   backgroundColor: "#141414",
//                   color: "#fff",
//                   borderColor: "#3b3b3b",
//                 }}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="btn w-100"
//               style={{ backgroundColor: "#EBBE4D", color: "#000" }}
//               disabled={loading}
//             >
//               {loading ? "Authenticating..." : "Sign In"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
