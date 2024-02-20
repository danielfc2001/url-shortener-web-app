import React, { useEffect, useState } from "react";
import { useShortener } from "../context/ShortenerContext";

const DashboardModalTimestamp = ({ id }) => {
  const [timestamp, setTimestamp] = useState({
    created: null,
    updated: null,
  });
  const { shortenedUrls } = useShortener();
  useEffect(() => {
    const match = shortenedUrls.filter((el) => el._id === id);
    setTimestamp({
      created: match[0].createdAt.slice(0, 10).split("-").reverse().join("-"),
      updated: match[0].updatedAt.slice(0, 10).split("-").reverse().join("-"),
    });
  }, []);
  return (
    <div className="dashboard-modal-timestamp">
      <span>Creado el: {timestamp.created}</span>
      <span>Ultima actualización: {timestamp.updated}</span>
    </div>
  );
};

export default DashboardModalTimestamp;
