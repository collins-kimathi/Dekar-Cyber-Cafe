import { Router } from "express";
import { createBulkOrder, getMyOrders } from "../../controllers/orders/order.controller.js";
import { requireAuth } from "../../middleware/auth.middleware.js";

const router = Router();
router.post("/bulk-order", requireAuth, createBulkOrder);
router.get("/my-orders", requireAuth, getMyOrders);

export default router;
