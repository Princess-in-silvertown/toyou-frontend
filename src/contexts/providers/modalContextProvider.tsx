import { PropsWithChildren, useMemo } from 'react';
import { modalDispatchContext } from '../states/modalContext';
import { Modal } from '@components/common/Modal';
import { useModal } from '@hooks/useModal';

interface Props extends PropsWithChildren {}

const ModalProvider = ({ children }: Props) => {
  const { modals, handleOpen, handleClose, handleClear, handleUpdate } =
    useModal();

  const listedModal = useMemo(() => Array.from(modals.values()), [modals]);
  const modalDispatch = useMemo(
    () => ({ handleOpen, handleClose, handleClear, handleUpdate }),
    [modals]
  );

  return (
    <modalDispatchContext.Provider value={modalDispatch}>
      <Modal modals={listedModal} handleClose={handleClose} />
      {children}
    </modalDispatchContext.Provider>
  );
};

export default ModalProvider;
