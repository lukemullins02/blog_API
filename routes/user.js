import { Router } from "express";
import controller from "../controllers/userController.js";

const router = Router();

router.post("/register", controller.postUser);
router.post("/login", controller.login);

export default router;
