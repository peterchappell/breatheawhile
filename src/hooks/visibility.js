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
  } if (typeof document.msHidden !== "undefined") {
    return "msvisibilitychange";
  } if (typeof document.webkitHidden !== "undefined") {
    return "webkitvisibilitychange";
  }
  return 'visibilitychange';
}

export function getBrowserDocumentHiddenProp() {
  if (typeof document.hidden !== "undefined") {
    return "hidden";
  } if (typeof document.msHidden !== "undefined") {
    return "msHidden";
  } if (typeof document.webkitHidden !== "undefined") {
    return "webkitHidden";
  }
  return "hidden";
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