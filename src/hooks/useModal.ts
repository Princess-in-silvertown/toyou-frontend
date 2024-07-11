import { ReactNode, useState } from 'react';
import { useScrollListener } from './useScrollListener';
import { Modal, ModalContainer } from '@/contexts/states/modalContext';

export const useModal = (closingTime = 500) => {
  const [modals, setModals] = useState<Map<string, Modal>>(new Map());

  const isOpen = modals.size > 0;

  const handleOpen = (
    key: string,
    newNode: ReactNode,
    container?: React.FC<ModalContainer>
  ) => {
    const newModal = { key, isClosing: false, children: newNode, container };

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

  const handleUpdate = (key: string, newNode: ReactNode) => {
    const prevNode = modals.get(key);
    if (!prevNode) return;

    setModals((prev) => {
      const newState = new Map(prev);
      newState.set(key, { ...prevNode, children: newNode });
      return newState;
    });
  };

  const handleClear = () => {
    if (modals.size <= 0) return;

    const first = modals.get(getFirstKey()!)!;
    setModals((prev) => {
      const newState = new Map(prev);
      newState.clear();
      return newState.set(first.key, { ...first, isClosing: true });
    });

    setTimeout(() => {
      setModals(new Map());
    }, closingTime);
  };

  const getLastKey = () => {
    if (modals.size <= 0) return;

    return Array.from(modals.keys()).pop();
  };

  const getFirstKey = () => {
    if (modals.size <= 0) return;

    return Array.from(modals.keys()).shift();
  };

  const triggerClosingAnimation = (key: string) => {
    if (!modals.get(key)) return;

    setModals((prev) => {
      const newState = new Map(prev);
      const prevModal = newState.get(key)!;
      return newState.set(key, { ...prevModal, isClosing: true });
    });
  };

  // useScrollListener(isOpen);

  return { handleOpen, handleClose, handleClear, handleUpdate, modals };
};
