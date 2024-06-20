import { ReactNode, useState } from 'react';

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

  return { isOpen, contents, handleOpen, handleClose, isClosing };
};
