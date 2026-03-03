import { Router } from "express";
import { getAllOrders } from "../../controllers/admin/admin.controller.js";
import { requireAdmin } from "../../middleware/auth.middleware.js";

const router = Router();
router.get("/admin/orders", requireAdmin, getAllOrders);

export default router;
