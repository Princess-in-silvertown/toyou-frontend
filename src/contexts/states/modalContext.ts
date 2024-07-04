import { ReactNode, createContext } from 'react';

export type ModalDispatch = {
  handleOpen: (key: string, newNode: ReactNode) => void;
  handleClose: (key?: string) => void;
};

export type Modal = {
  key: string;
  isClosing: boolean;
  children: ReactNode;
};

export type ModalContext = {
  [key: string]: Modal;
};

export const modalContext = createContext<ModalContext>({});

export const modalDispatchContext = createContext<ModalDispatch>({
  handleOpen: (key: string, newNode: ReactNode) => {},
  handleClose: (key?: string) => {},
});
