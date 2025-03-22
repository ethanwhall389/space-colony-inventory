const asyncHandler = require("express-async-handler");

exports.indexPageGet = async (req, res) => {
  res.render("index", { title: "Home" });
};
