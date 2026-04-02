import { Router } from "express";
const controller = require("../controllers/commentController");

const router = Router();

router.post("/:postid/comments", controller.postComment);
router.get("/:postid/comments", controller.getComments);
router.get("/:postid/comments/:commentid", controller.getComment);
router.put("/:postid/comments/:commentid", controller.putComment);
router.delete("/:postid/comments/:commentid", controller.deleteComment);

export default router;
