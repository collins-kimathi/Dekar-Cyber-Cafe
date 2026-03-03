import { Router } from "express";
import { createOpenRequest } from "../../controllers/public/request.controller.js";
import { getBooks, getServices } from "../../controllers/public/catalog.controller.js";

const router = Router();
router.get("/books", getBooks);
router.get("/services", getServices);
router.post("/request", createOpenRequest);

export default router;
