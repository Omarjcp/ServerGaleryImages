const jwt = require("jsonwebtoken");
const { Images } = require("../../db");

const createImage = async (req, res) => {
  try {
    const { image, name, description, userId } = req.body;

    jwt.verify(req.token, "secretKey", async (err, data) => {
      if (err) {
        res.json({
          msg: "acceso denegado",
        });
      } else {
        if (image && name) {
          const imageCreated = await Images.create({
            image,
            name,
            description: description ? description : name,
            userId,
          });

          if (imageCreated) {
            res.send({
              data: imageCreated,
              msg: "image created successfull",
            });
          }
        } else {
          res.send({
            msg: "All fields are required",
          });
        }
      }
    });
  } catch (err) {
    console.log("error al crear imagen", err);
  }
};

module.exports = {
  createImage,
};
