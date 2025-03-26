const asyncHandler = require("express-async-handler");
const queries = require("../models/queries");

const getAllCategories = async (req, res) => {
  const categories = await queries.getAllCategories();
  res.render("./pages/all-categories", {
    title: "All categories",
    categories: categories,
  });
};

const getCategoryById = async (req, res) => {
  const id = req.params.categoryId;
  const category = await queries.getCategoryById(id);
  const categoryItems = await queries.getItemsByCategory(id);
  res.render("./pages/category", {
    title: `Category Id: ${req.params.categoryId}`,
    category: category,
    items: categoryItems,
  });
};

const getNewCategory = async (req, res) => {
  res.render("./pages/new-category", { title: "Add new category" });
};

const postNewCategory = async (req, res) => {
  console.log(req.body);
  await queries.insertCategory(req.body);
  res.redirect("/categories");
};

const updateCategoryGet = async (req, res) => {
  const category = await queries.getCategoryById(req.params.categoryId);
  res.render("./pages/update-category", {
    title: "Update category",
    category: category,
  });
};

const updateCategoryPost = async (req, res) => {
  const categoryId = req.params.categoryId;
  await queries.updateCategory(req.body, categoryId);
  res.redirect("/categories");
};

const deleteCategoryPost = async (req, res) => {
  const { categoryId } = req.params;
  await queries.deleteCategory(categoryId);
  res.redirect("/categories");
};

module.exports = {
  getAllCategories,
  getCategoryById,
  getNewCategory,
  postNewCategory,
  updateCategoryGet,
  updateCategoryPost,
  deleteCategoryPost,
};
