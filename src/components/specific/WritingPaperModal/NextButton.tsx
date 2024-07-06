import styled from 'styled-components';

interface Props {
  canNext?: boolean;
  onNext: () => void;
}

const GenerateCardButton = ({ canNext = false, onNext }: Props) => {
  return (
    <Container onClick={onNext} $canNext={canNext}>
      생성하기
    </Container>
  );
};

export default GenerateCardButton;

const Container = styled.button<{ $canNext: boolean }>`
  display: flex;

  align-items: center;
  justify-content: center;

  width: 167px;
  height: 40px;
  margin: 60px auto 30px auto;
  border-radius: 20px;

  color: ${({ theme }) => theme.gray0};
  font-size: 16px;
  font-weight: 400;

  background-color: ${({ theme, $canNext }) =>
    $canNext ? theme.gray900 : theme.gray500};
`;
