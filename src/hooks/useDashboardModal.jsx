import { useEffect, useState } from "react";
import { useShortener } from "../context/ShortenerContext";

const useDashboardModal = (id) => {
  const [data, setData] = useState({
    title: null,
    description: null,
    baseUrl: null,
    shortUrl: null,
  });
  const { shortenedUrls, modalEditActive, handleHiddeModalCard } =
    useShortener();
  const handleCloseModal = (e) => {
    handleHiddeModalCard();
  };
  const filterUrl = (id) => {
    return shortenedUrls.filter((el) => el._id === id);
  };
  useEffect(() => {
    setData(...filterUrl(id));
  }, []);
  return {
    data,
    modalEditActive,
    handleCloseModal,
  };
};

export default useDashboardModal;
