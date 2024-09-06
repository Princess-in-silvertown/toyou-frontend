import { useDrag } from '@hooks/useDrag';
import React, {
  Children,
  MouseEventHandler,
  TouchEventHandler,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import styled, { css, keyframes } from 'styled-components';

interface Props extends React.PropsWithChildren {
  onSwipe?: (currentIndex: number) => void;
  startIndex?: number;
  $width?: number;
  $padding?: number;
  $gap?: number;
  titles?: string[];
  isAutoSkipFirst?: boolean;
}

const Swiper = ({
  children,
  startIndex,
  titles,
  $width,
  $gap,
  $padding,
  isAutoSkipFirst,
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

  useEffect(() => {
    if (currentIndex === 0 && isAutoSkipFirst) {
      setTimeout(() => setCurrentIndex(1), 500);
    }
  }, [isAutoSkipFirst]);

  const indexedTitles =
    titles?.map((title, index) => {
      return { index, value: title };
    }) ?? [];

  return (
    <>
      {titles && (
        <TitleContainer>
          {indexedTitles?.map((title, index) => (
            <TitleButton
              key={title.value}
              $isCurrent={currentIndex === title.index}
              onClick={() => setCurrentIndex(index)}
            >
              {title.value}
            </TitleButton>
          ))}
        </TitleContainer>
      )}
      <SwipeContainer {...bind}>
        <Padding $padding={$padding ?? 0}>
          <SwipeWrapper
            style={{
              transform: `translateX(calc(${
                $width
                  ? `${-currentIndex * $width}px`
                  : `${-currentIndex * 100}%`
              } + ${-currentIndex * ($gap ?? 0)}px + ${collected.deltaX}px))`,
            }}
            $gap={$gap ?? 0}
          >
            {swiperChildren}
          </SwipeWrapper>
        </Padding>
      </SwipeContainer>
    </>
  );
};

export default Swiper;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

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

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  width: fit-content;
  margin: 0 auto;
  max-width: calc(100vw - 50px);
`;

const TitleButton = styled.button<{ $isCurrent: boolean }>`
  position: relative;

  color: ${({ $isCurrent }) => ($isCurrent ? '#212121' : '#9E9E9E')};

  ${({ $isCurrent }) => $isCurrent && underline}
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
