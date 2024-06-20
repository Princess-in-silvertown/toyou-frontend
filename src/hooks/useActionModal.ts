import { useState } from 'react';
import { useModal } from './useModal';

export const useActionModal = () => {
  const { isOpen, contents, isClosing, handleClose, handleOpen } = useModal();

  const [handler, setHandler] = useState<() => void>();

  const setupHandler = (newHandler: () => void) => {
    setHandler(() => newHandler);
  };

  const handleAction = () => {
    handler && handler();
    handleClose();
  };

  return {
    isOpen,
    contents,
    isClosing,
    handleOpen,
    handleClose,
    setupHandler,
    handleAction,
  };
};
