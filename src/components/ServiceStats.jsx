import React from "react";
import ServiceStatsAccounts from "./ServiceStatsAccounts";
import ServicesStatsTraffic from "./ServicesStatsTraffic";

const ServiceStats = () => {
  return (
    <section className="service-stats-container">
      <h3 className="service-stats-title">Estadisticas del servicio</h3>
      <div className="service-stats-row">
        <div className="service-stats-col">
          <ServiceStatsAccounts />
        </div>
        <div className="service-stats-col">
          <ServicesStatsTraffic />
        </div>
      </div>
    </section>
  );
};

export default ServiceStats;
