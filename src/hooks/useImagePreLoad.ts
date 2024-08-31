import { useEffect } from 'react';

export const useImagePreLoad = (url: string) => {
  useEffect(() => {
    const preloadImage = (url: string) => {
      const img = new Image();
      img.src = url;
    };

    preloadImage(url);
  }, []);
};
