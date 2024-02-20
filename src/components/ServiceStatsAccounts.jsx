import React from "react";
import useServiceStats from "../hooks/useServiceStats";
import AuthSectionSpinner from "./AuthSectionSpinner";

const ServiceStatsAccounts = () => {
  const { totalAccounts, requestErrors } = useServiceStats();

  return (
    <article className="service-stats-accounts">
      <i className="bi bi-graph-up"></i>
      {requestErrors ? (
        <>
          <span>Error</span>
        </>
      ) : (
        <>
          <span>{totalAccounts ? totalAccounts : <AuthSectionSpinner />}</span>
          <h5>Usuarios Registrados</h5>
        </>
      )}
    </article>
  );
};

export default ServiceStatsAccounts;
