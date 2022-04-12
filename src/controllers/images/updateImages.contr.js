const jwt = require("jsonwebtoken");
const { Images } = require("../../db");

const updateImages = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { id } = req.param;

    jwt.verify(req.token, "secretKey", async (err, data) => {
      if (err) {
        res.json({
          msg: "acceso denegado",
        });
      } else {
        if (id) {
          const imageDb = await Images.findOne({ where: { id } });

          if (imageDb) {
            await Images.update(
              {
                name: name ? name : imageDb.name,
                description: description ? description : imageDb.description,
              },
              {
                where: {
                  id,
                },
              }
            );

            res.send({
              msg: "Image update successfull",
            });
          } else {
            res.send({
              msg: "Image not found",
            });
          }
        } else {
          res.send({
            msg: "Id of image not found",
          });
        }
      }
    });
  } catch (error) {
    console.log("error al eliminar image", error);
  }
};

module.exports = updateImages;
