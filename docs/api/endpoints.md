# API Endpoints

These routes are handled by the frontend local data service in `frontend/src/services/api.js`.

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
