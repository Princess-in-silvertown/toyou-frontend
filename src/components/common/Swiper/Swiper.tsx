import { useDrag } from '@hooks/useDrag';
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
  const maxIndex = Children.count(children) - 1;

  const { collected, bind } = useDrag({
    moveXMinMax: $width
      ? [-$width - ($gap ?? 0), $width + ($gap ?? 0)]
      : [Infinity, Infinity],

    onEnd: ({ delta }) => {
      const [deltaX] = delta;

      if (Math.abs(deltaX) <= 50) return;

      if (deltaX > 0 && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      } else if (deltaX < 0 && currentIndex < maxIndex) {
        setCurrentIndex((prev) => prev + 1);
      }
    },
  });

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
    <SwipeContainer {...bind}>
      <Padding $padding={$padding ?? 0}>
        <SwipeWrapper
          style={{
            transform: `translateX(calc(${
              $width ? `${-currentIndex * $width}px` : `${-currentIndex * 100}%`
            } + ${-currentIndex * ($gap ?? 0)}px + ${collected.deltaX}px))`,
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
