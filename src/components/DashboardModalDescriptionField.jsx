import React from "react";
import DashboardModalEditBtn from "./DashboardModalEditBtn";

const FIELDS_NAMES = {
  title: "Titulo: ",
  description: "Descripcion: ",
  baseUrl: "Enlace: ",
};

const DashboardModalDescriptionField = ({ id, content, type }) => {
  return (
    <div id={id} className="dashboard-modal-content">
      <span>
        {FIELDS_NAMES[type]} {content}
      </span>
      <span>
        <DashboardModalEditBtn type={type} target={id} />
      </span>
    </div>
  );
};

export default DashboardModalDescriptionField;
