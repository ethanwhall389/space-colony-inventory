const asyncHandler = require("express-async-handler");

exports.getAllItems = async (req, res) => {
  res.render("all-items", { title: "All items" });
};
