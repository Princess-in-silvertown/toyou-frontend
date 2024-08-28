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
      정말 창을 닫으실 건가요?
      <br />
      지금까지 작성한 내용이 사라질 수도 있어요!
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
  gap: 14px;

  font-size: 14px;
  text-align: center;
`;

const Title = styled.div`
  width: 100%;

  color: ${({ theme }) => theme.color.gray400};

  text-align: center;
  font-size: 18px;
  font-weight: 600;
`;
