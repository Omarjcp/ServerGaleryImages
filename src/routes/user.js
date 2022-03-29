const { Router } = require("express");
const createUser = require("../controllers/createUser.contr");

const router = Router();

//ruta create users
router.get("/", createUser);

module.exports = router;
