import { db } from "../../lib/db.js";
import { generateInvoice } from "../../services/invoice/invoice.service.js";
import { sendEmail } from "../../services/email/email.service.js";
import { env } from "../../config/env.js";

export async function createBulkOrder(req, res, next) {
  try {
    const { organization, contactPerson, email, phone, service, quantity, notes } = req.body;
    if (!organization || !contactPerson || !email || !phone || !service || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const order = {
      id: `bo_${Date.now()}`,
      userId: req.user.id,
      organization,
      contactPerson,
      email,
      phone,
      service,
      quantity: Number(quantity),
      notes: notes || "",
      status: "Pending",
      paymentStatus: "Unpaid",
      invoiceId: "",
      invoicePath: "",
      timestamp: new Date().toISOString()
    };

    const invoice = await generateInvoice(order);
    order.invoiceId = invoice.invoiceId;
    order.invoicePath = invoice.path;
    db.bulkOrders.push(order);

    await sendEmail({
      to: email,
      subject: `Invoice ${invoice.invoiceId}`,
      text: `Your invoice is ready. Mpesa: ${env.paymentMpesaLink} Card: ${env.paymentCardLink}`
    });

    await sendEmail({
      to: env.adminEmail,
      subject: `New Bulk Order ${order.id}`,
      text: `${organization} placed a bulk order for ${service}.`
    });

    return res.status(201).json({ message: "Bulk order created", invoiceId: invoice.invoiceId, order });
  } catch (error) {
    return next(error);
  }
}

export function getMyOrders(req, res) {
  const items = db.bulkOrders.filter((order) => order.userId === req.user.id);
  return res.json({ items });
}
