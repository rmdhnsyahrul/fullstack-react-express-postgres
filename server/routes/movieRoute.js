const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const { body } = require("express-validator");

router.get("", movieController.get_all_movies);
router.get("/:id", movieController.get_movie_by_id);
router.post(
  "",
  [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ max: 255 })
      .withMessage("Title must be at most 255 characters"),
    body("description")
      .optional()
      .isLength({ max: 1000 })
      .withMessage("Description too long"),
  ],
  movieController.create_movie
);
router.put(
  "/:id",
  [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ max: 255 })
      .withMessage("Title must be at most 255 characters"),
    body("description")
      .optional()
      .isLength({ max: 1000 })
      .withMessage("Description too long"),
  ],
  movieController.updateMovie
);
router.delete("/:id", movieController.deleteMovie);

module.exports = router;
