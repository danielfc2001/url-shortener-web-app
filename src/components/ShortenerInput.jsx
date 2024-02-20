import React from "react";
import ShortenerBtn from "./ShortenerBtn";
import { useShortener } from "../context/ShortenerContext";

const ShortenerInput = () => {
  const { updateUrlContent } = useShortener();
  return (
    <article className="shortener-form">
      <input
        type="text"
        className="shortener-input"
        placeholder="Introduce el enlace"
        onChange={(e) => updateUrlContent(e.target.value)}
      />
      <ShortenerBtn />
    </article>
  );
};

export default ShortenerInput;
