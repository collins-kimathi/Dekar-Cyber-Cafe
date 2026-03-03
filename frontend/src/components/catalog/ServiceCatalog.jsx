import { useEffect, useState } from "react";
import { apiGet } from "../../services/api";

function ServiceCatalog() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    apiGet("/services")
      .then((data) => {
        setServices(data.items || []);
        setMessage("");
      })
      .catch((error) => {
        setServices([]);
        setMessage(error.message || "Could not load services.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <h2>Service Catalog</h2>
      {loading ? <p>Loading services...</p> : null}
      {message ? <p className="status status-error">{message}</p> : null}
      {services.length === 0 ? <p>No services yet.</p> : null}
      {services.map((service) => (
        <div key={service.id} className="list-item">
          <strong>{service.title}</strong>
          <p>{service.description}</p>
          <small>KES {service.price}</small>
        </div>
      ))}
    </div>
  );
}

export default ServiceCatalog;
