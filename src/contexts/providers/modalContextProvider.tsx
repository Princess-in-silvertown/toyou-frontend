import { PropsWithChildren, useMemo } from 'react';
import { modalDispatchContext } from '../states/modalContext';
import { Modal } from '@components/common/Modal';
import { useModal } from '@hooks/useModal';

interface Props extends PropsWithChildren {}

const ModalProvider = ({ children }: Props) => {
  const { isOpen, isClosing, contents, handleOpen, handleClose } = useModal();

  const modalDispatch = useMemo(() => ({ handleOpen, handleClose }), []);

  return (
    <modalDispatchContext.Provider value={modalDispatch}>
      <Modal
        isOpen={isOpen}
        isClosing={isClosing}
        handleClose={handleClose}
        children={contents}
      />
      {children}
    </modalDispatchContext.Provider>
  );
};

export default ModalProvider;
