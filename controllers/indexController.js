const asyncHandler = require("express-async-handler");

const indexPageGet = async (req, res) => {
  res.render("./pages/index", { title: "Home" });
};

module.exports = {
  indexPageGet,
};
