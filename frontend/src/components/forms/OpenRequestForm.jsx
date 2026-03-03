import { useState } from "react";
import { apiPost } from "../../services/api";

function OpenRequestForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", details: "", quantity: 1 });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await apiPost("/request", form);
      setMessage({ type: "success", text: "Request sent successfully." });
      setForm({ name: "", email: "", phone: "", service: "", details: "", quantity: 1 });
    } catch (error) {
      setMessage({ type: "error", text: error.message || "Could not send request." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Open Request</h2>
      <input placeholder="Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Phone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <input placeholder="Service" required value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} />
      <textarea placeholder="Details" value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} />
      <input
        type="number"
        min="1"
        placeholder="Quantity"
        value={form.quantity}
        onChange={(e) => setForm({ ...form, quantity: Math.max(1, Number(e.target.value || 1)) })}
      />
      <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Request Now"}</button>
      {message.text ? <p className={`status ${message.type === "success" ? "status-success" : "status-error"}`}>{message.text}</p> : null}
    </form>
  );
}

export default OpenRequestForm;
