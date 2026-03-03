import { useState } from "react";
import { apiPost } from "../../services/api";

function BulkOrderForm() {
  const [form, setForm] = useState({ organization: "", contactPerson: "", email: "", phone: "", service: "", quantity: 1, notes: "" });
  const [result, setResult] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await apiPost("/bulk-order", form, token);
      setResult(`Invoice created: ${response.invoiceId}`);
    } catch {
      setResult("Submit failed. Confirm login token.");
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Bulk Order / Tender</h2>
      <input placeholder="Organization Name" required onChange={(e) => setForm({ ...form, organization: e.target.value })} />
      <input placeholder="Contact Person" required onChange={(e) => setForm({ ...form, contactPerson: e.target.value })} />
      <input type="email" placeholder="Email" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Phone" required onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <input placeholder="Service Type" required onChange={(e) => setForm({ ...form, service: e.target.value })} />
      <input type="number" min="1" placeholder="Quantity" required onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} />
      <textarea placeholder="Notes" onChange={(e) => setForm({ ...form, notes: e.target.value })} />
      <button type="submit">Submit Bulk Order</button>
      {result ? <p>{result}</p> : null}
    </form>
  );
}

export default BulkOrderForm;
