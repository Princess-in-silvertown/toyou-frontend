import React from 'react';
import styled, { keyframes } from 'styled-components';

interface Props extends React.PropsWithChildren {
  modalKey: string;
  isClosing?: boolean;
  handleClose: (key?: string) => void;
}

const DialogContainer = ({
  modalKey,
  isClosing,
  handleClose,
  children,
}: Props) => {
  const handleClickBackDrop = () => {
    handleClose(modalKey);
  };

  return (
    <>
      <BackDrop onClick={handleClickBackDrop} />
      <Container $isClosing={isClosing}>{children}</Container>
    </>
  );
};

export default DialogContainer;

const appear = keyframes`  
  from {
    background: rgba(0, 0, 0, 0);
  }
  to { 
    background: rgba(0, 0, 0, 0.1);
  }
`;

const disappear = keyframes`  
  from {
    background: rgba(0, 0, 0, 0.1);
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
  bottom: -30px;

  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(0.5px);

  animation: 0.3s ease-in-out
    ${({ $isClosing }) => ($isClosing ? disappear : appear)};
`;

const slideInFromBottom = keyframes`  
  from {
    opacity: 0.7;
    transform: translate(-50%, 50%);
  }
  to { 
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`;

const slideInFromUp = keyframes`  
  from {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
  to {
    opacity: 0;
    transform: translate(-50%, 50%);
  }
`;

const Container = styled.div<{ $isClosing?: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 90vw;
  max-width: 500px;
  height: fit-content;
  min-height: 150px;
  max-height: 80%;
  padding: 25px;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.25) 0 0 15px;

  background-color: ${({ theme }) => theme.color.white};

  overflow-y: auto;

  animation: 0.5s ease-out
    ${({ $isClosing }) => ($isClosing ? slideInFromUp : slideInFromBottom)};
  animation-fill-mode: forwards;

  touch-action: none;
`;
