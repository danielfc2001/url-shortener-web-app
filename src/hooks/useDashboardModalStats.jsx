import { useEffect, useState } from "react";

const HOSTNAME = "http://127.0.0.1:3000";

const useDashboardModalStats = (id) => {
  const [todayTraffic, setTodayTraffic] = useState();
  const [weekTraffic, setWeekTraffic] = useState([]);
  const [requestError, setRequestError] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const getUrlTraffic = async (id) => {
    setRequestError(false);
    setIsPending(true);
    try {
      const response = await fetch(`${HOSTNAME}/api/analytics/${id}`);
      if (!response.ok) throw new Error();
      const data = await response.json();
      if (!data) throw new Error();
      setTodayTraffic(data.today);
      setWeekTraffic(data.lastWeek);
      return;
    } catch (error) {
      console.log(error);
      setRequestError(true);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    getUrlTraffic(id);
  }, []);

  return {
    todayTraffic,
    weekTraffic,
    requestError,
    isPending,
  };
};

export default useDashboardModalStats;
