import { PropsWithChildren, useMemo } from 'react';
import { modalContext, modalDispatchContext } from '../states/modalContext';
import { ConfirmationModal, Modal } from '@components/common/Modal';
import { useActionModal } from '@hooks/useActionModal';

interface Props extends PropsWithChildren {}

const ModalProvider = ({ children }: Props) => {
  const {
    isOpen,
    isClosing,
    contents,
    handleOpen,
    handleClose,
    setupHandler,
    handleAction,
  } = useActionModal();

  const modalInfo = useMemo(() => ({ isOpen, contents }), [isOpen, contents]);
  const modalDispatch = useMemo(
    () => ({ handleOpen, handleClose, setupHandler }),
    []
  );

  return (
    <modalContext.Provider value={modalInfo}>
      <modalDispatchContext.Provider value={modalDispatch}>
        <Modal
          type={'Confirmation'}
          isOpen={isOpen}
          isClosing={isClosing}
          handleClose={handleClose}
          handleAction={handleAction}
          children={contents}
        />
        {children}
      </modalDispatchContext.Provider>
    </modalContext.Provider>
  );
};

export default ModalProvider;
