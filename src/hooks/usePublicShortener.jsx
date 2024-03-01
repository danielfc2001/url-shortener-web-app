import { useState } from "react";
import { createNewLink } from "../services/links";
import { openExternalLink } from "../utils/openExternalLink";
import { copyLinkToClipboard } from "../utils/copyLinkToClipboard";

const usePublicShortener = () => {
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState({
    message: null,
  });
  const [shortenedLink, setShortenedLink] = useState();

  const generateShortenedLink = async (link) => {
    try {
      setIsPending(true);
      const shortenedUrl = await createNewLink(link);
      console.log(shortenedUrl);
      if (!shortenedUrl)
        throw {
          message: "A ocurrido un error al procesar la solicitud.",
        };
      setShortenedLink(shortenedUrl.shortUrl);
    } catch (error) {
      console.log(error);
      setErrors({
        message: error.message,
      });
    } finally {
      setIsPending(false);
    }
  };

  const handleCopyLink = (e) => {
    copyLinkToClipboard(shortenedLink);
    e.target.innerText = "Copied!";
    const timer = setTimeout(() => {
      e.target.innerText = "Copy";
    }, 5000);
    return () => clearTimeout(timer);
  };

  const handleOpenLink = (e) => {
    openExternalLink(shortenedLink);
  };

  return {
    isPending,
    errors,
    shortenedLink,
    generateShortenedLink,
    handleCopyLink,
    handleOpenLink,
  };
};

export default usePublicShortener;
