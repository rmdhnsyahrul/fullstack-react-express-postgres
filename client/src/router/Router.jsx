import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoutes from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";

function Router() {
  return (
    <Routes>
      {/* Redirect from '/' to '/dashboard' */}
      {/* <Route path="/" element={<Navigate to="/movies" replace />} /> */}
      <Route
        path="/"
        element={
          <PrivateRoutes>
            <Home />
          </PrivateRoutes>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default Router;
