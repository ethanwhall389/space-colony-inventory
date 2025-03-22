const { Router } = require("express");
const categoryController = require("../controllers/indexController");

const categoryRouter = Router();

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/:categoryId", categoryController.getCategoryById);

module.exports = indexRouter;
