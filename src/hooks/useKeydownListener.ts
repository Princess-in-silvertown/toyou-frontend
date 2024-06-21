import { useCallback, useEffect } from 'react';

export const useKeydownListener = (
  key: string,
  handler: () => void,
  isListening: boolean
) => {
  const keydownEvent = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === key) {
        handler();
      }
    },
    [key, handler]
  );

  useEffect(() => {
    if (isListening) {
      window.addEventListener('keydown', keydownEvent, { passive: false });
    }

    return () => {
      window.removeEventListener('keydown', keydownEvent);
    };
  }, [isListening, keydownEvent]);
};
