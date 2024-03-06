import { useQuery } from "@tanstack/react-query";
import { getLinkTraffic } from "../services/userLinks.js";

const useDashboardUrlStats = (id) => {
  const {
    isLoading,
    isError,
    data: linkStats,
  } = useQuery({
    queryKey: ["linkStats"],
    queryFn: async () => getLinkTraffic(id),
  });
  return {
    isLoading,
    isError,
    linkStats,
  };
};

export default useDashboardUrlStats;
