import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import Layout from "../pages/Layout";

const PrivateRoutes = ({ children }) => {
  const { isAuthenticated, status } = useAuth();
  if (status === "authenticating") return null;
  return isAuthenticated ? (
    <Layout>{children}</Layout>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoutes;
