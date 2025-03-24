const { Router } = require("express");
const itemController = require("../controllers/itemController");

const itemRouter = Router();

itemRouter.get("/", itemController.getAllItems);

itemRouter.get('/new', itemController.getNewItem);
itemRouter.post('/new', itemController.postNewItem);

itemRouter.get('/:itemId/update', itemController.updateItemGet);
itemRouter.post('/:itemId/update', itemController.updateItemPost);

itemRouter.get("/:itemId", itemController.getItemById);

module.exports = itemRouter;
