import React from 'react';
import styled, { keyframes } from 'styled-components';

interface Props extends React.PropsWithChildren {
  modalKey: string;
  isClosing?: boolean;
  handleClose: (key?: string, time?: number) => void;
}

const PaperListModalContainer = ({
  modalKey,
  isClosing,
  children,
  handleClose,
}: Props) => {
  const handleClickBackDrop = () => {
    handleClose(modalKey, 0);
  };

  return (
    <>
      <BackDrop $isClosing={isClosing} onClick={handleClickBackDrop} />
      <Container $isClosing={isClosing}>{children}</Container>
    </>
  );
};

export default PaperListModalContainer;

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
  bottom: 0;

  background: #f2f1edf2;
  /* background: #212121d9; */

  animation: 0.7s ease-out
    ${({ $isClosing }) => ($isClosing ? disappear : appear)};
  animation-fill-mode: both;
`;

const Container = styled.div<{ $isClosing?: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 500px;

  transform: translateX(-50%);
  animation: 0.7s ease-out
    ${({ $isClosing }) => ($isClosing ? disappear : appear)};
  animation-fill-mode: both;
`;
