const { Router } = require("express");
const itemController = require("../controllers/indexController");

const itemRouter = Router();

itemRouter.get("/", itemController.getAllItems);
itemRouter.get("/:itemId", itemController.getItemById);

module.exports = indexRouter;
