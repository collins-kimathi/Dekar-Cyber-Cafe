# End-to-End Workflow

1. Public visitor opens homepage.
2. Visitor browses services and books from `GET /services` and `GET /books`.
3. Visitor sends open request via `POST /request`.
4. Business client creates account via `POST /register`.
5. Business client signs in via `POST /login` and receives JWT.
6. Business client submits tender/bulk request via `POST /bulk-order`.
7. System generates PDF invoice and stores path on order.
8. System sends invoice confirmation email and admin notification.
9. Business client checks status on `GET /my-orders`.
10. Admin monitors all orders via `GET /admin/orders`.
