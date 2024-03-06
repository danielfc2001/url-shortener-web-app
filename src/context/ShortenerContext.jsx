import { createContext, useContext, useEffect, useState } from "react";
import { HOSTNAME } from "../env/externalsUrls.js";

const ShortenerContext = createContext();

export const useShortener = () => {
  const context = useContext(ShortenerContext);
  if (!context) throw new Error("Context must be use within a Provider");
  return context;
};

export const ShortenerProvider = ({ children }) => {
  const [shortenedUrls, setShortenedsUrls] = useState([]);
  const [modalEditActive, setModalEditActive] = useState("");
  const [messageDeletedLink, setMessageDeletedLink] = useState();

  const newMessageDeletedLink = (message) => {
    setMessageDeletedLink(message);
  };

  useEffect(() => {
    if (messageDeletedLink) {
      const timer = setTimeout(() => {
        setMessageDeletedLink();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [messageDeletedLink]);

  const getAllShortenedsLinks = async () => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllShortenedsLinks();
  }, []);

  const handleShowEditContentModal = (target) => {
    setModalEditActive(target);
  };

  return (
    <ShortenerContext.Provider
      value={{
        shortenedUrls,
        modalEditActive,
        messageDeletedLink,
        newMessageDeletedLink,
        handleShowEditContentModal,
      }}
    >
      {children}
    </ShortenerContext.Provider>
  );
};
