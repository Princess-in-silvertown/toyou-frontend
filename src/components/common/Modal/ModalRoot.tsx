import React from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';

const portalElement = document.getElementById('modal-root')!;

interface Props extends React.PropsWithChildren {
  isOpen: boolean;
  isClosing?: boolean;
  handleClose: () => void;
}

const PortalModal = ({ isOpen, isClosing, handleClose, children }: Props) => {
  if (!isOpen) return null;

  return createPortal(
    <>
      <BackDrop onClick={handleClose} />
      <Container $isClosing={isClosing}>{children}</Container>
    </>,
    portalElement
  );
};

export default PortalModal;

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
  bottom: 0;

  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(0.5px);

  animation: 0.3s ease-in-out
    ${({ $isClosing }) => ($isClosing ? disappear : appear)};
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
  position: absolute;
  bottom: 0;
  min-height: 200px;

  width: 100%;
  padding: 20px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.25) 0 0 15px;

  background: white;

  animation: 0.5s ease-out
    ${({ $isClosing }) => ($isClosing ? slideInFromUp : slideInFromBottom)};
  animation-fill-mode: forwards;
`;
