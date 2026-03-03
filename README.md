# Dekar Cyber Cafe and e-Services Hub

React frontend + Node/Express backend scaffold for:
- Open-access service requests
- Business login and bulk orders
- PDF invoice generation
- Admin order visibility

## Project Structure

```text
Dekar-Cyber-Cafe/
  frontend/
    src/
      components/
      pages/
      services/
      styles/
  backend/
    src/
      controllers/
      middleware/
      routes/
      services/
      lib/
    uploads/invoices/
  docs/
    workflows/
    api/
```

## Quick Start

1. Backend
```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

2. Frontend
```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

3. Open in browser
```text
Frontend: http://localhost:5173
Backend API: http://localhost:4000/api
```

## Core Workflow

1. Public user submits `POST /request`.
2. Business user registers/logs in and gets JWT.
3. Authenticated user submits `POST /bulk-order`.
4. Backend generates invoice PDF in `backend/uploads/invoices`.
5. User tracks via `GET /my-orders`.
6. Admin checks all via `GET /admin/orders`.

See detailed flow docs under `docs/workflows/`.
