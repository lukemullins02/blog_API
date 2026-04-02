import { Router } from "express";
const controller = require("../controllers/commentController");

const router = Router();

router.post("/", controller.postComment);
router.get("/", controller.getComments);
router.get("/:commentid", controller.getComment);
router.put("/:commentid", controller.putComment);
router.delete("/:commentid", controller.deleteComment);

export default router;
