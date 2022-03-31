const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Users } = require("../db");

const singIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email && password) {
      let userDb = await Users.findOne({ where: { email } });

      let isPasswordOfUser = await bcrypt.compare(password, userDb.password);

      if (userDb && isPasswordOfUser) {
        let token = jwt.sign({ email }, "secretKey");
        res.send({
          token: token,
          msg: "Login successfull",
        });
      } else {
        res.json({
          msg: "Invalid credentials",
        });
      }
    }
  } catch (err) {
    console.log("error al intentar loguear", err);
  }
};

module.exports = singIn;
