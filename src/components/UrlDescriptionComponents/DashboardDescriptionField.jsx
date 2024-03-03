import DashboardEditBtn from "./DashboardEditBtn";

const FIELDS_NAMES = {
  title: "Titulo: ",
  description: "Descripcion: ",
  baseUrl: "Enlace: ",
};

const DashboardDescriptionField = ({ id, content, type, children }) => {
  return (
    <div id={id} className="dashboard-field-content">
      <span>
        {FIELDS_NAMES[type]} {content}
      </span>
      <span>
        <DashboardEditBtn type={type} target={id} />
      </span>
      {children}
    </div>
  );
};

export default DashboardDescriptionField;
