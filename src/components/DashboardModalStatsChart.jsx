import React, { useEffect } from "react";
import { createChart } from "lightweight-charts";
import { ScaleLoader } from "react-spinners";
import useDashboardModalStats from "../hooks/useDashboardModalStats";

const DashboardModalStatsChart = ({ id }) => {
  const { weekTraffic, monthTraffic, requestError, isPending } =
    useDashboardModalStats(id);

  useEffect(() => {
    if (!isPending && weekTraffic.length > 1 && monthTraffic.length > 1) {
      const weekTrafficFormated = weekTraffic.map((el) => {
        const date = el.time.split("/");
        const result = date.map((el, index) => {
          if (index === 1) {
            return el.length != 2 ? `0${el}` : el;
          } else {
            return el;
          }
        });
        return {
          time: result.reverse().join("-"),
          value: el.value,
        };
      });
      const monthTrafficFormated = monthTraffic.map((el) => {
        const date = el.time.split("/");
        const result = date.map((el, index) => {
          if (index != 2) {
            return el.length != 2 ? `0${el}` : el;
          } else {
            return el;
          }
        });
        return {
          time: result.reverse().join("-"),
          value: el.value,
        };
      });
      const chartOptions = {
        height: 200,
        layout: {
          textColor: "#d1d4dc",
          background: {
            type: "solid",
            color: "transparent",
          },
        },
        rightPriceScale: {
          scaleMargins: {
            top: 0.3,
            bottom: 0.25,
          },
        },
        crosshair: {
          vertLine: {
            width: 5,
            color: "rgba(224, 227, 235, 0.1)",
            style: 0,
          },
          horzLine: {
            visible: false,
            labelVisible: false,
          },
        },
        grid: {
          vertLines: {
            color: "rgba(42, 46, 57, 0)",
          },
          horzLines: {
            color: "rgba(42, 46, 57, 0)",
          },
        },
      };
      const weekTrafficChart = createChart(
        document.getElementById("chart"),
        chartOptions
      );
      const monthTrafficChart = createChart(
        document.getElementById("chartMonth"),
        chartOptions
      );
      const areaSeries = weekTrafficChart.addAreaSeries({
        topColor: "rgba(38, 198, 218, 0.56)",
        bottomColor: "rgba(38, 198, 218, 0.04)",
        lineColor: "rgba(38, 198, 218, 1)",
        lineWidth: 2,
        crossHairMarkerVisible: false,
      });
      const monthAreaSeries = monthTrafficChart.addAreaSeries({
        topColor: "rgba(38, 198, 218, 0.56)",
        bottomColor: "rgba(38, 198, 218, 0.04)",
        lineColor: "rgba(38, 198, 218, 1)",
        lineWidth: 2,
        crossHairMarkerVisible: false,
      });
      areaSeries.setData(weekTrafficFormated.reverse());
      monthAreaSeries.setData(monthTrafficFormated.reverse());
    }
  }, [isPending]);

  return (
    <div className="dashboard-modal-chart-container">
      {requestError ? (
        <div className="dashboard-modal-chart-error">
          A ocurrido un error al cargar el gráfico
        </div>
      ) : (
        <>{isPending && <ScaleLoader color="#53a7ae" height={50} />}</>
      )}
      <div className="dashboard-chart">
        <h3>Trafico semanal:</h3>
        <div id="chart"></div>
      </div>
      <div className="dashboard-chart">
        <h3>Trafico mensual:</h3>
        <div id="chartMonth"></div>
      </div>
    </div>
  );
};

export default DashboardModalStatsChart;
