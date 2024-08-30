import React, {
  Children,
  MouseEventHandler,
  TouchEventHandler,
  useLayoutEffect,
  useState,
} from 'react';
import styled from 'styled-components';

interface Props extends React.PropsWithChildren {
  onSwipe?: (currentIndex: number) => void;
  startIndex?: number;
  $width?: number;
  $padding?: number;
  $gap?: number;
}

const Swiper = ({
  children,
  startIndex,
  $width,
  $gap,
  $padding,
  onSwipe,
}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex ?? 0);
  const [startX, setStartX] = useState(0);
  const [deltaX, setDeltaX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const maxIndex = Children.count(children) - 1;

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

  const swiperChildren = Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      if (!child.props.$width || !child.props.$gap) {
        return React.cloneElement(child, {
          ...child.props,
          $width,
          $gap,
        });
      } else {
        return React.cloneElement(child);
      }
    }
  });

  return (
    <SwipeContainer
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Padding $padding={$padding ?? 0}>
        <SwipeWrapper
          style={{
            transform: `translateX(calc(${
              $width ? `${-currentIndex * $width}px` : `${-currentIndex * 100}%`
            } + ${-currentIndex * ($gap ?? 0)}px + ${deltaX}px))`,
          }}
          $gap={$gap ?? 0}
        >
          {swiperChildren}
        </SwipeWrapper>
      </Padding>
    </SwipeContainer>
  );
};

export default Swiper;

const SwipeContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const Padding = styled.div<{ $padding: number }>`
  padding: ${({ $padding }) => `0 ${$padding}px`};
`;

const SwipeWrapper = styled.ul<{ $gap: number }>`
  display: flex;
  gap: ${({ $gap }) => `0 ${$gap}px`};

  transition: transform 0.3s ease-out;
  will-change: transform;
`;
