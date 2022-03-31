const bcrypt = require("bcryptjs");

const { Users } = require("../../db");

const createUser = async (req, res) => {
  try {
    const { email, password, photo, name, bio, phone } = req.body;
    const roundsToHash = 10;

    if (email && password && name) {
      let userWillCreate = await Users.findOne({ where: { email: email } });

      if (userWillCreate) {
        res.send({
          msg: "User existing",
        });
      } else {
        bcrypt.hash(password, roundsToHash, async (err, passwordCrypt) => {
          if (err) {
            console.log("error al hashear password", err);
          } else {
            let userCreated = await Users.create({
              email: email,
              password: passwordCrypt,
              name: name,
              photo: photo ? photo : "",
              bio: bio ? bio : `Bio de ${name}`,
              phone: phone ? phone : "",
            });

            if (userCreated) {
              res.send({
                user: userCreated,
                msg: "User created successfull",
              });
            } else {
              res.send({
                msg: "Error to created account",
              });
            }
          }
        });
      }
    } else {
      res.send({
        msg: "missing data to create the account",
      });
    }
  } catch (err) {
    console.log("error al intentar crear cuenta", err);
  }
};

module.exports = { createUser };
