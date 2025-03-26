const { Router } = require("express");
const itemController = require("../controllers/itemController");

const itemRouter = Router();

// itemRouter.get("?search", (req, res) => console.log("search req"));
// itemRouter.get("/", (req, res) => console.log(req.query));
itemRouter.get("/", itemController.getAllItems);

itemRouter.get("/new", itemController.getNewItem);
itemRouter.post("/new", itemController.postNewItem);

itemRouter.get("/:itemId/update", itemController.updateItemGet);
itemRouter.post("/:itemId/update", itemController.updateItemPost);

itemRouter.post("/:itemId/delete", itemController.deleteItemPost);

itemRouter.get("/:itemId", itemController.getItemById);

module.exports = itemRouter;
