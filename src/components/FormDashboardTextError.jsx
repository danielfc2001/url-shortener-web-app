import React from "react";

const FormDashboardTextError = ({ message }) => {
  return (
    <div className="shortener-form-user-error">
      <i className="bi bi-exclamation-circle me-1"></i>
      {message}
    </div>
  );
};

export default FormDashboardTextError;
