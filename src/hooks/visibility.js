/**
 * Custom hook for managing visibility changes
 * NB this is NOT MY WORK
 * source from https://raw.githubusercontent.com/Darth-Knoppix/example-react-page-visibility/master/src/utils/visibility.js
 *  */

import React from "react";

export function getBrowserVisibilityProp() {
  if (typeof document.hidden !== "undefined") {
    // Opera 12.10 and Firefox 18 and later support
    return "visibilitychange";
  } else if (typeof document.msHidden !== "undefined") {
    return "msvisibilitychange";
  } else if (typeof document.webkitHidden !== "undefined") {
    return "webkitvisibilitychange";
  }
}

export function getBrowserDocumentHiddenProp() {
  if (typeof document.hidden !== "undefined") {
    return "hidden";
  } else if (typeof document.msHidden !== "undefined") {
    return "msHidden";
  } else if (typeof document.webkitHidden !== "undefined") {
    return "webkitHidden";
  }
}

export function getIsDocumentHidden() {
  return !document[getBrowserDocumentHiddenProp()];
}

export function usePageVisibility() {
  const [isVisible, setIsVisible] = React.useState(getIsDocumentHidden());
  const onVisibilityChange = () => setIsVisible(getIsDocumentHidden());

  React.useEffect(() => {
    const visibilityChange = getBrowserVisibilityProp();

    window.addEventListener(visibilityChange, onVisibilityChange, false);

    return () => {
      window.removeEventListener(visibilityChange, onVisibilityChange);
    };
  });

  return isVisible;
}