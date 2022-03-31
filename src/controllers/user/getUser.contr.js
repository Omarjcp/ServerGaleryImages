const jwt = require("jsonwebtoken");
const { Users, Images } = require("../../db");

const getUsers = async (req, res) => {
  try {
    const usersDb = await Users.findAll({ include: Images });
    res.send(usersDb);
  } catch (err) {
    console.log("error al intentar loguear", err);
  }
};

const getUserForId = async (req, res) => {
  try {
    const { id } = req.params;

    jwt.verify(req.token, "secretKey", async (err, data) => {
      if (err) {
        res.json({
          msg: "acceso denegado",
        });
      } else {
        const userEmail = await Users.findOne({
          where: {
            id,
          },
          include: Images,
        });
        res.json({
          user: userEmail,
        });
      }
    });
  } catch (err) {
    console.log("error al obtener datos de usuario segun email", err);
  }
};

module.exports = { getUsers, getUserForId };
