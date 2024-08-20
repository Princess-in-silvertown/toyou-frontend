import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';

interface Props extends React.PropsWithChildren {
  modalKey: string;
  isClosing?: boolean;
  handleClose: (key?: string) => void;
}

const FullContainer = ({ isClosing, children }: Props) => {
  return (
    <>
      <Container $isClosing={isClosing}>{children}</Container>
    </>
  );
};

export default FullContainer;

const appear = keyframes`  
  from {
    background: rgba(0, 0, 0, 0);
  }
  to { 
    background: rgba(0, 0, 0, 0.5);
  }
`;

const disappear = keyframes`  
  from {
    background: rgba(0, 0, 0, 0.5);
  }
  to { 
      background: rgba(0, 0, 0, 0);

  }
`;

const slideInFromBottom = keyframes`  
  from {
    transform: translateY(100%);
  }
  to { 
    transform: translateY(0);
  }
`;

const slideInFromUp = keyframes`  
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

const Container = styled.div<{ $isClosing?: boolean }>`
  position: fixed;
  top: 0;
  min-height: 200px;

  width: 100%;
  max-width: 500px;
  height: fit-content;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.25) 0 0 15px;

  background: white;

  animation: 1s ease
    ${({ $isClosing }) => ($isClosing ? slideInFromUp : slideInFromBottom)};
  animation-fill-mode: both;

  touch-action: none;
`;
