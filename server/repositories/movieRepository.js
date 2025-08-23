const pool = require("../db/db");

exports.findAll = async () => {
  const result = await pool.query("SELECT * FROM movies ORDER BY id DESC");

  return result.rows || null;
};

exports.findById = async (id) => {
  const result = await pool.query("SELECT * FROM movies WHERE id=$1", [id]);
  return result.rows[0] || null;
};

exports.create = async (title, description, imdbRating, userId) => {
  const result = await pool.query(
    "INSERT INTO movies (title, description, imdbRating, userId) VALUES ($1, $2, $3, $4) RETURNING *",
    [title, description, imdbRating, userId]
  );
  return result.rows[0];
};

exports.update = async (id, title, description, imdbRating) => {
  const result = await pool.query(
    `UPDATE movies 
     SET title = $1, description = $2, imdbRating = $3
     WHERE id = $3 RETURNING *`,
    [title, description, imdbRating, id]
  );
  return result.rows[0];
};

exports.remove = async (id) => {
  await pool.query("DELETE FROM movies WHERE id=$1", [id]);
};
