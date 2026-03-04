import { useState } from "react";
import { apiPost } from "../services/api";

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const data = await apiPost("/login", form);
      localStorage.setItem("token", data.token);
      setMessage("Login successful.");
    } catch {
      setMessage("Login failed.");
    }
  }

  return (
    <form className="card auth-form" onSubmit={handleSubmit}>
      <h2>Business Login</h2>
      <input type="email" placeholder="Email" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Login</button>
      {message ? <p>{message}</p> : null}
    </form>
  );
}

export default LoginPage;
