import db from "../models/index";
import CRUDservices from "../services/CRUDservices";
import Toastify from 'toastify-js'

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    console.log('-------------------------')
    console.log('data',data)
    console.log('--------------------------')
    return res.render("homePage.ejs", {
      data: JSON.stringify(data)
    });
  } catch (e) {
    console.log("co lỗi ở đây",e);
  }
};

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};

let getCRUD = (req, res) => {
  return res.render("crud.ejs");
}

let postCRUD = async(req, res) => {
   let message =  await CRUDservices.createNewUser(req.body);
   return res.send("hello crud");
}

let displayGetCRUD = async(req, res) => {
  let data = await CRUDservices.getAllUser();
return res.render("get_display_crud.ejs", {dataTable: data});
}
let getEditCRUD = async(req, res) => {
  let userId = req.query.id;
  if(userId) {
    let userData = await CRUDservices.getUserInforById(userId);
    return res.render("edit_crud.ejs", {
      user: userData
    })
  }else {
    return res.send("user not found")
  }
}

let putCRUD = async(req, res) => {
   let data = req.body;
   let allUser =  await CRUDservices.updateUserData(data);
   return res.render("get_display_crud.ejs", {dataTable: allUser});
}

let handleDeleteCRUD = async(req, res) => {
  let idUser = req.query.id;
  let deleteUser = await CRUDservices.deleteUserData(idUser);
  return res.send("Delete Success");
}
module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD, 
  displayGetCRUD: displayGetCRUD, 
  getEditCRUD: getEditCRUD, 
  putCRUD: putCRUD, 
  handleDeleteCRUD: handleDeleteCRUD
};
