const { Router } = require("express");
const indexController = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", (req, res) => res.send("Hello World!"));

module.exports = indexRouter;
