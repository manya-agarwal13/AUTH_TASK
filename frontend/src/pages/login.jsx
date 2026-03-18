import { useState } from "react";
import API from "../services/api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const res = await API.post("/auth/login", form);

    const token = res.data.access_token;

    localStorage.setItem("token", token);

    const decoded = jwtDecode(token);

    // Save role
    localStorage.setItem("role", decoded.role);

    navigate("/dashboard");
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

          <button onClick={handleLogin}>Login</button>
          
          <p>
  Don’t have an account? <Link to="/">Register</Link>
</p>
    </div>
  );
}