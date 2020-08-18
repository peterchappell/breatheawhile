import { useEffect, useRef, useCallback } from 'react';

const useAnimationFrame = (callback) => {
  const requestAnimationRef = useRef();
  const previousTimeRef = useRef();
  const wrappedCallback = useCallback(callback);

  useEffect(() => {
    const animate = (time) => {
      if (previousTimeRef.current) {
        const timeElapsed = time - previousTimeRef.current;
        wrappedCallback(timeElapsed)
      }
      previousTimeRef.current = time;
      requestAnimationRef.current = requestAnimationFrame(animate);
    }

    requestAnimationRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(requestAnimationRef.current);
    };
  }, [wrappedCallback]);
};

export default useAnimationFrame;