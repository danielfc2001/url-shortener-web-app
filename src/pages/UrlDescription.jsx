import { useParams } from "react-router-dom";
import DashboardEditInput from "../components/UrlDescriptionComponents/DashboardEditInput";
import DashboardLinkTimestamp from "../components/UrlDescriptionComponents/DashboardLinkTimestamp";
import DashboardLinkLockedBtn from "../components/UrlDescriptionComponents/DashboardLinkLockedBtn";
import DashboardDescriptionField from "../components/UrlDescriptionComponents/DashboardDescriptionField";
import useDashboardModal from "../hooks/useDashboardModal";
import DashboardTrafficCharts from "../components/UrlDescriptionComponents/DashboardTrafficCharts";

const UrlDescription = () => {
  const params = useParams();
  const { id } = params;
  const { data, modalEditActive } = useDashboardModal(id);
  return (
    <>
      <div className="dashboard-description-row">
        <div className="dashboard-description-col">
          <h5 className="dashboard-modal-edit-title">Editar campos</h5>
          <DashboardDescriptionField
            id={"modalTitleContent"}
            content={data.title != null ? data.title : "Default Title"}
            type={"title"}
          >
            {modalEditActive === "title" && (
              <DashboardEditInput id={id} type="title" />
            )}
          </DashboardDescriptionField>
          <DashboardDescriptionField
            id={"modalDescriptionContent"}
            content={
              data.description != null
                ? data.description
                : "Default Description"
            }
            type={"description"}
          >
            {modalEditActive === "description" && (
              <DashboardEditInput id={id} type="description" />
            )}
          </DashboardDescriptionField>

          <DashboardDescriptionField
            id={"modalUrlContent"}
            content={data.baseUrl != null ? data.baseUrl : "Not Url Found"}
            type={"baseUrl"}
          >
            {modalEditActive === "baseUrl" && (
              <DashboardEditInput id={id} type="baseUrl" />
            )}
          </DashboardDescriptionField>
          <div className="dashboard-field-content">
            <span>
              Enlace Acortado:{" "}
              {data.shortUrl != null ? data.shortUrl : "Not Url Found"}
            </span>
          </div>
          <DashboardLinkLockedBtn id={id} />
        </div>
        <div className="dashboard-description-col">
          <h5 className="dashboard-modal-edit-title">Informacion util</h5>
          <DashboardLinkTimestamp id={id} />
        </div>
      </div>
      <DashboardTrafficCharts id={id} />
    </>
  );
};

export default UrlDescription;
