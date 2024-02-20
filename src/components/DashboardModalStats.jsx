import React from "react";
import useDashboardModalStats from "../hooks/useDashboardModalStats";
import AuthSectionSpinner from "./AuthSectionSpinner";

const DashboardModalStats = ({ id }) => {
  const { todayTraffic } = useDashboardModalStats(id);
  return (
    <div className="dashboard-modal-stats">
      <span>
        Redirecciones de hoy:{" "}
        {todayTraffic >= 0 ? todayTraffic : <AuthSectionSpinner />}
      </span>
    </div>
  );
};

export default DashboardModalStats;
