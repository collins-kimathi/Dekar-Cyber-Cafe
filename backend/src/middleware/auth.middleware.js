import jwt from "jsonwebtoken";
import { db } from "../lib/db.js";
import { env } from "../config/env.js";

export function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const token = header.replace("Bearer ", "");
    const payload = jwt.verify(token, env.jwtSecret);
    const user = db.users.find((item) => item.id === payload.sub);
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    req.user = { id: user.id, role: user.role, email: user.email };
    return next();
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

export function requireAdmin(req, res, next) {
  return requireAuth(req, res, () => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    return next();
  });
}
