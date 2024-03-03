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

export const getLinkTraffic = async (id) => {
  return fetch(`${HOSTNAME}/api/analytics/${id}`).then(async (response) => {
    if (!response.ok)
      throw {
        message: "A ocurrido un error al obtener las estadisticas.",
      };
    return await response.json();
  });
};
