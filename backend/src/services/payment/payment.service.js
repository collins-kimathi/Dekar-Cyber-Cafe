import { env } from "../../config/env.js";

export function getPaymentLinks() {
  return {
    mpesa: env.paymentMpesaLink,
    card: env.paymentCardLink
  };
}
