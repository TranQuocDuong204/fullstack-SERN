import db from "../models/index";
import bcrypt from "bcryptjs";
let handleUserLogin = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);

      if (isExist) {
        userData.errCode = 0;
        userData.errMessage = "User exists";
        let user = await db.User.findOne({
          attributes: ['email', 'roleId', 'password'],
          where: { email: email },
          raw: true         
        });
        if (user) {
          //compare password
          // bcrypt.compareSync(someOtherPlaintextPassword, hash); // false
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "ok";
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "user not found";
        }
      } else {
        userData.errCode = 1;
        userData.errMessage =
          "Your Email isnt exist in your system. Plz try other Email";
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = async (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
};
