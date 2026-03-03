# Bulk Order and Tender Flow

1. User logs in and receives JWT token.
2. User submits bulk order form with organization and quantity.
3. Backend validates required fields and positive quantity.
4. Backend creates order with initial status:
   - `status: Pending`
   - `paymentStatus: Unpaid`
5. Invoice PDF is generated and linked to order.
6. Confirmation email is sent to user with payment links.
7. Admin gets notification for real-time action.
8. User tracks updates from dashboard endpoint.

Payload:
```json
{
  "organization": "Sunrise Academy",
  "contactPerson": "Peter Mwangi",
  "email": "procurement@sunrise.ac.ke",
  "phone": "0722001122",
  "service": "Printing",
  "quantity": 400,
  "notes": "Deliver before Monday"
}
```
