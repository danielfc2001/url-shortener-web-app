import React from "react";
import { openExternalLink } from "../utils/openExternalLink";
import { copyLinkToClipboard } from "../utils/copyLinkToClipboard";

const BtnSavedUrlCard = ({ type, href }) => {
  const handleClipboardCopy = (e) => {
    e.preventDefault();
    copyLinkToClipboard(href);
  };

  const handleExternalLink = (e) => {
    e.preventDefault();
    openExternalLink(href);
  };

  return (
    <>
      {type === "copy" && (
        <button type="button" onClick={handleClipboardCopy}>
          <i className="bi bi-copy"></i>
        </button>
      )}
      {type === "link" && (
        <button type="button" onClick={handleExternalLink}>
          <i className="bi bi-link-45deg"></i>
        </button>
      )}
    </>
  );
};

export default BtnSavedUrlCard;
