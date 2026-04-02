const { Router } = require("express");
const controller = require("../controllers/userController");

const router = Router();

router.post("/register", controller.postUser);
router.post("/login", controller.login);

module.exports = router;
