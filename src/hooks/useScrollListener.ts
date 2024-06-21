import { useEffect } from 'react';

const preventScroll = (event: Event) => {
  event.preventDefault();
};

export const useScrollListener = (isSwitchOn: boolean) => {
  useEffect(() => {
    if (isSwitchOn) {
      window.addEventListener('scroll', preventScroll, { passive: false });
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
    } else {
      window.removeEventListener('scroll', preventScroll);
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
    }

    return () => {
      window.removeEventListener('scroll', preventScroll);
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
    };
  }, [isSwitchOn]);
};
