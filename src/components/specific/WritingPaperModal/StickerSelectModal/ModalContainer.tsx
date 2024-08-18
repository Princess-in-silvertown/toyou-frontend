import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';

interface Props extends React.PropsWithChildren {
  modalKey: string;
  isClosing?: boolean;
  handleClose: (key?: string) => void;
}

const ModalContainer = ({
  modalKey,
  isClosing,
  children,
  handleClose,
}: Props) => {
  return (
    <>
      <BackDrop $isClosing={isClosing} />
      <Container $isClosing={isClosing}>{children}</Container>
    </>
  );
};

export default ModalContainer;

const appear = keyframes`  
  from {
    opacity: 0;
  }
  to { 
    opacity: 1;
  }
`;

const disappear = keyframes`  
  from {
    opacity: 1;
  }
  to { 
    opacity: 0;
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
  bottom: -300px;

  touch-action: none;

  background: rgba(33, 33, 33, 0.85);

  animation: 0.3s ease-in-out
    ${({ $isClosing }) => ($isClosing ? disappear : appear)};
  animation-fill-mode: both;
`;

const slideInFromBottom = keyframes`  
  from {
    transform: translateX(100%);
  }
  to { 
    transform: translateX(0);
  }
`;

const slideInFromUp = keyframes`  
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const Container = styled.div<{ $isClosing?: boolean }>`
  position: fixed;
  top: 0;

  width: 100%;
  height: 100%;

  overflow-y: auto;

  animation: 0.5s ease-out
    ${({ $isClosing }) => ($isClosing ? slideInFromUp : slideInFromBottom)};
  animation-fill-mode: both;
`;
