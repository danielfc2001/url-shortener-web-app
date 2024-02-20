import React from "react";
import { useShortener } from "../context/ShortenerContext";

const ShortenerBtn = () => {
  const { createNewShortenedUrl } = useShortener();
  const handleClick = (e) => {
    createNewShortenedUrl();
  };
  return (
    <button type="button" className="shortener-btn" onClick={handleClick}>
      Acortar
    </button>
  );
};

export default ShortenerBtn;
