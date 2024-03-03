import { useEffect, useState } from "react";
import useDashboardUrlStats from "../../hooks/useDashboardUrlStats";
import ShortenerResultsMessage from "../ShortenerResultsMessage";
import * as ChartJs from "chart.js/auto";
import DashboardUrlsLoader from "../DashboardUrlsLoader";

const DashboardTrafficCharts = ({ id }) => {
  const [totalRequest, setTotalRequest] = useState({
    weekRequest: 0,
    monthRequest: 0,
  });
  const { isLoading, isError, linkStats } = useDashboardUrlStats(id);

  useEffect(() => {
    const weekCanvas = document.getElementById("chartWeek");
    const monthCanvas = document.getElementById("chartMonth");
    if (!isLoading && !isError) {
      setTotalRequest({
        weekRequest: linkStats.lastWeek
          .filter((el) => el.value != 0)
          .reduce(
            (prevValue, currValue) => prevValue + parseInt(currValue.value),
            0
          ),
        monthRequest: linkStats.lastMonth
          .filter((el) => el.value != 0)
          .reduce(
            (prevValue, currValue) => prevValue + parseInt(currValue.value),
            0
          ),
      });
      const weekData = {
        labels: linkStats?.lastWeek?.reverse().map((el) => el.time),
        datasets: [
          {
            label: "Day Traffic",
            data: linkStats?.lastWeek?.reverse().map((el) => el.value),
            borderColor: "#53a7ae",
            backgroundColor: "#fff",
          },
        ],
      };
      const weekConfig = {
        type: "line",
        data: weekData,
        options: {
          responsive: true,
        },
      };
      const monthData = {
        labels: linkStats?.lastMonth?.reverse().map((el) => el.time),
        datasets: [
          {
            label: "Day Traffic",
            data: linkStats?.lastMonth?.reverse().map((el) => el.value),
            borderColor: "#53a7ae",
            backgroundColor: "#fff",
          },
        ],
      };
      const monthConfig = {
        type: "line",
        data: monthData,
        options: {
          responsive: true,
        },
      };
      ChartJs.Chart.register(ChartJs.LineController);
      const weekChart = new ChartJs.Chart(weekCanvas, weekConfig);
      const monthChart = new ChartJs.Chart(monthCanvas, monthConfig);
      return () => {
        weekChart.destroy();
        monthChart.destroy();
      };
    }
  }, [isLoading]);
  return (
    <div className="dashboard-chart-container">
      {isLoading && <DashboardUrlsLoader />}
      {!isLoading && isError && (
        <ShortenerResultsMessage
          type={"error"}
          message={
            isError.message ?? "A ocurrido un error al cargar los graficos."
          }
        />
      )}
      {!isLoading && !isError && linkStats && (
        <>
          <div className="dashboard-chart">
            <h3>Tráfico semanal:</h3>
            <canvas id="chartWeek"></canvas>
            <span>Total de solicitudes: {totalRequest.weekRequest}</span>
          </div>
          <div className="dashboard-chart">
            <h3>Tráfico mensual:</h3>
            <canvas id="chartMonth"></canvas>
            <span>Total de solicitudes: {totalRequest.monthRequest}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardTrafficCharts;
