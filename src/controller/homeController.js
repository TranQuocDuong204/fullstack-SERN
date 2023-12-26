import db from "../models/index";

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

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
};
