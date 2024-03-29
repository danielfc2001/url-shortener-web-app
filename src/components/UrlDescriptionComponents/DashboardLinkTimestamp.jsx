import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const DashboardLinkTimestamp = ({ id }) => {
  const [timestamp, setTimestamp] = useState({
    created: null,
    updated: null,
  });
  const queryClient = useQueryClient();
  useEffect(() => {
    const data = queryClient.getQueryData(["userLinks"]);
    const match = data.data.filter((el) => el._id === id);
    setTimestamp({
      created: match[0].createdAt.slice(0, 10).split("-").reverse().join("-"),
      updated: match[0].updatedAt.slice(0, 10).split("-").reverse().join("-"),
    });
  }, []);
  return (
    <div className="dashboard-description-timestamp">
      <span>Creado el: {timestamp.created}</span>
      <span>Ultima actualización: {timestamp.updated}</span>
    </div>
  );
};

export default DashboardLinkTimestamp;
