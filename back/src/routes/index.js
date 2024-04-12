const { Router } = require("express");
const moviesController = require("../controllers/moviesControllers");
const year4Digit = require("../middleware/year4Digit");
const indexRouter = Router();

indexRouter.get("/movies", moviesController.getMovies);

indexRouter.get("/movies/title", moviesController.getByTitleController);

indexRouter.get("/movies/:id", moviesController.getByIdController);

indexRouter.post("/movies", year4Digit, moviesController.createMovie);

module.exports = indexRouter;
