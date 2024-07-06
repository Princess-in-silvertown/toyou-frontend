import { ReactNode, createContext } from 'react';

export type ModalContainer = {
  modalKey: string;
  isClosing?: boolean;
  handleClose: (key?: string) => void;
};

export type Modal = {
  key: string;
  isClosing: boolean;
  children: ReactNode;
  container?: React.FC<ModalContainer>;
};

export type ModalDispatch = {
  handleOpen: (
    key: string,
    newNode: ReactNode,
    container?: React.FC<ModalContainer>
  ) => void;
  handleClose: (key?: string) => void;
  handleClear: () => void;
};

export type ModalContext = {
  [key: string]: Modal;
};

export const modalContext = createContext<ModalContext>({});

export const modalDispatchContext = createContext<ModalDispatch>({
  handleOpen: (
    key: string,
    newNode: ReactNode,
    container?: React.FC<ModalContainer>
  ) => {},
  handleClose: (key?: string) => {},
  handleClear: () => {},
});
