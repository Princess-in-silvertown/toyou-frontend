import styled from 'styled-components';
import PortalModal from './PortalModal';
import { ModalInfo } from '@/types/modal';

interface Props extends React.PropsWithChildren<ModalInfo> {}

const BasicModal = ({
  isOpen,
  isClosing,
  handleClose,
  handleAction,
}: Props) => {
  if (handleAction) throw Error('cannot use handler function in BasicModal');

  return (
    <PortalModal
      isOpen={!!isOpen}
      isClosing={isClosing}
      handleClose={handleClose}
    ></PortalModal>
  );
};

export default BasicModal;
