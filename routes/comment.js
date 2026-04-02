import { Router } from "express";
const controller = require("../controllers/commentController");
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

router.post("/:postid/comments", verifyToken, controller.postComment);
router.get("/:postid/comments", verifyToken, controller.getComments);
router.get("/:postid/comments/:commentid", verifyToken, controller.getComment);
router.put("/:postid/comments/:commentid", verifyToken, controller.putComment);
router.delete(
  "/:postid/comments/:commentid",
  verifyToken,
  controller.deleteComment,
);

export default router;
