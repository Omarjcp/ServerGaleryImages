const { Router } = require("express");
const { createUser } = require("../controllers/user/createUser.contr");
const { getUsers, getUserForId } = require("../controllers/user/getUser.contr");
const { updateUser } = require("../controllers/user/updateUser.contr");
const midAccToken = require("../midToken/midAccessToken");

const router = Router();

//route get user
router.get("/", getUsers);

//route get user for email
router.get("/:id", midAccToken, getUserForId);

//route create user
router.post("/", createUser);

//route update user
router.put("/:id", updateUser);

module.exports = router;
