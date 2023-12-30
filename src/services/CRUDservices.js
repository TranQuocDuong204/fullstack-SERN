import bcrypt from "bcryptjs";
import db from "../models/index";
var salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
        phonenumber: data.phonenumber,
        positionId: data.positionId,
        image: data.image,
      });
      resolve("ok create new user");
    } catch (e) {
      reject(e);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let getUserInforById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: true,
      });
      if (user) {
        let updatedUser = await db.User.update(
          {
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
          },
          {
            where: { id: data.id },
          }
        );
        if (updatedUser) {
          let allUser = await db.User.findAll();
          resolve(allUser);
        } else {
          resolve("Không thể cập nhật người dùng");
        }
      } else {
        resolve("Người dùng không tồn tại");
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUserData = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id},
        raw: false,
      });

      if (user) {
        await user.destroy();
        let allUser = await db.User.findAll();
        resolve(allUser);
      } else {
        resolve("Khong ton tai");
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInforById: getUserInforById,
  updateUserData: updateUserData,
  deleteUserData: deleteUserData,
};
