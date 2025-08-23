import { createContext, useContext, useReducer } from "react";
import { api } from "../services/api";

const MovieContext = createContext(null);

const initialState = {
  movies: [],
  loading: false,
  error: null,
};

function movieReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, movies: action.payload, loading: false };
    case "FETCH_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export function MovieProvider({ children }) {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  // Fetch movies from backend on mount
  const getAllMovies = async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const res = await api.get("/movies"); // backend: GET /api/movies
      dispatch({ type: "FETCH_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.message });
    }
  };

  // Add movie (local + backend)
  const addMovie = async (movie) => {
    try {
      await api.post("/movies", movie); // ✅ send to backend
      await getAllMovies();
      // dispatch({ type: "ADD_MOVIE", payload: res.data });
    } catch (err) {
      console.error("Failed to add movie:", err);
    }
  };

  // Remove movie (local + backend)
  const removeMovie = async (id) => {
    try {
      await api.delete(`/movies/${id}`); // ✅ delete from backend
      await getAllMovies();
      // dispatch({ type: "REMOVE_MOVIE", payload: id });
    } catch (err) {
      console.error("Failed to remove movie:", err);
    }
  };

  // Update movie (local + backend)
  const updateMovie = async (id, updates) => {
    try {
      await api.put(`/movies/${id}`, updates); // ✅ backend update
      // dispatch({ type: "UPDATE_MOVIE", payload: res.data }); // update state
      await getAllMovies();
    } catch (err) {
      console.error("Failed to update movie:", err);
    }
  };

  return (
    <MovieContext.Provider
      value={{ ...state, addMovie, removeMovie, updateMovie, getAllMovies }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export const useMovies = () => {
  const ctx = useContext(MovieContext);
  if (!ctx) throw new Error("useMovies must be used inside MovieProvider");
  return ctx;
};
