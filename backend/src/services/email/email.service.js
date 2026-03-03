export async function sendEmail({ to, subject, text }) {
  console.log("EMAIL", { to, subject, text });
  return true;
}
