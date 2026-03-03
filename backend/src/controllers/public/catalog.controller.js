import { db } from "../../lib/db.js";

export function getBooks(_req, res) {
  res.json({ items: db.books });
}

export function getServices(_req, res) {
  res.json({ items: db.services });
}
