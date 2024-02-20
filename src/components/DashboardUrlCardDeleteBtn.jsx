import React from "react";
import { useShortener } from "../context/ShortenerContext";

const DashboardUrlCardDeleteBtn = ({ id }) => {
  const { deleteUserShortenedUrl } = useShortener();
  const handleClick = (e) => {
    if (confirm("Esta seguro que desea eliminar el elemento seleccionado?.")) {
      deleteUserShortenedUrl(id);
    }
  };
  return (
    <button
      type="button"
      className="dashboard-url-card-delete-btn"
      onClick={handleClick}
    >
      <i className="bi bi-trash-fill"></i>
    </button>
  );
};

export default DashboardUrlCardDeleteBtn;
