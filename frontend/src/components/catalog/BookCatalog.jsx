import { useEffect, useState } from "react";
import { apiGet } from "../../services/api";

function BookCatalog() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    apiGet("/books")
      .then((data) => {
        setBooks(data.items || []);
        setMessage("");
      })
      .catch((error) => {
        setBooks([]);
        setMessage(error.message || "Could not load books.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <h2>Book Catalog</h2>
      {loading ? <p>Loading books...</p> : null}
      {message ? <p className="status status-error">{message}</p> : null}
      {books.length === 0 ? <p>No books yet.</p> : null}
      {books.map((book) => (
        <div key={book.id} className="list-item">
          <strong>{book.title}</strong>
          <p>{book.syllabus}</p>
          <small>KES {book.price}</small>
        </div>
      ))}
    </div>
  );
}

export default BookCatalog;
