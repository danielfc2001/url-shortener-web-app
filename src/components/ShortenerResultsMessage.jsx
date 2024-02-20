const ShortenerResultsMessage = ({ type, message }) => {
  return (
    <div className={`shortener-result-message ${type}`}>
      {type === "error" ? (
        <i className="bi bi-exclamation-circle me-2"></i>
      ) : (
        <i className="bi bi-check2-circle me-2"></i>
      )}
      {message}
    </div>
  );
};

export default ShortenerResultsMessage;
