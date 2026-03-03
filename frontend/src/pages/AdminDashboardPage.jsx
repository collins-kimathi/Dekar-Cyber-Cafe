import { useEffect, useState } from "react";
import { apiGet } from "../services/api";

function AdminDashboardPage() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    apiGet("/admin/orders", token)
      .then((data) => {
        setOrders(data.items || []);
        setMessage("");
      })
      .catch((error) => {
        setOrders([]);
        setMessage(error.message || "Could not load admin orders.");
      });
  }, []);

  return (
    <section className="card">
      <h2>Admin Dashboard</h2>
      {message ? <p className="status status-error">{message}</p> : null}
      {orders.length === 0 ? <p>No incoming orders.</p> : null}
      {orders.map((order) => (
        <div key={order.id} className="list-item">
          <strong>{order.organization}</strong>
          <p>{order.service} x {order.quantity}</p>
          <p>{order.status} | {order.paymentStatus}</p>
          <p>Contact: {order.contactPerson} ({order.phone})</p>
          <p>Invoice: {order.invoiceId}</p>
        </div>
      ))}
    </section>
  );
}

export default AdminDashboardPage;
