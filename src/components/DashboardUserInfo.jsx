import React from "react";
import { useAuth } from "../context/AuthContext";
import { useShortener } from "../context/ShortenerContext";

const DashboardUserInfo = () => {
  const { userInfo } = useAuth();
  const { shortenedUrls } = useShortener();
  return (
    <article className="user-info-container w-50">
      <h3 className="user-info-title">
        Bienvenido{" "}
        <span className="user-info-username">{userInfo.username}</span>
      </h3>
      <span className="user-info-url-count">
        Enlaces guardados:{" "}
        <span className="url-count">
          {shortenedUrls ? shortenedUrls.length : "No tiene enlaces guardados"}
        </span>
      </span>
    </article>
  );
};

export default DashboardUserInfo;
