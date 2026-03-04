import { useState } from "react";
import { apiPost } from "../../services/api";

function OpenRequestForm() {

  // Form state – stores all input field values
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    details: "",
    quantity: 1
  });

  // Message state – used for showing success or error feedback
  // type: "success" or "error"
  // text: message content
  const [message, setMessage] = useState({ type: "", text: "" });

  // Tracks whether the form is currently submitting
  // Used to disable button and show loading text
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function runs when form is submitted
  async function handleSubmit(event) {

    // Prevent page refresh
    event.preventDefault();

    // Set loading state to true
    setIsSubmitting(true);

    try {
      // Submit request using local data service
      await apiPost("/request", form);

      // If successful, show success message
      setMessage({
        type: "success",
        text: "Request sent successfully."
      });

      // Reset form fields after success
      setForm({
        name: "",
        email: "",
        phone: "",
        service: "",
        details: "",
        quantity: 1
      });

    } catch (error) {
      // If request fails, show error message
      setMessage({
        type: "error",
        text: error.message || "Could not send request."
      });
    } finally {
      // Stop loading state (runs whether success or error)
      setIsSubmitting(false);
    }
  }

  return (
    // Form container with submit handler
    <form className="card request-form" onSubmit={handleSubmit}>
      <h2>Open Request</h2>

      {/* Name input */}
      <input
        placeholder="Name"
        required
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      {/* Email input (HTML handles email validation) */}
      <input
        type="email"
        placeholder="Email"
        required
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      {/* Phone input */}
      <input
        placeholder="Phone"
        required
        value={form.phone}
        onChange={(e) =>
          setForm({ ...form, phone: e.target.value })
        }
      />

      {/* Service input */}
      <input
        placeholder="Service"
        required
        value={form.service}
        onChange={(e) =>
          setForm({ ...form, service: e.target.value })
        }
      />

      {/* Optional details textarea */}
      <textarea
        placeholder="Details"
        value={form.details}
        onChange={(e) =>
          setForm({ ...form, details: e.target.value })
        }
      />

      {/* Quantity input (minimum value enforced as 1) */}
      <input
        type="number"
        min="1"
        placeholder="Quantity"
        value={form.quantity}
        onChange={(e) =>
          setForm({
            ...form,
            quantity: Math.max(1, Number(e.target.value || 1))
          })
        }
      />

      {/* Submit button – disabled while submitting */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Request Now"}
      </button>

      {/* Conditional message display */}
      {message.text ? (
        <p
          className={`status ${
            message.type === "success"
              ? "status-success"
              : "status-error"
          }`}
        >
          {message.text}
        </p>
      ) : null}
    </form>
  );
}

export default OpenRequestForm;
