import React from "react";

const LoginError = (message) => {
  const { content } = message;
  return <div className="login-error-card">{content}</div>;
};

export default LoginError;
