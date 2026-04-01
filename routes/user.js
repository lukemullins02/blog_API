import { Router } from "express";
const controller = require("../controllers/userController");

const router = Router();

router.post("/", controller.postUser);

export default router;
