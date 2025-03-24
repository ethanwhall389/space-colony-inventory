const asyncHandler = require("express-async-handler");

const getAllCategories = async (req, res) => {
  res.render("./pages/all-categories", { title: "All categories" });
};

const getCategoryById = async (req, res) => {
  res.render("./pages/category", {
    title: `Category Id: ${req.params.categoryId}`,
  });
};

const getNewCategory = async (req, res) => {
  res.render('./pages/new-category', {title: 'Add new category'});
}

const postNewCategory = async (req, res) => {
  console.log(req.body);
  res.redirect('/categories');
}

module.exports = {
  getAllCategories,
  getCategoryById,
  getNewCategory,
  postNewCategory,
};
