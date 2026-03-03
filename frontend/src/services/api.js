import { seedData } from "../data/seedData";

const STORAGE_KEY = "dekar_cyber_cafe_db_v1";
const NETWORK_DELAY_MS = 220;

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function wait() {
  return new Promise((resolve) => {
    setTimeout(resolve, NETWORK_DELAY_MS);
  });
}

function readDb() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
      return clone(seedData);
    }

    const parsed = JSON.parse(raw);
    return {
      users: Array.isArray(parsed.users) ? parsed.users : clone(seedData.users),
      services: Array.isArray(parsed.services) ? parsed.services : clone(seedData.services),
      books: Array.isArray(parsed.books) ? parsed.books : clone(seedData.books),
      sermons: Array.isArray(parsed.sermons) ? parsed.sermons : clone(seedData.sermons),
      openRequests: Array.isArray(parsed.openRequests) ? parsed.openRequests : [],
      orders: Array.isArray(parsed.orders) ? parsed.orders : []
    };
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
    return clone(seedData);
  }
}

function writeDb(db) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

function createId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function createInvoiceId() {
  return `INV-${Date.now().toString().slice(-8)}`;
}

function toToken(user) {
  return btoa(JSON.stringify({ userId: user.id, role: user.role }));
}

export function getUserFromToken(token) {
  if (!token) return null;

  try {
    const decoded = JSON.parse(atob(token));
    const db = readDb();
    return db.users.find((user) => user.id === decoded.userId) || null;
  } catch {
    return null;
  }
}

function requireUser(token) {
  const user = getUserFromToken(token);
  if (!user) throw new Error("You must login first.");
  return user;
}

function requireAdmin(token) {
  const user = requireUser(token);
  if (user.role !== "admin") throw new Error("Admin access required.");
  return user;
}

function normalizeEmail(email = "") {
  return email.trim().toLowerCase();
}

export async function apiGet(path, token) {
  await wait();
  const db = readDb();

  if (path === "/services") return { items: db.services };
  if (path === "/books") return { items: db.books };
  if (path === "/sermons") return { items: db.sermons };

  if (path === "/my-orders") {
    const user = requireUser(token);
    const orders = db.orders
      .filter((order) => order.userId === user.id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return { items: orders };
  }

  if (path === "/admin/orders") {
    requireAdmin(token);
    const orders = [...db.orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return { items: orders };
  }

  throw new Error(`Unknown GET endpoint: ${path}`);
}

export async function apiPost(path, payload, token) {
  await wait();
  const db = readDb();

  if (path === "/register") {
    const email = normalizeEmail(payload?.email);
    if (!email) throw new Error("Email is required.");

    if (db.users.some((user) => normalizeEmail(user.email) === email)) {
      throw new Error("Account with this email already exists.");
    }

    const newUser = {
      id: createId("u"),
      name: payload.name?.trim() || "Business User",
      email,
      phone: payload.phone?.trim() || "",
      password: payload.password || "",
      role: "business",
      createdAt: new Date().toISOString()
    };

    db.users.push(newUser);
    writeDb(db);
    return { message: "Registration successful." };
  }

  if (path === "/login") {
    const email = normalizeEmail(payload?.email);
    const password = payload?.password || "";

    const user = db.users.find((item) => normalizeEmail(item.email) === email && item.password === password);
    if (!user) throw new Error("Invalid login credentials.");

    return {
      token: toToken(user),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }

  if (path === "/request") {
    const request = {
      id: createId("req"),
      name: payload.name?.trim() || "",
      email: normalizeEmail(payload.email),
      phone: payload.phone?.trim() || "",
      service: payload.service?.trim() || "",
      details: payload.details?.trim() || "",
      quantity: Number(payload.quantity || 1),
      createdAt: new Date().toISOString(),
      status: "Received"
    };

    db.openRequests.push(request);
    writeDb(db);
    return { message: "Request submitted." };
  }

  if (path === "/bulk-order") {
    const user = requireUser(token);
    const quantity = Number(payload.quantity || 1);

    const order = {
      id: createId("ord"),
      userId: user.id,
      organization: payload.organization?.trim() || "",
      contactPerson: payload.contactPerson?.trim() || "",
      email: normalizeEmail(payload.email) || user.email,
      phone: payload.phone?.trim() || "",
      service: payload.service?.trim() || "",
      quantity,
      notes: payload.notes?.trim() || "",
      status: "Pending Review",
      paymentStatus: "Pending Payment",
      invoiceId: createInvoiceId(),
      createdAt: new Date().toISOString()
    };

    db.orders.push(order);
    writeDb(db);
    return { invoiceId: order.invoiceId, orderId: order.id };
  }

  throw new Error(`Unknown POST endpoint: ${path}`);
}
