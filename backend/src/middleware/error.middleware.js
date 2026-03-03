export function errorHandler(error, _req, res, _next) {
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
}
