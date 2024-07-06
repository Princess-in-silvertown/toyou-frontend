import { createPortal } from 'react-dom';
import DefaultContainer from './DefaultContainer';
import { Modal } from '@/contexts/states/modalContext';

const portalElement = document.getElementById('modal-root')!;

interface Props {
  modals: Modal[];
  handleClose: (key?: string) => void;
}

const PortalModal = ({ modals, handleClose }: Props) => {
  return createPortal(
    <>
      {modals.map(({ key, isClosing, children, container }) => {
        const Container = container ?? DefaultContainer;

        return (
          <Container
            key={key}
            modalKey={key}
            isClosing={isClosing}
            handleClose={handleClose}
          >
            {children}
          </Container>
        );
      })}
    </>,
    portalElement
  );
};

export default PortalModal;
