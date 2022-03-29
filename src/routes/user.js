const { Router } = require("express");
const createUser = require("../controllers/createUser.contr");

const router = Router();

//ruta create user
router.get("/", createUser);

module.exports = router;
