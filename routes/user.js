import { Router } from "express";
const controller = require("../controllers/userController");

const router = Router();

router.post("/register", controller.postUser);
router.post("/login", controller.login);

export default router;
