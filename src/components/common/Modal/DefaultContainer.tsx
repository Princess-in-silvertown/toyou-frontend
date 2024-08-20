import { useScrollListener } from '@hooks/useScrollListener';
import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';

interface Props extends React.PropsWithChildren {
  modalKey: string;
  isClosing?: boolean;
  handleClose: (key?: string) => void;
}

const DefaultContainer = ({
  modalKey,
  isClosing,
  handleClose,
  children,
}: Props) => {
  const handleClickBackDrop = () => {
    handleClose(modalKey);
  };

  useScrollListener(false);

  return (
    <>
      <BackDrop onClick={handleClickBackDrop} />
      <Container $isClosing={isClosing}>{children}</Container>
    </>
  );
};

export default DefaultContainer;

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

const BackDrop = styled.div<{ $isClosing?: boolean }>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: -500px;

  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(0.5px);

  animation: 0.3s ease-in-out
    ${({ $isClosing }) => ($isClosing ? disappear : appear)};

  touch-action: none;
`;

const slideInFromBottom = keyframes`  
  from {
    opacity: 0.7;
    transform: translateY(100%);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInFromUp = keyframes`  
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(100%);
  }
`;

const Container = styled.div<{ $isClosing?: boolean }>`
  position: fixed;
  bottom: 0;
  min-height: 200px;

  width: 100%;
  max-width: 500px;
  height: fit-content;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.25) 0 0 15px;

  background: white;

  animation: 0.5s ease-out
    ${({ $isClosing }) => ($isClosing ? slideInFromUp : slideInFromBottom)};
  animation-fill-mode: both;
`;
