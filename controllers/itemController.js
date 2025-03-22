const asyncHandler = require("express-async-handler");

const getAllItems = async (req, res) => {
  res.render("./pages/all-items", { title: "All items" });
};

const getItemById = async (req, res) => {
  res.render("./pages/item", { title: `Item Id: ${req.params.itemId}` });
};

module.exports = {
  getAllItems,
  getItemById,
};
