import { useEffect } from 'react';

export const useImagePreLoad = (urls: string[]) => {
  useEffect(() => {
    const preloadImage = (url: string) => {
      const img = new Image();
      img.src = url;
    };

    urls.forEach((url) => preloadImage(url));
  }, []);
};
