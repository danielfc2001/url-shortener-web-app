export const copyLinkToClipboard = (href) => {
  return navigator.clipboard.writeText(href).then((res) => {
    console.log("Copied to Clipboard", res);
  });
};
