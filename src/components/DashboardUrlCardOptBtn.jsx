import React from "react";
import { useShortener } from "../context/ShortenerContext";

const DashboardUrlCardOptBtn = ({ id }) => {
  const { handleShowModalCard } = useShortener();

  const handleClick = (e) => {
    handleShowModalCard(id);
  };
  return (
    <button className="dashboard-url-card-options-btn" onClick={handleClick}>
      <i className="bi bi-eye me-1"></i>Ver mas...
    </button>
  );
};

export default DashboardUrlCardOptBtn;
