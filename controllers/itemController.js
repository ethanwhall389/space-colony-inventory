const asyncHandler = require("express-async-handler");
const {format} = require('date-fns');
const queries = require('../models/queries');

const getAllItems = async (req, res) => {
  const items = await queries.getAllItems();
  res.render("./pages/all-items", { title: "All items", items: items });
};

const getItemById = async (req, res) => {
  const id = req.params.itemId;
  const item = await queries.getItemById(id);
  const itemCategories = await queries.getCategoriesByItem(id);
  const formattedDate = format(item.added, 'MMMM do, yyyy');
  res.render("./pages/item", { title: `Item Id: ${req.params.itemId}`, item: item, formattedDate: formattedDate, categories: itemCategories, });
};

const getNewItem = async (req, res) => {
  res.render('./pages/new-item', {title: 'Add new item to inventory'});
}

const postNewItem = async (req, res) => {
  console.log(req.body);
  res.redirect('/items');
}

const updateItemGet = async (req, res) => {
  res.render('./pages/update-item', {title: 'Update item'});
}

const updateItemPost = async (req, res) => {
  console.log(req.body);
  res.redirect('/items');
}

module.exports = {
  getAllItems,
  getItemById,
  getNewItem,
  postNewItem,
  updateItemGet,
  updateItemPost,
};
