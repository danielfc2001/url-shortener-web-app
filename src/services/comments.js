export const getLatestComments = async () => {
  return fetch("http://127.0.0.1:8070")
    .then(async (response) => {
      if (!response.ok)
        throw { message: "A ocurrido un error al obtener los comentarios" };
      return await response.json();
    })
    .then((data) => data.comments);
};
