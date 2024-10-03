import styled from 'styled-components';
import Leaf from './Leaf';
import { useMemo } from 'react';

const Falls = () => {
  const leaves = useMemo(() => {
    const numberOfLeaves = 5;
    const leaves = [];

    for (let i = 0; i < numberOfLeaves; i++) {
      const size = Math.random() * 15 + 15;
      const location = Math.random() * 2 * window.innerWidth;
      const startX = Math.min(location, window.innerWidth);
      const startY = Math.max(location, window.innerWidth) - window.innerWidth;
      console.log(startX, startY);
      const duration = Math.random() * 1 + 1;
      const delay = Math.random() * 7;
      const index = Math.floor(Math.random() * 2);

      leaves.push(
        <Leaf
          key={i}
          size={size}
          startX={startX}
          startY={startY}
          duration={duration}
          delay={delay}
          index={index}
        />
      );
    }

    return leaves;
  }, []);

  return <Container>{leaves}</Container>;
};

export default Falls;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;
