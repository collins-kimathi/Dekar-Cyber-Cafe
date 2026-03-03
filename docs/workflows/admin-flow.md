# Admin Flow

1. Admin logs in with `role=admin` account.
2. Admin opens dashboard and loads `GET /admin/orders`.
3. Admin reviews incoming bulk orders.
4. Admin updates status progression:
   - Pending
   - Processed
   - Completed
5. Admin updates payment state:
   - Unpaid
   - Paid
6. Admin manages books/services catalog (next phase CRUD endpoints).
7. Admin can resend invoice from stored invoice path.
