import { db } from "../../lib/db.js";
import { sendEmail } from "../../services/email/email.service.js";
import { env } from "../../config/env.js";

export async function createOpenRequest(req, res, next) {
  try {
    const { name, email, phone, service, details, quantity } = req.body;
    if (!name || !email || !phone || !service) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const item = {
      id: `or_${Date.now()}`,
      name,
      email,
      phone,
      service,
      details: details || "",
      quantity: Number(quantity || 1),
      timestamp: new Date().toISOString()
    };

    db.openRequests.push(item);

    await sendEmail({
      to: env.adminEmail,
      subject: `New Open Request: ${service}`,
      text: `${name} (${phone}) requested ${service}.`
    });

    res.status(201).json({ message: "Request received", item });
  } catch (error) {
    next(error);
  }
}
