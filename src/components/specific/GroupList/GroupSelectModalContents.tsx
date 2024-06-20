import { ConfirmButton } from '@components/common/Modal';
import styled from 'styled-components';

interface Props {
  groupValue: string;
  handleSubmit: () => void;
  handleClose: () => void;
}

const GroupSelectModalContents = ({
  groupValue,
  handleSubmit,
  handleClose,
}: Props) => {
  return (
    <Container>
      <ModalMessage>{groupValue} 그룹에 들어가시겠습니까?</ModalMessage>
      <ConfirmButton handleClose={handleClose} handleSubmit={handleSubmit} />
    </Container>
  );
};

export default GroupSelectModalContents;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
`;

const ModalMessage = styled.div`
  min-height: 100px;
  font-size: 14px;
  color: gray;
`;
