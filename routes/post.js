import { Router } from "express";
const controller = require("../controllers/postController");
import verifyToken from "../middleware/verifyToken";

const router = Router();

router.post("/", controller.postBlog);
router.get("/", verifyToken, controller.getPosts);
router.get("/:postid", controller.getPost);
router.put("/:postid", controller.putPost);
router.delete("/:postid", controller.deletePost);

export default router;
