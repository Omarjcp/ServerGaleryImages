const { Images } = require("../../db");

const deleteImages = async (req, res) => {
  try {
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
            await Images.destroy({ where: { id } });

            res.send({
              msg: "Image delete successfull",
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

module.exports = deleteImages;
