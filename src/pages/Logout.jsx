import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const { logoutUser } = useAuth();
  useEffect(() => {
    logoutUser();
  }, []);
  return <Navigate to={"/"} />;
};

export default Logout;
