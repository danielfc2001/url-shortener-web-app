import ShortenerForm from "./ShortenerForm";

const ShortenerSection = () => {
  return (
    <section className="shortener-section">
      <article className="shortener-section-title">
        <h1 className="shortener-title">Bienvenido a SwiftURL</h1>
        <h3 className="shortener-subtitle">
          Acorta tu enlace en unos pocos segundos...
        </h3>
        <small>
          Recorta ese enlace que tanto te molesta agregar en tus redes sociales
          por lo extenso que se a vuelto... O se testigo del alcance de los
          mismos uniéndote a nosotros al hacer click <span>Aquí.</span>
        </small>
      </article>
      <ShortenerForm />
    </section>
  );
};

export default ShortenerSection;
