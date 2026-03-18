import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CLIENT");

  const handleSubmit = async (e) => {
    e.preventDefault(); // VERY IMPORTANT

    try {
      console.log("Sending data:", { email, password, role });

      const res = await API.post("/auth/register", {
        email,
        password,
        role,
      });

      console.log("Response:", res.data);

      alert("Registered successfully ✅");

      navigate("/login");
    } catch (error) {
      console.error("ERROR:", error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server not reachable");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="CLIENT">Client</option>
          <option value="FREELANCER">Freelancer</option>
        </select>
        <br /><br />

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}