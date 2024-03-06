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
          <svg
            className="icon icon-tabler icon-tabler-copy"
            width="16"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
            <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
          </svg>
        </button>
      )}
      {type === "link" && (
        <button type="button" onClick={handleExternalLink}>
          <svg
            className="icon icon-tabler icon-tabler-link"
            width="16"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 15l6 -6" />
            <path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" />
            <path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" />
          </svg>
        </button>
      )}
    </>
  );
};

export default BtnSavedUrlCard;
