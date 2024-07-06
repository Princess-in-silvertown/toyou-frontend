import { RefObject, useCallback, useEffect } from 'react';

export const useKeydownListener = (
  key: string,
  handler: () => void,
  isListening: boolean = true
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
      window.addEventListener('keydown', keydownEvent);
    }

    return () => {
      window.removeEventListener('keydown', keydownEvent);
    };
  }, [isListening, keydownEvent]);
};
