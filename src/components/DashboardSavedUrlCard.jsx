import React from "react";
import BtnSavedUrlCard from "./BtnSavedUrlCard";
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
        <span>
          {baseUrl}
          <span>
            <BtnSavedUrlCard type={"copy"} href={baseUrl} />
            <BtnSavedUrlCard type={"link"} href={baseUrl} />
          </span>
        </span>
        <span>
          {shortenedUrl}
          <span>
            <BtnSavedUrlCard type={"copy"} href={shortenedUrl} />
            <BtnSavedUrlCard type={"link"} href={shortenedUrl} />
          </span>
        </span>
        <DashboardUrlCardOptBtn id={id} />
      </div>
    </div>
  );
};

export default DashboardSavedUrlCard;
