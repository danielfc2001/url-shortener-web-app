import React from "react";
import BtnSavedUrlCard from "../BtnSavedUrlCard";
import DashboardUrlCardDeleteBtn from "./DashboardUrlCardDeleteBtn";
import DashboardUrlCardOptBtn from "./DashboardUrlCardOptBtn";
import LinkIcon from "../Icons/LinkIcon";
import LinkOffIcon from "../Icons/LinkOffIcon";

const DashboardSavedUrlCard = ({
  id,
  title = "Default Title",
  description = "Default Description",
  baseUrl,
  shortenedUrl,
  unlocked,
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
        <section className="flex flex-row items-center justify-end py-2 pe-3 mb-2 text-white bg-white/10 rounded-full border border-white/10">
          {unlocked ? (
            <>
              <LinkIcon width={20} height={20} />
              <span className="flex items-center text-sm">Desbloqueado</span>
            </>
          ) : (
            <>
              <LinkOffIcon width={20} height={20} />
              <span className="flex items-center text-sm">Bloqueado</span>
            </>
          )}
        </section>
        <DashboardUrlCardOptBtn id={id} />
      </div>
    </div>
  );
};

export default DashboardSavedUrlCard;
