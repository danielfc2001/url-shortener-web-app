import React from "react";
import ShortenerInput from "./ShortenerInput";
import ShortenerResults from "./ShortenerResults";

const ShortenerSection = () => {
  return (
    <section className="shortener-section">
      <h1 className="shortener-title">Acorta tu enlace ahora</h1>
      <ShortenerInput />
      <ShortenerResults />
    </section>
  );
};

export default ShortenerSection;
