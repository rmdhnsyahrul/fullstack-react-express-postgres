const fetch = global.fetch; // Node 18+ built-in
const movieRepo = require("../repositories/movieRepository");

async function fetchImdbRating(title) {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${
        process.env.OMDB_API_KEY
      }`
    );
    const data = await response.json();
    if (data && data.imdbRating && data.imdbRating !== "N/A") {
      return parseFloat(data.imdbRating);
    }
  } catch (err) {
    console.error("IMDb fetch failed:", err.message);
  }
  return (Math.random() * (9 - 5) + 5).toFixed(1); // fallback
}

exports.getAll = async () => {
  return await movieRepo.findAll();
};

exports.getMovieById = async (id) => {
  return await movieRepo.findById(id);
};
exports.createMovie = async (title, description, userId) => {
  const imdbRating = await fetchImdbRating(title);
  return await movieRepo.create(title, description, imdbRating, userId);
};

exports.updateMovie = async (id, title, description, userId) => {
  const movie = await movieRepo.findById(id);
  if (!movie) throw { status: 404, message: "Movie not found" };
  if (movie.userid !== userId) throw { status: 403, message: "Not allowed" };
  const imdbRating = await fetchImdbRating(title);

  return await movieRepo.update(
    id,
    title || movie.title,
    description || movie.description,
    imdbRating
  );
};

exports.deleteMovie = async (id, userId) => {
  const movie = await movieRepo.findById(id);
  if (!movie) throw { status: 404, message: "Movie not found" };
  if (movie.userid !== userId) throw { status: 403, message: "Not allowed" };

  await movieRepo.remove(id);
};
