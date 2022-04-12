const { Router } = require("express");
const { createImage } = require("../controllers/images/createImages.contr");
const deleteImages = require("../controllers/images/deleteImages.contr");
const { getImages } = require("../controllers/images/getImages.contr");
const updateImages = require("../controllers/images/updateImages.contr");

const midAccToken = require("../midToken/midAccessToken");

const router = Router();

//route get images
router.get("/", getImages);

// route create images
router.post("/", midAccToken, createImage);

//route update images
router.post("/:id", midAccToken, updateImages);

//route delete images
router.delete("/:id", midAccToken, deleteImages);

module.exports = router;
