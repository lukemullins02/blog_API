import { Router } from "express";
const controller = require("../controllers/postController");

const router = Router();

router.post("/", controller.postBlog);
router.get("/", controller.getPosts);
router.get("/:postid", controller.getPost);
router.put("/:postid", controller.putPost);
router.delete("/:postid", controller.deletePost);

export default router;
