import * as echarts from "echarts";

export const createChartComponent = (domElement, options) => {
  let myChart = echarts.init(domElement, "light", {
    width: 500,
    height: 300,
  });

  myChart.setOption(options);
};
