import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: Number(process.env.PORT || 4000),
  jwtSecret: process.env.JWT_SECRET || "change_me",
  adminEmail: process.env.ADMIN_EMAIL || "admin@example.com",
  paymentMpesaLink: process.env.PAYMENT_MPESA_LINK || "",
  paymentCardLink: process.env.PAYMENT_CARD_LINK || ""
};
