import { ReactNode, createContext } from 'react';

type ModalDispatch = {
  handleOpen: (newContents: ReactNode) => void;
  handleClose: () => void;
  setupHandler: (newHandler: () => void) => void;
};

type ModalContext = {
  isOpen: boolean;
  contents: ReactNode;
  handler?: () => void;
};

export const modalContext = createContext<ModalContext>({
  isOpen: false,
  contents: null,
});

export const modalDispatchContext = createContext<ModalDispatch>({
  handleOpen: () => {},
  handleClose: () => {},
  setupHandler: () => {},
});
