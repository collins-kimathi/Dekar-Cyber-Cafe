# API Endpoints

Base URL: `/api`

Public:
- `GET /services`
- `GET /books`
- `POST /request`

Auth:
- `POST /register`
- `POST /login`

Business:
- `POST /bulk-order` (Bearer token)
- `GET /my-orders` (Bearer token)

Admin:
- `GET /admin/orders` (Bearer token, admin role)

## Next API Additions

- `PATCH /admin/orders/:id/status`
- `PATCH /admin/orders/:id/payment-status`
- `POST /admin/services`
- `PUT /admin/services/:id`
- `DELETE /admin/services/:id`
- `POST /admin/books`
- `PUT /admin/books/:id`
- `DELETE /admin/books/:id`
