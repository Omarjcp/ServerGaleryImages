const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Users } = require("../db");

const singIn = async (req, res) => {
  try {
    const { email, password, isWithGoogle } = req.body;

    if (isWithGoogle) {
      let userGoogleDb = await Users.findOne({ where: { email } });

      if (userGoogleDb) {
        let token = jwt.sign({ email }, "secretKey");

        res.send({
          token: token,
          msg: "Login with google successfull",
        });
      } else {
        res.json({
          msg: "Invalid credentials",
        });
      }
    } else {
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
      } else {
        res.json({
          msg: "Email and password are required",
        });
      }
    }
  } catch (err) {
    console.log("error al intentar loguear", err);
  }
};

module.exports = singIn;
