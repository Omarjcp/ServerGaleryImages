const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Users, Images } = require("../db");

const singIn = async (req, res) => {
  try {
    const { email, password, isWithGoogle, name, photo } = req.body;

    if (isWithGoogle) {
      let userGoogleDb = await Users.findOne({
        where: { email },
        include: Images,
      });

      if (userGoogleDb) {
        let token = jwt.sign({ email }, "secretKey");

        res.send({
          token: token,
          user: userGoogleDb,
          msg: "Login with google successfull",
        });
      } else {
        let userCreatedWithGoogle = await Users.create({
          email: email,
          name: name ? name : email,
          photo: photo ? photo : "",
          bio: `Bio de ${name}`,
          phone: "",
          isWithGoogle: isWithGoogle,
        });

        if (userCreatedWithGoogle) {
          let token = jwt.sign({ email }, "secretKey");
          res.send({
            token: token,
            user: userCreatedWithGoogle,
            msg: "Login successfull",
          });
        } else {
          res.send({
            msg: "Error to sign in",
          });
        }
      }
    } else {
      if (email && password) {
        let userDb = await Users.findOne({ where: { email } });

        let isPasswordOfUser = await bcrypt.compare(password, userDb.password);

        if (userDb && isPasswordOfUser) {
          let token = jwt.sign({ email }, "secretKey");
          res.send({
            token: token,
            user: userDb,
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
