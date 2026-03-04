import { useState } from "react";
import { apiPost } from "../services/api";

function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await apiPost("/register", form);
      setMessage("Registration successful.");
    } catch {
      setMessage("Registration failed.");
    }
  }

  return (
    <form className="card auth-form" onSubmit={handleSubmit}>
      <h2>Create Business Account</h2>
      <input placeholder="Name" required onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input type="email" placeholder="Email" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Phone" required onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <input type="password" placeholder="Password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Register</button>
      {message ? <p>{message}</p> : null}
    </form>
  );
}

export default RegisterPage;
