import { useState } from "react";
import API from "../services/api";
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  //  updated function
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const res = await API.post("/auth/login", form);

      const token = res.data.access_token;

      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);

      // Save role
      localStorage.setItem("role", decoded.role);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          autoComplete="current-password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* submit */}
        <button type="submit">Login</button>
      </form>

      <p>
        Don’t have an account? <Link to="/">Register</Link>
      </p>
    </div>
  );
}