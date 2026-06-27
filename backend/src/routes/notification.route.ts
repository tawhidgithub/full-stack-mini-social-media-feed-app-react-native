import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import { savePushToken } from "../controllers/notification.controller";

const router = Router();

router.post("/notifications/token", authMiddleware, savePushToken);

export default router;
