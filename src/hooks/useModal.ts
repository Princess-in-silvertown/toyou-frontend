import { ReactNode, useState } from 'react';
import { useKeydownListener } from './useKeydownListener';
import { useScrollListener } from './useScrollListener';

export const useModal = (initialOpen = false, closedTime = 300) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [isClosing, setIsClosing] = useState(false);
  const [contents, setContents] = useState<ReactNode>(null);

  const handleOpen = (newContents: ReactNode) => {
    setIsOpen(() => true);
    setContents(() => newContents);
  };

  const handleClose = () => {
    setIsClosing(true);

    setTimeout(() => {
      setIsOpen(() => false);
      setIsClosing(() => false);
    }, closedTime);
  };

  useScrollListener(isOpen);
  useKeydownListener('Escape', handleClose, isOpen);

  return { isOpen, contents, handleOpen, handleClose, isClosing };
};
