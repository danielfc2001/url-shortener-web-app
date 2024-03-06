import React from "react";
import BtnSavedUrlCard from "../BtnSavedUrlCard";
import DashboardUrlCardDeleteBtn from "./DashboardUrlCardDeleteBtn";
import DashboardUrlCardOptBtn from "./DashboardUrlCardOptBtn";

const DashboardSavedUrlCard = ({
  id,
  title = "Default Title",
  description = "Default Description",
  baseUrl,
  shortenedUrl,
}) => {
  return (
    <div className="dashboard-url-card col-md-4">
      <div className="dashboard-shortened-card">
        <DashboardUrlCardDeleteBtn id={id} />
        <h5>{title}</h5>
        <p>{description}</p>
        <div>
          <span>Base:</span>
          <p>{baseUrl}</p>
          <span className="dashboard-card-btn-group">
            <BtnSavedUrlCard type={"copy"} href={baseUrl} />
            <BtnSavedUrlCard type={"link"} href={baseUrl} />
          </span>
        </div>
        <div>
          <span>Short:</span>
          <p>{shortenedUrl}</p>
          <span className="dashboard-card-btn-group">
            <BtnSavedUrlCard type={"copy"} href={shortenedUrl} />
            <BtnSavedUrlCard type={"link"} href={shortenedUrl} />
          </span>
        </div>
        <DashboardUrlCardOptBtn id={id} />
      </div>
    </div>
  );
};

export default DashboardSavedUrlCard;
