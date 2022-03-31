const { Images, Users } = require("../../db");

const getImages = async (req, res) => {
  try {
    const imagesDb = await Images.findAll({ include: Users });

    res.send({
      images: imagesDb,
    });
  } catch (err) {
    console.log("error al intentar loguear", err);
  }
};

module.exports = { getImages };
