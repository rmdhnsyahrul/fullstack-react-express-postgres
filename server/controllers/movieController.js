const { validationResult } = require("express-validator");
const movieService = require("../services/movieService");

exports.get_all_movies = async (req, res, next) => {
  try {
    const movies = await movieService.getAll();

    res.status(200).json({
      errors: false,
      message: "Success",
      data: movies,
    });
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};

exports.get_movie_by_id = async (req, res, next) => {
  try {
    const movies = await movieService.getMovieById(req.params.id);

    res.status(200).json({
      errors: false,
      message: "Success",
      data: {
        movies: movies.rows,
      },
    });
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};

exports.create_movie = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { title, description } = req.body;
    const movie = await movieService.createMovie(
      title,
      description,
      req.userId
    );

    res.status(201).json({
      errors: false,
      message: "Movie created",
      data: { movie },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateMovie = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const movie = await movieService.updateMovie(
      req.params.id,
      title,
      description,
      req.userId
    );

    res.json({
      errors: false,
      message: "Movie updated",
      data: { movie },
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteMovie = async (req, res, next) => {
  try {
    await movieService.deleteMovie(req.params.id, req.userId);
    res.json({
      errors: false,
      message: "Movie deleted",
    });
  } catch (err) {
    next(err);
  }
};
