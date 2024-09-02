import { useImagePreLoad } from '@hooks/useImagePreLoad';
import styled, { keyframes } from 'styled-components';
import plus from '@assets/icons/plus.svg';

const LoadingCircle = () => {
  useImagePreLoad([plus]);

  return (
    <KeywordContainer>
      <Orbit>
        <Circle />
      </Orbit>
    </KeywordContainer>
  );
};

export default LoadingCircle;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const KeywordContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 300px;
  height: 300px;
  margin: 10px auto;
`;

const Orbit = styled.div`
  position: relative;
  width: 250px;
  height: 250px;

  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.color.gray400};

  animation: ${spin} 1.5s ease-in-out infinite;
`;

const Circle = styled.div`
  position: absolute;
  top: -16.5px;
  left: calc(50% - 16.5px);

  width: 33px;
  height: 33px;
  border-radius: 50%;

  background-color: ${({ theme }) => theme.color.red500};
`;
