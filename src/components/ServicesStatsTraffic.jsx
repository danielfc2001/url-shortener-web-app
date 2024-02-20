import React from "react";
import useServiceStats from "../hooks/useServiceStats";
import AuthSectionSpinner from "./AuthSectionSpinner";

const ServicesStatsTraffic = () => {
  const { todayTraffic, requestErrors } = useServiceStats();
  return (
    <article className="service-stats-accounts">
      <i className="bi bi-arrow-down-up"></i>
      {requestErrors ? (
        <>
          <span>Error</span>
        </>
      ) : (
        <>
          <span>{todayTraffic ? todayTraffic : <AuthSectionSpinner />}</span>
          <h5>Redirecciones entrantes hoy</h5>
        </>
      )}
    </article>
  );
};

export default ServicesStatsTraffic;
