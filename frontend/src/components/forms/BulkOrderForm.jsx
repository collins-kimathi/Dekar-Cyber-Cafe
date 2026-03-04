// Import React hook for managing component state
import { useState } from "react";

// Import custom POST request helper function
import { apiPost } from "../../services/api";

function BulkOrderForm() {

  // Create state to store form data
  // Each property represents one input field
  const [form, setForm] = useState({
    organization: "",
    contactPerson: "",
    email: "",
    phone: "",
    service: "",
    quantity: 1,
    notes: ""
  });

  // State to store the result message (success or error)
  const [result, setResult] = useState("");

  // Function that runs when the form is submitted
  async function handleSubmit(event) {

    // Prevent page refresh (default form behavior)
    event.preventDefault();

    // Get stored authentication token from localStorage
    const token = localStorage.getItem("token");

    try {
      // Submit order using local data service and auth token
      const response = await apiPost("/bulk-order", form, token);

      // If successful, display the invoice ID returned from server
      setResult(`Invoice created: ${response.invoiceId}`);
    } catch {
      // If request fails, show error message
      setResult("Submit failed. Confirm login token.");
    }
  }

  return (
    // Form element with submit handler
    <form className="card bulk-form" onSubmit={handleSubmit}>

      <h2>Bulk Order / Tender</h2>

      {/* Organization name input */}
      <input
        placeholder="Organization Name"
        required
        onChange={(e) =>
          setForm({ ...form, organization: e.target.value })
        }
      />

      {/* Contact person input */}
      <input
        placeholder="Contact Person"
        required
        onChange={(e) =>
          setForm({ ...form, contactPerson: e.target.value })
        }
      />

      {/* Email input (HTML validates email format) */}
      <input
        type="email"
        placeholder="Email"
        required
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      {/* Phone number input */}
      <input
        placeholder="Phone"
        required
        onChange={(e) =>
          setForm({ ...form, phone: e.target.value })
        }
      />

      {/* Service type input */}
      <input
        placeholder="Service Type"
        required
        onChange={(e) =>
          setForm({ ...form, service: e.target.value })
        }
      />

      {/* Quantity input (must be at least 1) */}
      <input
        type="number"
        min="1"
        placeholder="Quantity"
        required
        onChange={(e) =>
          setForm({ ...form, quantity: Number(e.target.value) })
        }
      />

      {/* Optional notes textarea */}
      <textarea
        placeholder="Notes"
        onChange={(e) =>
          setForm({ ...form, notes: e.target.value })
        }
      />

      {/* Submit button */}
      <button type="submit">Submit Bulk Order</button>

      {/* Show result message only if it exists */}
      {result ? <p>{result}</p> : null}
    </form>
  );
}

export default BulkOrderForm;
