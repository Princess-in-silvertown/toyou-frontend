import {
  MouseEventHandler,
  ReactNode,
  TouchEventHandler,
  useLayoutEffect,
  useState,
} from 'react';
import styled, { css, keyframes } from 'styled-components';

interface Props {
  backContents: ReactNode;
  frontContents: ReactNode;
  frontTitle?: string;
  backTitle?: string;
  onSwipe?: (currentIndex: number) => void;
}

const SwiperCard = ({
  frontContents,
  backContents,
  frontTitle,
  backTitle,
  onSwipe,
}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [deltaX, setDeltaX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const isFront = currentIndex % 2 === 0;

  const handleStart = (clientX: number) => {
    setStartX(clientX);
    setIsSwiping(true);
  };

  const handleMove = (clientX: number) => {
    if (!isSwiping) return;

    const moveX = (clientX - startX) / 1.2;
    setDeltaX(moveX);
  };

  const handleEnd = () => {
    setDeltaX(0);

    if (Math.abs(deltaX) <= 75) return;

    setIsSwiping(false);
    if (deltaX > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else if (deltaX < 0) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleTouchStart: TouchEventHandler = (e) =>
    handleStart(e.touches[0].clientX);
  const handleTouchMove: TouchEventHandler = (e) =>
    handleMove(e.touches[0].clientX);
  const handleTouchEnd: TouchEventHandler = () => handleEnd();

  const handleMouseDown: MouseEventHandler = (e) => handleStart(e.clientX);
  const handleMouseMove: MouseEventHandler = (e) => handleMove(e.clientX);
  const handleMouseUp: MouseEventHandler = () => handleEnd();
  const handleMouseLeave: MouseEventHandler = () => handleEnd();

  const handleClickFrontButton = () => {
    if (!isFront) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleClickBackButton = () => {
    if (isFront) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  useLayoutEffect(() => {
    onSwipe?.(currentIndex);
  }, [currentIndex]);

  return (
    <Container>
      <TitleContainer>
        <FrontButton $isFront={isFront} onClick={handleClickFrontButton}>
          {frontTitle}
        </FrontButton>
        <BackButton $isFront={isFront} onClick={handleClickBackButton}>
          {backTitle}
        </BackButton>
      </TitleContainer>
      <SwiperWrapper
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <CardContainer
          style={{
            transform: `perspective(1000px) rotateY(calc(${
              -currentIndex * 180
            }deg + ${deltaX}deg))`,
          }}
        >
          <CardFront $isFront={isFront}>{frontContents}</CardFront>
          <CardBack $isFront={isFront}>{backContents}</CardBack>
        </CardContainer>
      </SwiperWrapper>
    </Container>
  );
};

export default SwiperCard;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 22px;
`;

const SwiperWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const CardContainer = styled.div`
  display: inline-grid;

  width: 100%;
  margin: 0 auto;

  transform-style: preserve-3d;
  transition: transform 0.3s;

  & > * {
    grid-area: 1 / 1 / 1 / 1;

    width: 100%;
    box-sizing: border-box;
    border-radius: 16px;

    backface-visibility: hidden;
  }
`;

const CardFront = styled.div<{ $isFront: boolean }>`
  pointer-events: ${({ $isFront }) => !$isFront && 'none'};
`;

const CardBack = styled.div<{ $isFront: boolean }>`
  background: ${({ theme }) => theme.gray0};
  transform: rotateY(180deg);

  pointer-events: ${({ $isFront }) => $isFront && 'none'};
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const FrontButton = styled.button<{ $isFront: boolean }>`
  position: relative;

  color: ${({ $isFront }) => ($isFront ? '#212121' : '#9E9E9E')};

  ${({ $isFront }) => $isFront && underline}
`;

const BackButton = styled.button<{ $isFront: boolean }>`
  position: relative;

  color: ${({ $isFront }) => (!$isFront ? '#212121' : '#9E9E9E')};

  ${({ $isFront }) => !$isFront && underline}
`;

const scaleUp = keyframes`
  from {
    transform-origin: left;
    transform: scaleX(0);
  }

  to {
    transform-origin: left;
    transform: scaleX(1);
  }
`;

const underline = css`
  &::after {
    content: '';
    position: absolute;
    left: calc(50% - 20px);
    bottom: -5px;
    width: 40px;
    border-radius: 1px;
    height: 2px;
    background-color: #000;
    animation: 0.3s ease ${scaleUp};
  }
`;
