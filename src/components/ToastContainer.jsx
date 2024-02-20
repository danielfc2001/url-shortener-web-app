import React from "react";

const ToastContainer = ({ children }) => {
  return (
    <div
      id="appToastContainer"
      className="toast-container position-fixed bottom-0 end-0 p-3"
    >
      {children}
    </div>
  );
};

export default ToastContainer;
