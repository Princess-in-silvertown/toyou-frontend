import { messageFormContext } from '@/contexts/states/messageFormContext';
import { CardColor } from '@/types/card';
import { CARD_THEME } from '@constants/card';
import { useContext } from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingCardSpinner = () => {
  const { cardTheme } = useContext(messageFormContext);
  const { color, subColor } = CARD_THEME[cardTheme];

  const getColorString = (color: Readonly<CardColor>) => {
    return `rgba(${color.R}, ${color.G}, ${color.B}, ${color.A})`;
  };
  const getSubColorString = (color: Readonly<CardColor>) => {
    return `rgba(${color.R}, ${color.G}, ${color.B}, 0.35)`;
  };

  return (
    <Container>
      <Title>
        메시지 카드가 <br /> 만들어지는 중이에요
      </Title>
      <CardContainer>
        <CardFront
          $color={getColorString(color)}
          $subColor={getSubColorString(subColor)}
        />
        <CardBack
          $color={getColorString(color)}
          $subColor={getSubColorString(subColor)}
        />
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
  margin: 15px auto 40px auto;

  text-align: center;
  font-size: 20px;
  white-space: pre-wrap;
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

const CardFront = styled.div<{ $color: string; $subColor: string }>`
  position: relative;

  border-radius: 8px;

  background-color: ${({ $color }) => $color};

  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      ellipse at center,
      ${({ $subColor }) => $subColor} 40%,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0)
    );
    mix-blend-mode: overlay;
  }
`;

const CardBack = styled.div<{ $color: string; $subColor: string }>`
  position: relative;

  border-radius: 12px;

  background-color: ${({ $color }) => $color};

  overflow: hidden;
  transform: rotateY(180deg);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      ellipse at center,
      ${({ $subColor }) => $subColor} 40%,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0)
    );
    mix-blend-mode: overlay;
  }
`;
