const { Router } = require("express");
const categoryController = require("../controllers/categoryController");

const categoryRouter = Router();

categoryRouter.get("/", categoryController.getAllCategories);

categoryRouter.get('/new', categoryController.getNewCategory);
categoryRouter.post('/new', categoryController.postNewCategory);

categoryRouter.get("/:categoryId", categoryController.getCategoryById);

module.exports = categoryRouter;
