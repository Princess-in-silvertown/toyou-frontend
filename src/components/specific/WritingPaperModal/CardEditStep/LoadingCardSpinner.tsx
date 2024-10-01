import { messageFormContext } from '@/contexts/states/messageFormContext';
import { CardColor } from '@/types/card';
import { CARD_THEME } from '@constants/card';
import { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { useImagePreLoad } from '@hooks/useImagePreLoad';
import add from '@assets/icons/add-sticker.svg';
import del from '@assets/icons/delete-sticker.svg';
import sticker from '@assets/icons/sticker.svg';

const LoadingCardSpinner = () => {
  const { cardTheme } = useContext(messageFormContext);
  const { color, subColor } = CARD_THEME[cardTheme];

  useImagePreLoad([add, del, sticker]);

  const getColorString = (color: Readonly<CardColor>) => {
    return `rgba(${color.R}, ${color.G}, ${color.B}, ${color.A})`;
  };
  const getSubColorString = (color: Readonly<CardColor>) => {
    return `rgba(${color.R}, ${color.G}, ${color.B}, 0.35)`;
  };

  return (
    <Container>
      <Title>
        당신의 마음이 잘 드러나도록 <br /> 메시지 카드를 생성할게요
      </Title>
      <CardContainer>
        <CardFront
          $color={getColorString(color)}
          $subColor={getSubColorString(subColor)}
        >
          <Spinner />
        </CardFront>
        <CardBack
          $color={getColorString(color)}
          $subColor={getSubColorString(subColor)}
        >
          <Spinner />
        </CardBack>
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
  font-weight: 500;
  font-size: 22px;
  line-height: 28.64px;
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
  display: flex;
  justify-content: center;
  align-items: center;

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
  display: flex;
  justify-content: center;
  align-items: center;

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

const spin = keyframes`
  from {
    transform: rotate(0deg); 
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 38px;
  height: 38px;
  border: 3.5px solid ${({ theme }) => theme.color.red500};
  border-top: 3.5px solid ${({ theme }) => theme.color.gray300};
  border-radius: 50%;

  animation: ${spin} 1s linear infinite;
`;
