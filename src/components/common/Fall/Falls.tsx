import styled from 'styled-components';
import Leaf from './Leaf';

const Falls = () => {
  const numberOfLeaves = 4; // 생성할 낙엽 수
  const leaves = [];

  for (let i = 0; i < numberOfLeaves; i++) {
    const size = Math.random() * 15 + 15;
    const startX = Math.random() * window.innerWidth + 0.3 * window.innerWidth;
    const duration = Math.random() * 1 + 1;
    const delay = Math.random() * 7;
    const index = Math.floor(Math.random() * 2);

    leaves.push(
      <Leaf
        key={i}
        size={size}
        startX={startX}
        duration={duration}
        delay={delay}
        index={index}
      />
    );
  }
  return <Container>{leaves}</Container>;
};

export default Falls;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  z-index: 99;
`;
