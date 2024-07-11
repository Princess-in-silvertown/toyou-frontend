import { useState, useEffect } from 'react';

export const useViewportHeight = () => {
  const [viewportHeight, setViewportHeight] = useState(
    window.visualViewport?.height
  );

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.visualViewport?.height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return viewportHeight;
};
