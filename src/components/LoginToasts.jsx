import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useAuth } from "../context/AuthContext";

const LoginToasts = ({ key, message }) => {
  const element = document.getElementById("appToastContainer");
  return ReactDOM.createPortal(<Toast message={message} />, element, key);
};

const Toast = ({ message }) => {
  const [showStatus, setShowStatus] = useState("hide");
  const [count, setCount] = useState(0);
  const { userInfo, closeAuthToasts } = useAuth();
  useEffect(() => {
    setShowStatus("show");
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [count]);
  const handleCloseToast = (e) => {
    closeAuthToasts();
  };
  return (
    <div
      className={`access-toast toast ${showStatus}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="access-toast-header toast-header">
        <strong className="me-auto">Bienvenido {userInfo.username}</strong>
        <small className="text-muted">
          {count === 0 ? `justo ahora` : `hace ${count} segundos`}
        </small>
        <span
          className="access-toast-close"
          role="button"
          onClick={handleCloseToast}
        >
          <i className="bi bi-x-lg"></i>
        </span>
      </div>
      <div className="toast-body">{message}</div>
    </div>
  );
};

export default LoginToasts;
