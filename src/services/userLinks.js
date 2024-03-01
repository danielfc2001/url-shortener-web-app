import { HOSTNAME } from "../env/externalsUrls";

export const getUserLinks = ({ children }) => {
  const userToken = localStorage.getItem("token");
  if (!userToken)
    throw {
      message: "Nesecita estar autenticado para acceder al recurso.",
    };
  fetch(`${HOSTNAME}/api/get?token=${userToken}`)
    .then((response) => {
      if (!response.ok)
        throw {
          message: "A ocurrido un error al cargar los datos del usuario.",
        };
      return response.json();
    })
    .then((data) => {
      children;
    });
};
