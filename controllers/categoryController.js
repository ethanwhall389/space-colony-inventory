const asyncHandler = require("express-async-handler");

const getAllCategories = async (req, res) => {
  res.render("./pages/all-categories", { title: "All categories" });
};

const getCategoryById = async (req, res) => {
  res.render("./pages/category", {
    title: `Category Id: ${req.params.categoryId}`,
  });
};

module.exports = {
  getAllCategories,
  getCategoryById,
};
