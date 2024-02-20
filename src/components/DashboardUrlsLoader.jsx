import React from "react";
import { ScaleLoader } from "react-spinners";

const DashboardUrlsLoader = () => {
  return (
    <div className="dashboard-url-loader">
      <ScaleLoader color="#53a7ae" height={50} />
      <span>Cargando datos...</span>
    </div>
  );
};

export default DashboardUrlsLoader;
