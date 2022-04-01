const jwt = require("jsonwebtoken");
const { Users } = require("../../db");

const updateUser = async (req, res) => {
  try {
    const { email, password, name, bio, photo, phone } = req.body;
    const { id } = req.params;

    jwt.verify(req.token, "secretKey", async (err, data) => {
      if (err) {
        res.json({
          msg: "acceso denegado",
        });
      } else {
        if (id) {
          const userDb = await Users.findOne({ where: { id } });

          if (userDb && userDb.isWithGoogle) {
            await Users.update(
              {
                email: email ? email : userDb.email,
                name: name ? name : userDb.name,
                bio: bio ? bio : userDb.bio,
                photo: photo ? photo : userDb.photo,
                phone: phone ? phone : userDb.phone,
              },
              {
                where: {
                  id,
                },
              }
            );
            res.send({
              msg: "User of google update successfull",
            });
          } else if (userDb && !userDb.isWithGoogle) {
            let roundsToHash = 10;
            bcrypt.hash(password, roundsToHash, async (err, passwordCrypt) => {
              if (err) {
                console.log("error al hashear password", err);
              } else {
                await Users.update(
                  {
                    email: email ? email : userDb.email,
                    name: name ? name : userDb.name,
                    bio: bio ? bio : userDb.bio,
                    photo: photo ? photo : userDb.photo,
                    phone: phone ? phone : userDb.phone,
                    password: password ? passwordCrypt : userDb.password,
                  },
                  {
                    where: {
                      id,
                    },
                  }
                );
                res.send({
                  msg: "User update successfull",
                });
              }
            });
          }
        }
      }
    });
  } catch (err) {
    console.log("error al intentar loguear", err);
  }
};

module.exports = {
  updateUser,
};
