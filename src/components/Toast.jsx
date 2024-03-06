import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Toast = ({ key, message }) => {
  const element = document.getElementById("appToastContainer");
  return ReactDOM.createPortal(
    <ToastComponent message={message} />,
    element,
    key
  );
};

export const ToastComponent = ({ message }) => {
  const [showStatus, setShowStatus] = useState("hide");
  const [count, setCount] = useState(0);
  useEffect(() => {
    setShowStatus("show");
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [count]);
  return (
    <div
      className={`access-toast toast ${showStatus}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="access-toast-header toast-header">
        <strong className="me-auto">Notificación:</strong>
        <small className="text-muted">
          {count === 0 ? `justo ahora` : `hace ${count} segundos`}
        </small>
        <span className="access-toast-close" role="button">
          <i className="bi bi-x-lg"></i>
        </span>
      </div>
      <div className="toast-body">{message}</div>
    </div>
  );
};

export default Toast;
