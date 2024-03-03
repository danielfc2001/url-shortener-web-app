import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import DashboardModalEditInput from "./DashboardModalEditInput";
import DashboardModalTimestamp from "./DashboardModalTimestamp";
import DashboardModalLockedBtn from "./DashboardModalLockedBtn";
import DashboardModalDescriptionField from "./DashboardModalDescriptionField";
import useDashboardModal from "../hooks/useDashboardModal";
import DashboardModalStats from "./DashboardModalStats";

const DashboardModalCard = ({ id }) => {
  const element = document.getElementById("appContainer");
  return ReactDOM.createPortal(<Modal id={id} />, element, id);
};

export default DashboardModalCard;

const Modal = ({ id }) => {
  const [state, setState] = useState("");
  const { data, modalEditActive, handleCloseModal } = useDashboardModal(id);

  useEffect(() => {
    setState("d-block show");
  }, []);

  return (
    <>
      <div
        className={`dashboard-modal-card modal fade ${state}`}
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="dashboard-modal">
            <span className="dashboard-modal-exit">
              <button
                type="button"
                className="dashboard-modal-exit-btn"
                onClick={handleCloseModal}
                aria-label="Close"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </span>
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
                  content={
                    data.baseUrl != null ? data.baseUrl : "Not Url Found"
                  }
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
                <h5 className="dashboard-modal-edit-title mt-2">
                  Estadisticas
                </h5>
                <DashboardModalStats id={id} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`modal-backdrop fade ${state}`}></div>
    </>
  );
};
