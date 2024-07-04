import { Children, ReactNode, useMemo, useState } from 'react';
import { useKeydownListener } from './useKeydownListener';
import { useScrollListener } from './useScrollListener';
import { Modal } from '@/contexts/states/modalContext';

export const useModal = (closingTime = 500) => {
  const [modals, setModals] = useState<Map<string, Modal>>(new Map());

  const isOpen = modals.size > 0;

  const handleOpen = (key: string, newNode: ReactNode) => {
    const newModal = { key, isClosing: false, children: newNode };

    setModals((prev) => new Map(prev.set(key, newModal)));
  };

  const handleClose = (key?: string) => {
    if (modals.size <= 0) return;

    const targetKey = key ?? getLastKey() ?? '';

    triggerClosingAnimation(targetKey);
    setTimeout(() => {
      deleteModal(targetKey);
    }, closingTime);
  };

  const deleteModal = (key: string) => {
    setModals((prev) => {
      const newState = new Map(prev);
      newState.delete(key);
      return newState;
    });
  };

  const getLastKey = () => {
    if (modals.size <= 0) return;

    return Array.from(modals.keys()).pop();
  };

  const triggerClosingAnimation = (key: string) => {
    if (!modals.get(key)) return;

    setModals((prev) => {
      const newState = new Map(prev);
      const prevModal = newState.get(key)!;
      return newState.set(key, { ...prevModal, isClosing: true });
    });
  };

  useScrollListener(isOpen);

  return { handleOpen, handleClose, modals };
};
