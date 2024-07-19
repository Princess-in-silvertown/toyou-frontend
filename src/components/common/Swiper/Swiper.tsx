import {
  Children,
  MouseEventHandler,
  TouchEventHandler,
  useLayoutEffect,
  useState,
} from 'react';
import styled from 'styled-components';

interface Props extends React.PropsWithChildren {
  onSwipe?: (currentIndex: number) => void;
}

const Swiper = ({ children, onSwipe }: Props) => {
  const maxIndex = Children.count(children) - 1;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [deltaX, setDeltaX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const handleStart = (clientX: number) => {
    setStartX(clientX);
    setIsSwiping(true);
  };

  const handleMove = (clientX: number) => {
    if (!isSwiping) return;
    const moveX = clientX - startX;
    setDeltaX(moveX);
  };

  const handleEnd = () => {
    setDeltaX(0);

    if (Math.abs(deltaX) <= 50) return;

    setIsSwiping(false);
    if (deltaX > 0 && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else if (deltaX < 0 && currentIndex < maxIndex) {
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

  useLayoutEffect(() => {
    onSwipe?.(currentIndex);
  }, [currentIndex]);

  return (
    <SwipeContainer>
      <SwipeWrapper
        $currentIndex={currentIndex}
        $deltaX={deltaX}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </SwipeWrapper>
    </SwipeContainer>
  );
};

export default Swiper;

const SwipeContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const SwipeWrapper = styled.div<{ $currentIndex: number; $deltaX: number }>`
  display: flex;

  transform: ${({ $currentIndex, $deltaX }) =>
    `translateX(calc(${-$currentIndex * 100}% + ${$deltaX}px))`};
  transition: transform 0.3s ease;
  will-change: transform;
`;
