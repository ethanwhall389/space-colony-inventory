const asyncHandler = require("express-async-handler");

const getAllItems = async (req, res) => {
  res.render("./pages/all-items", { title: "All items" });
};

const getItemById = async (req, res) => {
  res.render("./pages/item", { title: `Item Id: ${req.params.itemId}` });
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
