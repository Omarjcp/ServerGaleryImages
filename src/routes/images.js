const { Router } = require("express");
const { createImage } = require("../controllers/images/createImages.contr");
const { getImages } = require("../controllers/images/getImages.contr");

const midAccToken = require("../midToken/midAccessToken");

const router = Router();

//route get images
router.get("/", getImages);

// route create images
router.post("/", midAccToken, createImage);

module.exports = router;
