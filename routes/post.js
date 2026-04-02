import { Router } from "express";
const controller = require("../controllers/postController");
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

router.post("/", verifyToken, controller.postBlog);
router.get("/", verifyToken, controller.getPosts);
router.get("/:postid", verifyToken, controller.getPost);
router.put("/:postid", verifyToken, controller.putPost);
router.delete("/:postid", verifyToken, controller.deletePost);

export default router;
