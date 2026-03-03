# Open-Access Flow

1. Trigger: user clicks Request Now on any public service.
2. Frontend validates name, email, phone, and service.
3. Frontend posts payload to `POST /request`.
4. Backend stores record in `openRequests` collection/table.
5. Backend sends notification email to admin inbox.
6. Frontend shows success popup and optional next-step instructions.

Payload:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "0712345678",
  "service": "Passport Application Help",
  "details": "Need help uploading documents",
  "quantity": 1
}
```
