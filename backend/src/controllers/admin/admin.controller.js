import { db } from "../../lib/db.js";

export function getAllOrders(_req, res) {
  res.json({ items: db.bulkOrders });
}
