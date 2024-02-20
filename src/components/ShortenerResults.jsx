import { useShortener } from "../context/ShortenerContext";
import { copyLinkToClipboard } from "../utils/copyLinkToClipboard";
import { openExternalLink } from "../utils/openExternalLink";
import ShortenerResultsMessage from "./ShortenerResultsMessage";

const ShortenerResults = () => {
  const { urlShortened, shortenerErrors } = useShortener();

  const handleCopyLink = (e) => {
    copyLinkToClipboard(urlShortened);
    e.target.innerText = "Copied!";
    const timer = setTimeout(() => {
      e.target.innerText = "Copy";
    }, 5000);
    return () => clearTimeout(timer);
  };

  const handleOpenLink = (e) => {
    openExternalLink(urlShortened);
  };

  return (
    <>
      {shortenerErrors && (
        <ShortenerResultsMessage type={"error"} message={shortenerErrors} />
      )}
      {urlShortened && (
        <section className="shortener-result-section">
          <ShortenerResultsMessage
            type={"success"}
            message={"Su enlace se a creado satisfactoriamente."}
          />
          <span className="shortener-result text-white">
            {urlShortened}
            <div>
              <button
                type="button"
                className="shortener-result-btn me-2"
                onClick={handleCopyLink}
              >
                Copy
              </button>
              <button
                type="button"
                className="shortener-result-btn"
                onClick={handleOpenLink}
              >
                Open Link
              </button>
            </div>
          </span>
        </section>
      )}
    </>
  );
};

export default ShortenerResults;
