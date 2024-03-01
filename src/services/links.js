import { HOSTNAME } from "../env/externalsUrls";

export const createNewLink = async (link) => {
  const jsonLink = JSON.stringify(link);
  console.log(jsonLink);
  return fetch(`${HOSTNAME}/api/create`, {
    method: "POST",
    body: jsonLink,
    mode: "cors",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then(async (response) => {
      if (!response.ok)
        throw {
          status: response.status,
          message: "A ocurrido un error al procesar la peticion.",
        };
      return await response.json();
    })
    .then((data) => {
      return data;
    });
};
