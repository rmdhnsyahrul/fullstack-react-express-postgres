import { useEffect, useState } from "react";
import { useMovies } from "../providers/MovieProvider";

export default function MovieList() {
  const {
    movies,
    loading,
    error,
    removeMovie,
    updateMovie,
    getAllMovies,
    addMovie,
  } = useMovies();
  const [editId, setEditId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [createMovie, setCreateMovie] = useState(false);

  useEffect(() => {
    getAllMovies();
  }, []);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (movies.length === 0) return <p>No movies found.</p>;

  const handleUpdate = async (id) => {
    await updateMovie(id, { title: newTitle, description: newDescription });
    setEditId(null);
    setNewTitle("");
    setNewDescription("");
  };

  const handleCreate = async () => {
    await addMovie({ title: newTitle, description: newDescription });
    setCreateMovie(false);
    setNewTitle("");
    setNewDescription("");
  };

  return (
    <>
      <button onClick={() => setCreateMovie(true)}>💾 Add</button>
      {createMovie ? (
        <>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <button onClick={handleCreate}>💾 Save</button>
          <button onClick={() => setCreateMovie(false)}>Cancel</button>
        </>
      ) : (
        <ul>
          {movies.map((m) => (
            <li key={m.id}>
              {editId === m.id ? (
                <>
                  <input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                  <input
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                  <button onClick={() => handleUpdate(m.id)}>💾 Save</button>
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <h1>{m.title}</h1>
                  <p>{m.description}</p>
                  <span>{m.imdbrating}</span>
                  <button onClick={() => removeMovie(m.id)}>❌</button>
                  <button
                    onClick={() => {
                      setEditId(m.id);
                      setNewTitle(m.title);
                      setNewDescription(m.description);
                    }}
                  >
                    ✏️ Edit
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
