import React from "react";
import { useShortener } from "../context/ShortenerContext";

const DashboardModalEditBtn = ({ type }) => {
  const { handleShowEditContentModal } = useShortener();
  const handleClick = (e) => {
    handleShowEditContentModal(type);
  };
  return (
    <button
      type="button"
      className="dashboard-modal-edit-btn"
      onClick={handleClick}
    >
      <i className="bi bi-pencil-square me-1"></i>
      Editar
    </button>
  );
};

export default DashboardModalEditBtn;
