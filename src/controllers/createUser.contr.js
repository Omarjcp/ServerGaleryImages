const jwt = require("jsonwebtoken");

// const { Users } = require("../../db");

const createUser = async (req, res) => {
  try {
    res.send("crear usuario");
  } catch (err) {
    console.log("error al intentar loguear", err);
  }
};

module.exports = createUser;
