import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getCommentsRate } from "../../services/comments";
import * as ChartJs from "chart.js/auto";

const CommentBoxChart = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["commentsRate"],
    queryFn: async () => getCommentsRate(),
  });
  useEffect(() => {
    if (!isLoading && !isError && data) {
      const ctx = document.getElementById("commentBoxChart");
      const chartData = {
        labels: ["Recommended", "NonRecommended"],
        datasets: [
          {
            label: "Comments Rate",
            data: [data.positiveComments, data.negativeComments],
            backgroundColor: ["#7ec6ca", "#27575e"],
            hoverOffset: 4,
          },
        ],
      };
      const chartConfig = {
        type: "doughnut",
        data: chartData,
      };
      ChartJs.Chart.register(ChartJs.DoughnutController);
      const myChart = new ChartJs.Chart(ctx, chartConfig);
      return () => myChart.destroy();
    }
  }, [isLoading]);
  return (
    <>
      <canvas id="commentBoxChart"></canvas>
      {!isLoading && !isError && data && (
        <span className="comment-box-rate-results">
          Total: {data.totalComments}
        </span>
      )}
    </>
  );
};

export default CommentBoxChart;
