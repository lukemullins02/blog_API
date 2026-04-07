const { Router } = require("express");
const controller = require("../controllers/postController");
const verifyToken = require("../middleware/verifyToken");

const router = Router();

router.post("/", verifyToken, controller.postBlog);
router.get("/", verifyToken, controller.getPosts);
router.get("/:postid", verifyToken, controller.getPost);
router.put("/:postid", verifyToken, controller.putPost);
router.delete("/:postid", verifyToken, controller.deletePost);
router.put("/:postid/publish", verifyToken, controller.putPublish);

module.exports = router;
