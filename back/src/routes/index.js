const { Router } = require("express")
const moviesController = require("../controllers/moviesControllers")

const indexRouter = Router()

indexRouter.get("/movies", moviesController.getMovies)

module.exports = indexRouter