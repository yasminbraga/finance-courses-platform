const express = require("express");
const routes = express.Router();

const CoursesController = require("./controllers/CoursesController");

routes.get("/", CoursesController.index);
routes.get("/courses/create", CoursesController.create);
routes.get("/courses/:id", CoursesController.show);
routes.get("/courses/edit/:id", CoursesController.edit);

routes.post("/courses", CoursesController.post);
routes.put("/courses", CoursesController.update);
routes.delete("/courses", CoursesController.delete);

module.exports = routes;
