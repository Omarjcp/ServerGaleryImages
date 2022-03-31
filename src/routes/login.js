const { Router } = require("express");
const singIn = require("../controllers/login.contr");

const router = Router();

//ruta login
router.post("/", singIn);

module.exports = router;
