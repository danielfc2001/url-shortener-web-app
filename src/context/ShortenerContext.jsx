import { createContext, useContext, useEffect, useState } from "react";
import { HOSTNAME } from "../env/externalsUrls.js";

const ShortenerContext = createContext();

export const useShortener = () => {
  const context = useContext(ShortenerContext);
  if (!context) throw new Error("Context must be use within a Provider");
  return context;
};

export const ShortenerProvider = ({ children }) => {
  const [shortenerErrors, setShortenerErrors] = useState();
  const [shortenedUrls, setShortenedsUrls] = useState([]);
  const [pendingShorteneds, setPendingShorteneds] = useState(false);
  const [insertPending, setInsertPending] = useState(false);
  const [insertStatus, setInsertStatus] = useState({
    status: null,
    message: null,
  });
  const [modalEditActive, setModalEditActive] = useState("");
  const [updatePending, setUpdatePending] = useState(false);
  const [quickSearchShorteneds, setQuickSearchShorteneds] = useState([]);

  const getAllShortenedsLinks = async () => {
    try {
      setPendingShorteneds(true);
      const storage = localStorage.getItem("token");
      if (!storage)
        throw new Error(
          "Debe iniciar secion para acceder a sus enlaces guardados."
        );
      const response = await fetch(`${HOSTNAME}/api/get?token=${storage}`);
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      if (!data) throw new Error("No hay datos que mostrar.");
      setShortenedsUrls(data.data);
      setQuickSearchShorteneds(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setPendingShorteneds(false);
    }
  };

  useEffect(() => {
    getAllShortenedsLinks();
  }, []);

  // Deleting errors of shortener petition after 5s
  useEffect(() => {
    if (shortenerErrors) {
      const timer = setTimeout(() => {
        setShortenerErrors();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [shortenerErrors]);

  const createUserShortenedUrl = async (data) => {
    const jsonData = JSON.stringify({
      baseUrl: data.baseUrl,
      title: data.title.length != 0 ? data.title : undefined,
      description: data.description.length != 0 ? data.description : undefined,
    });
    const storage = localStorage.getItem("token");
    if (!storage) return;
    try {
      setInsertPending(true);
      const response = await fetch(`${HOSTNAME}/api/create?token=${storage}`, {
        method: "POST",
        body: jsonData,
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok)
        throw new Error(
          `A ocurrido un error al realizar la peticion. Codigo: ${response.status}`
        );
      const responseData = await response.json();
      if (!responseData)
        throw new Error("A ocurrido un error al procesar los datos.");
      setShortenedsUrls(responseData.data);
      setQuickSearchShorteneds(responseData.data);
      setInsertStatus({
        status: 200,
        message: "Se a creado el nuevo enlace.",
      });
    } catch (error) {
      setInsertStatus({
        status: 400,
        message: error.message,
      });
    } finally {
      setInsertPending(false);
    }
  };

  const updateUserShortenedUrl = async (data, id, type) => {
    try {
      setUpdatePending(true);
      const selectTypeOfField = (data, field) => {
        switch (field) {
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
      const response = await fetch(`${HOSTNAME}/api/${id}?token=${storage}`, {
        method: "PUT",
        body: bodyData,
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
      });
      if (!response.ok)
        throw new Error("No se a podido actualizar el campo especificado.");
      const responseData = await response.json();
      if (!responseData)
        throw new Error("A ocurrido un error al recibir los datos.");
      setShortenedsUrls(
        shortenedUrls.map((el) => {
          if (el._id === responseData.update._id) {
            return responseData.update;
          } else {
            return el;
          }
        })
      );
      setQuickSearchShorteneds(
        quickSearchShorteneds.map((el) => {
          if (el._id === responseData.update._id) {
            return responseData.update;
          } else {
            return el;
          }
        })
      );
    } catch (error) {
      return error.message;
    } finally {
      setUpdatePending(false);
    }
  };

  const deleteUserShortenedUrl = async (id) => {
    try {
      const storage = localStorage.getItem("token");
      if (!storage)
        throw new Error("Debe autenticarse para poder acceder a este recurso.");
      const response = await fetch(`${HOSTNAME}/api/${id}?token=${storage}`, {
        method: "DELETE",
        mode: "cors",
      });
      if (!response.ok)
        throw new Error("A ocurrido un error al procesar la solicitud.");
      const data = await response.json();
      if (data.message) {
        setShortenedsUrls(shortenedUrls.filter((el) => el._id != id));
        setQuickSearchShorteneds(
          quickSearchShorteneds.filter((el) => el._id != id)
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const searchUserShortenedUrl = async (query) => {
    try {
      setPendingShorteneds(true);
      if (query.length === 0) {
        await getAllShortenedsLinks();
        setQuickSearchShorteneds(shortenedUrls);
        return false;
      }
      const storage = localStorage.getItem("token");
      if (!storage)
        throw new Error("Debe autenticarse para poder acceder a este recurso.");
      const response = await fetch(
        `${HOSTNAME}/api/search?token=${storage}&&search=${query}`
      );
      if (!response.ok)
        throw new Error("A ocurrido un error al procesar la solicitud.");
      const data = await response.json();
      setQuickSearchShorteneds(data.urls);
      if (query.length != 0) {
        return true;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPendingShorteneds(false);
    }
  };

  const quickSearchShortenedUrl = async (query) => {
    try {
      setPendingShorteneds(true);
      setQuickSearchShorteneds(
        shortenedUrls.filter((el) => {
          if (
            (el.title && el.title.includes(query)) ||
            (el.description && el.description.includes(query)) ||
            el.baseUrl.includes(query)
          ) {
            return el;
          } else {
            return undefined;
          }
        })
      );
      if (query.length != 0) {
        return true;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPendingShorteneds(false);
    }
  };

  useEffect(() => {
    if (insertStatus.status != null) {
      setTimeout(() => {
        setInsertStatus({
          status: null,
          message: null,
        });
      }, 5000);
    }
  }, [insertStatus]);

  const handleShowEditContentModal = (target) => {
    setModalEditActive(target);
  };

  return (
    <ShortenerContext.Provider
      value={{
        shortenerErrors,
        shortenedUrls,
        pendingShorteneds,
        insertPending,
        insertStatus,
        modalEditActive,
        updatePending,
        quickSearchShorteneds,
        createUserShortenedUrl,
        updateUserShortenedUrl,
        deleteUserShortenedUrl,
        searchUserShortenedUrl,
        quickSearchShortenedUrl,
        handleShowEditContentModal,
      }}
    >
      {children}
    </ShortenerContext.Provider>
  );
};
