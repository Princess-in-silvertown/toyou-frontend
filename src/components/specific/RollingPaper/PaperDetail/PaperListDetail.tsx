import { useMyMessageList } from '@hooks/queries/useMyMessageList';
import styled from 'styled-components';
import PaperItemDetail from './PaperItemDetail';
import { useViewport } from '@hooks/useViewport';
import { useDrag } from '@hooks/useDrag';
import { useMemo, useRef, useState } from 'react';

interface Props {
  index: number;
}

const PaperListDetail = ({ index }: Props) => {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useMyMessageList();

  const [, height] = useViewport();
  const vh = useMemo(() => height - 100, []);

  const [currentIndex, setCurrentIndex] = useState(index);

  const { collected, bind } = useDrag({
    moveYMinMax: [-587, 587],

    onMove: ({ delta, setStates }) => {
      const [, deltaY] = delta;

      setStates.setY(deltaY);
    },

    onEnd: ({ delta, velocity, setStates }) => {
      const [, deltaY] = delta;

      setStates.setY(0);

      const isDragDown = deltaY < -75;
      const isDragUp = deltaY > 75;

      if (isDragDown && currentIndex < data.length - 1) {
        return setCurrentIndex((prev) => prev + 1);
      } else if (isDragUp && currentIndex > 0) {
        return setCurrentIndex((prev) => prev - 1);
      }

      setStates.canDrag(false);
      setTimeout(() => setStates.canDrag(true), 300);
    },
  });

  const observerRef = useRef<IntersectionObserver>();

  const lastItemRef = (node: HTMLLIElement) => {
    if (isFetchingNextPage) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (node) observerRef.current.observe(node);
  };

  const y = Math.abs(collected.y) > 10 ? collected.y : 0;

  return (
    <Container {...bind} style={{ height }}>
      <ListContainer
        style={{
          transform: `translateY(${-currentIndex * 562 + y + vh / 2 - 250}px)`,
        }}
      >
        {data.map((paper, index) => (
          <ItemContainer
            key={index}
            ref={index + 1 === data.length ? null : lastItemRef}
          >
            <PaperItemDetail isCurrent={index === currentIndex} {...paper} />
          </ItemContainer>
        ))}
      </ListContainer>
    </Container>
  );
};

export default PaperListDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  overflow: hidden;
`;

const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 40px;

  width: 100%;
  height: 100%;

  transition: transform 0.3s ease-out;
`;

const ItemContainer = styled.li``;
