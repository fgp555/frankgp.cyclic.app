const movieService = require("../services/movieService");

const moviesController = {
  getMovies: async (req, res) => {
    res.json(movieService.getData());
  },
};

module.exports = moviesController;
