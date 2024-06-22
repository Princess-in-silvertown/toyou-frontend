import { ConfirmButton } from '@components/common/Modal';
import { useMyGroupList } from '@hooks/queries/useMyGroupList';
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
      <Title>그룹 참여</Title>
      <Message>{groupValue} 메세지 내용 </Message>
      <ConfirmButton handleClose={handleClose} handleSubmit={handleSubmit} />
    </Container>
  );
};

export default GroupSelectModalContents;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;

const Title = styled.div``;

const Message = styled.div`
  min-height: 100px;
  font-size: 14px;
  color: gray;
`;
