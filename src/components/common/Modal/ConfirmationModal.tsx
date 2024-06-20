import styled from 'styled-components';
import PortalModal from './PortalModal';
import { ModalInfo } from '@/types/modal';

interface Props extends React.PropsWithChildren<ModalInfo> {}

const ConfirmationModal = ({
  isOpen,
  isClosing,
  handleClose,
  handleAction,
  children,
}: Props) => {
  return (
    <PortalModal
      isOpen={!!isOpen}
      isClosing={isClosing}
      handleClose={handleClose}
    >
      <ContentsContainer>{children}</ContentsContainer>
      <ButtonContainer>
        <Button onClick={handleClose}>취소</Button>
        <Button onClick={handleAction}>확인</Button>
      </ButtonContainer>
    </PortalModal>
  );
};

export default ConfirmationModal;

const ContentsContainer = styled.div`
  min-height: 100px;
`;

const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;

  margin-top: 20px;
`;

const Button = styled.button`
  width: calc(50% - 5px);
  height: 35px;
  border-radius: 5px;

  background-color: lightgray;
  color: gray;
`;
