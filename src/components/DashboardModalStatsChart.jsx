import React, { useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import useDashboardModalStats from "../hooks/useDashboardModalStats";
import { createChartComponent } from "../utils/createChartComponent";

const DashboardModalStatsChart = ({ id }) => {
  const { weekTraffic, requestError, isPending } = useDashboardModalStats(id);
  const element = document.getElementById("chart");

  useEffect(() => {
    if (weekTraffic.length > 0) {
      let options = {
        xAxis: {
          type: "category",
          data: weekTraffic.reverse().map((el) => el.date),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: weekTraffic.reverse().map((el) => el.count),
            type: "line",
          },
        ],
      };
      createChartComponent(element, options);
    }
  }, [weekTraffic]);

  return (
    <div className="dashboard-modal-chart-container">
      {requestError ? (
        <div className="dashboard-modal-chart-error">
          A ocurrido un error al cargar el gráfico
        </div>
      ) : (
        <>
          {isPending && <ScaleLoader color="#53a7ae" height={50} />}
          <div id="chart"></div>
        </>
      )}
    </div>
  );
};

export default DashboardModalStatsChart;
