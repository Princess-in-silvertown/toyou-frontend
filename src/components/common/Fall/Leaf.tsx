import styled, { keyframes } from 'styled-components';
import leaf1 from '@assets/icons/fall-leaf1.svg';
import leaf2 from '@assets/icons/fall-leaf2.svg';
import leaf3 from '@assets/icons/fall-leaf3.svg';

interface Props {
  size: number;
  startX: number;
  duration: number;
  delay: number;
  index: number;
}

const Leaf = ({ size, startX, duration, delay, index }: Props) => {
  const leaf = [leaf1, leaf2][index];

  return (
    <Container $startX={startX}>
      <Translate $delay={delay} $duration={duration}>
        <Rotate $delay={delay} $duration={duration}>
          <FallImage src={leaf} $size={size} />
        </Rotate>
      </Translate>
    </Container>
  );
};

export default Leaf;

const diagonalRotate = keyframes`
    0% {
      transform: rotate3d(1, 1, 0, 0deg);
      -webkit-transform: rotate3d(1, 1, 0, 0deg);
    }
    100% {
      transform: rotate3d(1, 1, 0, 360deg);
      -webkit-transform: rotate3d(1, 1, 0, 360deg);
    }
  `;

const translate = keyframes`
    0% {
      transform: translate(0, 0) ;
      opacity: 0; 
    }
    10%{
      opacity: 1; 
    }
    90%{
      opacity: 1; 
    }
    100% {
      transform: translate(-700px, 700px);
      opacity: 0; 
    }
  `;

const Container = styled.div<{ $startX: number }>`
  position: absolute;

  transform: translateX(${({ $startX }) => `${$startX}px`});
`;

const Translate = styled.div<{ $delay: number; $duration: number }>`
  animation: ${translate} linear both infinite;
  animation-delay: ${({ $delay }) => `${$delay}s`};
  animation-duration: ${({ $duration }) => `${$duration * 7}s`};
`;

const Rotate = styled.div<{ $delay: number; $duration: number }>`
  transform-origin: top left;
  animation: ${diagonalRotate} 1s linear both infinite;
  animation-delay: ${({ $delay }) => `${$delay}s`};
  animation-duration: ${({ $duration }) => `${$duration}s`};
`;

const FallImage = styled.img<{ $size: number }>`
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
`;
