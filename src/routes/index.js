const { Router } = require("express");

const user = require("./user");
const login = require("./login");
const image = require("./images");

const router = Router();

router.use("/user", user);
router.use("/login", login);
router.use("/image", image);

module.exports = router;
