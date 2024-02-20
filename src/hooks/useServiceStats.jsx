import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const useServiceStats = () => {
  const [totalAccounts, setTotalAccounts] = useState();
  const [todayTraffic, setTodayTrafic] = useState();
  const [requestErrors, setRequestErrors] = useState(false);
  const socket = io("http://127.0.0.1:8070", {
    forceNew: true,
  });

  useEffect(() => {
    socket.emit("get_service_stats_accounts");
    socket.emit("get_service_stats_traffic");
    socket.on("result_service_stats_accounts", (result) => {
      if (result) {
        setTotalAccounts(result);
      } else {
        setTotalAccounts(0);
      }
    });
    socket.on("result_service_stats_traffic", (result) => {
      if (result) {
        setTodayTrafic(result);
      } else {
        setTodayTrafic(0);
      }
    });
    socket.on("error_service_stats_accounts", (error) => {
      setRequestErrors(true);
    });
    socket.on("error_service_stats_traffic", (error) => {
      setRequestErrors(true);
    });
  }, []);
  return {
    totalAccounts,
    todayTraffic,
    requestErrors,
  };
};

export default useServiceStats;
