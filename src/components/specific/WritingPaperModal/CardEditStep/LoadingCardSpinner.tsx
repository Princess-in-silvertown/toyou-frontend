import styled, { keyframes } from 'styled-components';

const LoadingCardSpinner = () => {
  return (
    <Container>
      <Title>
        메시지 카드가 <br /> 만들어지는 중이에요
      </Title>
      <CardContainer>
        <CardFront />
        <CardBack />
      </CardContainer>
    </Container>
  );
};

export default LoadingCardSpinner;

const rotate3d = keyframes`
  from {
    transform: perspective(1000px) rotateY(0deg);
  }

  to {
    transform: perspective(1000px) rotateY(180deg);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;

  width: fit-content;
  height: 48px;
  margin: 48px auto 40px auto;

  text-align: center;
  font-size: 20px;
  white-space: pre-wrap;

  @media (max-height: 650px) {
    margin: 48px auto 10px auto;
  }
`;

const CardContainer = styled.div`
  display: inline-grid;

  width: fit-content;
  margin: 0 auto;

  transform: perspective(1000px) rotateY(0deg);
  transform-style: preserve-3d;
  animation: ease-in-out 1.5s ${rotate3d} infinite;
  animation-delay: 0.5s;

  & > * {
    grid-area: 1 / 1 / 1 / 1;

    width: 220px;
    height: 300px;
    padding: 12px;
    border-radius: 8px;

    backface-visibility: hidden;
  }
`;

const CardFront = styled.div`
  border: 1px solid ${({ theme }) => theme.gray500};

  background: ${({ theme }) => theme.gray0};
`;

const CardBack = styled.div`
  border: 1px solid ${({ theme }) => theme.gray500};

  background: ${({ theme }) => theme.gray0};
  transform: rotateY(180deg);
`;
