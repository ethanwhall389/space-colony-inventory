const { Router } = require("express");
const itemController = require("../controllers/itemController");

const itemRouter = Router();

itemRouter.get("/", itemController.getAllItems);
itemRouter.get("/:itemId", itemController.getItemById);

module.exports = itemRouter;
