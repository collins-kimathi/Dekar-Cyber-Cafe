import { Router } from "express";
import publicRoutes from "./public/public.routes.js";
import authRoutes from "./auth/auth.routes.js";
import orderRoutes from "./orders/order.routes.js";
import adminRoutes from "./admin/admin.routes.js";

const router = Router();
router.use(publicRoutes);
router.use(authRoutes);
router.use(orderRoutes);
router.use(adminRoutes);

export default router;
