import React from "react";

const Copyright = () => {
  return (
    <div className="copyright-text">
      <p>
        Creado por{" "}
        <a href="https://github.com/DanielFC2001" target="_blank">
          danielfc2001
        </a>
        . 2024 - {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default Copyright;
