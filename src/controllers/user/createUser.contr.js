const bcrypt = require("bcryptjs");

const { Users } = require("../../db");

const createUser = async (req, res) => {
  try {
    const { email, password, photo, name, bio, phone, isLoginWithGoogle } =
      req.body;
    const roundsToHash = 10;

    if (email) {
      let userWillCreate = await Users.findOne({ where: { email: email } });

      if (userWillCreate) {
        res.send({
          msg: "User existing",
        });
      } else {
        if (isLoginWithGoogle) {
          let userCreatedWithGoogle = await Users.create({
            email: email,
            name: name ? name : email,
            photo: photo ? photo : "",
            bio: bio ? bio : `Bio de ${name}`,
            phone: phone ? phone : "",
            isWithGoogle: isLoginWithGoogle,
          });

          if (userCreatedWithGoogle) {
            res.send({
              user: userCreatedWithGoogle,
              msg: "User created successfull",
            });
          } else {
            res.send({
              msg: "Error to created account",
            });
          }
        } else {
          bcrypt.hash(password, roundsToHash, async (err, passwordCrypt) => {
            if (err) {
              console.log("error al hashear password", err);
            } else {
              let userCreated = await Users.create({
                email: email,
                password: passwordCrypt,
                name: name ? name : email,
                photo: photo ? photo : "",
                bio: bio ? bio : `Bio de ${name}`,
                phone: phone ? phone : "",
                isWithGoogle: isLoginWithGoogle,
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
