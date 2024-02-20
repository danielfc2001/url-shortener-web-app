import React from "react";
import { useNavigate } from "react-router-dom";

const AccessInfo = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate("/access/register");
  };

  return (
    <>
      <h3 className="access-info-title">Accede para obtener beneficios</h3>
      <section className="access-info">
        <article>
          <ul>
            <li>Creación de enlaces personalizados.</li>
            <li>
              Guarde todos los enlaces importantes en su perfil y modifiquelos
              cuando sea nesesario.
            </li>
            <li>
              Obtenga analiticas para todos los enlaces que tenga guardado.
            </li>
          </ul>
        </article>
      </section>
      <button
        type="button"
        className="access-info-join-btn"
        onClick={handleClick}
      >
        Eres nuevo?. Unete a nosotros.
      </button>
    </>
  );
};

export default AccessInfo;
