import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardUrlCardOptBtn = ({ id }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate(`/user-dashboard/url/${id}`);
  };
  return (
    <button className="dashboard-url-card-options-btn" onClick={handleClick}>
      <i className="bi bi-eye me-1"></i>Ver mas...
    </button>
  );
};

export default DashboardUrlCardOptBtn;
