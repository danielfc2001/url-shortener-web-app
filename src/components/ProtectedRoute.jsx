import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { userAuthenticated } = useAuth();
  if (!userAuthenticated) return <Navigate to="/access/login"></Navigate>;
  return children;
};

export default ProtectedRoute;
