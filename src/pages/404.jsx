import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="container-not-found-page">
      <i className="icon-not-found-page bi bi-exclamation-triangle"></i>
      <h3 className="text-not-found-page">
        La pagina a la que intenta acceder no existe.
      </h3>
      <Link to={"/"} className="link-not-found-page">
        Volver a inicio
      </Link>
    </section>
  );
};

export default NotFound;
