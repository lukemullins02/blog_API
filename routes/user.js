import { Router } from "express";
const controller = require("../controllers/userController");

const router = Router();

router.get("/", controller.getUser);
router.post("/", controller.postUser);

export default router;
