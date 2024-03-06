import { HOSTNAME } from "../env/externalsUrls";

export const getUserLinks = async () => {
  const userToken = localStorage.getItem("token");
  if (!userToken)
    throw {
      message: "Nesecita estar autenticado para acceder al recurso.",
    };
  return fetch(`${HOSTNAME}/api/get?token=${userToken}`).then((response) => {
    if (!response.ok)
      throw {
        message: "A ocurrido un error al cargar los datos del usuario.",
      };
    return response.json();
  });
};

export const createUserLink = async (data) => {
  const jsonData = JSON.stringify({
    baseUrl: data.baseUrl,
    title: data.title.length != 0 ? data.title : undefined,
    description: data.description.length != 0 ? data.description : undefined,
  });
  const storage = localStorage.getItem("token");
  if (!storage)
    throw {
      message: "Debe estar autenticado para crear un nuevo enlace.",
    };
  return fetch(`${HOSTNAME}/api/create?token=${storage}`, {
    method: "POST",
    body: jsonData,
    mode: "cors",
    headers: {
      "Content-type": "application/json",
    },
  }).then((response) => {
    if (!response.ok)
      throw new Error(
        `A ocurrido un error al realizar la peticion. Codigo: ${response.status}`
      );
    return response.json();
  });
};

export const deleteUserLink = async (id) => {
  const storage = localStorage.getItem("token");
  if (!storage)
    throw new Error("Debe autenticarse para poder acceder a este recurso.");
  return fetch(`${HOSTNAME}/api/${id}?token=${storage}`, {
    method: "DELETE",
    mode: "cors",
  }).then((response) => {
    if (!response.ok)
      throw {
        message: "A ocurrido un error al eliminar el enlace.",
      };
    return response.json();
  });
};

export const updateUserLink = async (data, id, type) => {
  console.log(data, id, type);
  const selectTypeOfField = (data, type) => {
    switch (type) {
      case "title":
        return { title: data.editInput };
      case "description":
        return { description: data.editInput };
      case "url":
        return { baseUrl: data.editInput };
      case "isUnlocked":
        return { isUnlocked: data };
      default:
        return;
    }
  };
  const storage = localStorage.getItem("token");
  if (!storage)
    throw new Error("Debe autenticarse para poder acceder a este recurso.");
  const bodyData = JSON.stringify(selectTypeOfField(data, type));
  return fetch(`${HOSTNAME}/api/${id}?token=${storage}`, {
    method: "PUT",
    body: bodyData,
    mode: "cors",
    headers: {
      "Content-type": "application/json",
    },
  }).then((response) => {
    console.log(response);
    if (!response.ok)
      throw new Error("No se a podido actualizar el campo especificado.");
    return response.json();
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
