const asyncHandler = require("express-async-handler");

exports.getAllCategories = async (req, res) => {
  res.render("all-categories", { title: "All categories" });
};
