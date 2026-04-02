import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
const controller = require("../controllers/userController");

const router = Router();

router.get("/", verifyToken, controller.getUser);
router.post("/register", controller.postUser);
router.post("/login", controller.login);

export default router;
