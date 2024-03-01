import React from "react";
import { useParams } from "react-router-dom";
import DashboardModalEditInput from "../components/DashboardModalEditInput";
import DashboardModalTimestamp from "../components/DashboardModalTimestamp";
import DashboardModalLockedBtn from "../components/DashboardModalLockedBtn";
import DashboardModalDescriptionField from "../components/DashboardModalDescriptionField";
import DashboardModalStats from "../components/DashboardModalStats";
import useDashboardModal from "../hooks/useDashboardModal";

const UrlDescription = () => {
  const params = useParams();
  const { id } = params;
  const { data, modalEditActive } = useDashboardModal(id);

  return (
    <>
      <div className="dashboard-modal-row">
        <div className="dashboard-modal-col">
          <h5 className="dashboard-modal-edit-title">Editar campos</h5>
          <DashboardModalDescriptionField
            id={"modalTitleContent"}
            content={data.title != null ? data.title : "Default Title"}
            type={"title"}
          />
          {modalEditActive === "title" && (
            <DashboardModalEditInput type="title" />
          )}
          <DashboardModalDescriptionField
            id={"modalDescriptionContent"}
            content={
              data.description != null
                ? data.description
                : "Default Description"
            }
            type={"description"}
          />
          {modalEditActive === "description" && (
            <DashboardModalEditInput type="description" />
          )}
          <DashboardModalDescriptionField
            id={"modalUrlContent"}
            content={data.baseUrl != null ? data.baseUrl : "Not Url Found"}
            type={"baseUrl"}
          />
          {modalEditActive === "baseUrl" && (
            <DashboardModalEditInput type="baseUrl" />
          )}
          <div className="dashboard-modal-content">
            <span>
              Enlace Acortado:{" "}
              {data.shortUrl != null ? data.shortUrl : "Not Url Found"}
            </span>
          </div>
          <DashboardModalLockedBtn id={id} />
        </div>
        <div className="dashboard-modal-col">
          <h5 className="dashboard-modal-edit-title">Informacion util</h5>
          <DashboardModalTimestamp id={id} />
          <h5 className="dashboard-modal-edit-title mt-2">Estadisticas</h5>
          <DashboardModalStats id={id} />
        </div>
      </div>
      {/* <DashboardModalStatsChart id={id} /> */}
    </>
  );
};

export default UrlDescription;
