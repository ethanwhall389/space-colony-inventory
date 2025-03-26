const asyncHandler = require("express-async-handler");
const { format } = require("date-fns");
const queries = require("../models/queries");

const getAllItems = async (req, res) => {
  const items = await queries.getAllItems();
  res.render("./pages/all-items", { title: "All items", items: items });
};

const getItemById = async (req, res) => {
  const id = req.params.itemId;
  const item = await queries.getItemById(id);
  const itemCategories = await queries.getCategoriesByItem(id);
  const formattedDate = format(item.added, "MMMM do, yyyy");
  res.render("./pages/item", {
    title: `Item Id: ${req.params.itemId}`,
    item: item,
    formattedDate: formattedDate,
    categories: itemCategories,
  });
};

const getNewItem = async (req, res) => {
  const categories = await queries.getAllCategories();
  res.render("./pages/new-item", {
    title: "Add new item to inventory",
    categories: categories,
  });
};

const postNewItem = async (req, res) => {
  console.log(req.body);
  const result = await queries.insertItem(req.body);
  const itemId = result.item_id;
  const categories = req.body.categories;
  if (categories)
    categories.forEach(async (catId) => {
      await queries.insertRelationItemCategory(itemId, catId);
    });
  res.redirect("/items");
};

const updateItemGet = async (req, res) => {
  const itemId = req.params.itemId;
  const item = await queries.getItemById(itemId);
  const allCategories = await queries.getAllCategories();
  const categoryIds = (await queries.getCategoryIdsByItem(itemId)).map(
    (cat) => cat.category_id
  );
  console.log(categoryIds);
  res.render("./pages/update-item", {
    title: "Update item",
    item: item,
    allCategories: allCategories,
    categoryIds: categoryIds,
  });
};

const updateItemPost = async (req, res) => {
  console.log(req.body);
  const itemId = req.params.itemId;
  await queries.updateItem(req.body, itemId);
  await queries.removeRelationItemCategory(itemId);
  req.body.categories.forEach(async (catId) => {
    await queries.insertRelationItemCategory(itemId, catId);
  });
  //update row based on item id
  //delete all relations that are using item id
  //add new relations
  res.redirect("/items");
};

const deleteItemPost = async (req, res) => {
  console.log(req.body);
  const itemId = req.params.itemId;
  await queries.deleteItem(itemId);
  res.redirect("/items");
};

module.exports = {
  getAllItems,
  getItemById,
  getNewItem,
  postNewItem,
  updateItemGet,
  updateItemPost,
  deleteItemPost,
};
