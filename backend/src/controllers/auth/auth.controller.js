import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../../lib/db.js";
import { env } from "../../config/env.js";

export async function register(req, res) {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (db.users.some((u) => u.email === email)) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    id: `u_${Date.now()}`,
    name,
    email,
    phone,
    passwordHash,
    role: "business"
  };
  db.users.push(user);
  return res.status(201).json({ message: "Registered" });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = db.users.find((u) => u.email === email);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ sub: user.id, role: user.role }, env.jwtSecret, { expiresIn: "1d" });
  return res.json({ token });
}
