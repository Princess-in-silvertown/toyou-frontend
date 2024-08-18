import { ConfirmButton } from '@components/common/Modal';
import { useKeydownListener } from '@hooks/useKeydownListener';
import { useScrollListener } from '@hooks/useScrollListener';
import styled from 'styled-components';

interface Props {
  handleClose: () => void;
  handleSubmit: () => void;
}

const ConfirmCancelModalContents = ({ handleClose, handleSubmit }: Props) => {
  useScrollListener(false);

  return (
    <Container>
      <Title>경고</Title>
      진짜 닫을건가요? 작성한 내용이 전부 날아갈수도??? 진짜 닫을건가요? 작성한
      내용이 전부 날아갈수도???
      <ConfirmButton
        handleClose={() => handleClose()}
        handleSubmit={() => handleSubmit()}
      />
    </Container>
  );
};

export default ConfirmCancelModalContents;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  font-size: 14px;
`;

const Title = styled.div`
  width: 100%;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
`;
