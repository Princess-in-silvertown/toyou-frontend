import styled from 'styled-components';

interface Props {
  canNext?: boolean;
  onNext?: () => void;
}

const GenerateCardButton = ({ canNext = false, onNext }: Props) => {
  return (
    <Container onClick={onNext} $canNext={canNext}>
      확인
    </Container>
  );
};

export default GenerateCardButton;

const Container = styled.button<{ $canNext: boolean }>`
  position: fixed;
  bottom: 30px;
  display: flex;

  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 500px;
  height: 49px;
  margin: 0 auto;
  border-radius: 24.5px;

  color: ${({ theme }) => theme.gray0};
  font-size: 16px;
  font-weight: 400;

  background-color: ${({ theme, $canNext }) =>
    $canNext ? theme.red500 : theme.gray500};
`;
