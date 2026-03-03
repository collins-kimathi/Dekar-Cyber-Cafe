import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

const invoicesDir = path.resolve("uploads", "invoices");

export async function generateInvoice(order) {
  const invoiceId = `INV-${Date.now()}`;
  if (!fs.existsSync(invoicesDir)) fs.mkdirSync(invoicesDir, { recursive: true });

  const filepath = path.join(invoicesDir, `${invoiceId}.pdf`);
  const doc = new PDFDocument();
  const stream = fs.createWriteStream(filepath);
  doc.pipe(stream);

  doc.fontSize(18).text("Dekar Cyber Cafe Invoice");
  doc.moveDown();
  doc.fontSize(12).text(`Invoice ID: ${invoiceId}`);
  doc.text(`Organization: ${order.organization}`);
  doc.text(`Service: ${order.service}`);
  doc.text(`Quantity: ${order.quantity}`);
  doc.text(`Issued: ${new Date().toISOString()}`);
  doc.end();

  await new Promise((resolve) => stream.on("finish", resolve));
  return { invoiceId, path: filepath };
}
