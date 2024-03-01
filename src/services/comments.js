import { SOCKET_HOSTNAME } from "../env/externalsUrls";

export const getLatestComments = async () => {
  return fetch(SOCKET_HOSTNAME)
    .then(async (response) => {
      if (!response.ok)
        throw { message: "A ocurrido un error al obtener los comentarios" };
      return await response.json();
    })
    .then((data) => data.comments);
};

export const getCommentsRate = async () => {
  return fetch(`${SOCKET_HOSTNAME}/commentsInfo`).then(async (response) => {
    if (!response.ok)
      throw { message: "A ocurrido un error al obtener los comentarios" };
    return await response.json();
  });
};
