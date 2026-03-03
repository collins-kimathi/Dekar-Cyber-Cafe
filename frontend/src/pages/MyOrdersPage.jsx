import { useEffect, useState } from "react";
import { apiGet } from "../services/api";

function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    apiGet("/my-orders", token)
      .then((data) => {
        setOrders(data.items || []);
        setMessage("");
      })
      .catch((error) => {
        setOrders([]);
        setMessage(error.message || "Could not load orders.");
      });
  }, []);

  return (
    <section className="card">
      <h2>My Orders</h2>
      {message ? <p className="status status-error">{message}</p> : null}
      {orders.length === 0 ? <p>No orders yet.</p> : null}
      {orders.map((order) => (
        <div key={order.id} className="list-item">
          <strong>{order.organization}</strong>
          <p>Service: {order.service}</p>
          <p>Quantity: {order.quantity}</p>
          <p>Status: {order.status}</p>
          <p>Payment: {order.paymentStatus}</p>
          <p>Invoice: {order.invoiceId}</p>
        </div>
      ))}
    </section>
  );
}

export default MyOrdersPage;
