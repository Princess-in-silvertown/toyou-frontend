// import { ReactNode, createContext } from 'react';

// export type MessageFormContext = {

// };

// export type Modal = {
//   key: string;
//   isClosing: boolean;
//   children: ReactNode;
//   container?: React.FC<ModalContainer>;
// };

// export type ModalDispatch = {
//   handleOpen: (
//     key: string,
//     newNode: ReactNode,
//     container?: React.FC<ModalContainer>
//   ) => void;
//   handleClose: (key?: string) => void;
//   handleClear: () => void;
//   handleUpdate: (key: string, newNode: ReactNode) => void;
// };

// export type ModalContext = {
//   [key: string]: Modal;
// };

// export const modalContext = createContext<ModalContext>({});

// export const modalDispatchContext = createContext<ModalDispatch>({
//   handleOpen: (
//     key: string,
//     newNode: ReactNode,
//     container?: React.FC<ModalContainer>
//   ) => {},
//   handleClose: (key?: string) => {},
//   handleClear: () => {},
//   handleUpdate: (key: string, newNode: ReactNode) => {},
// });
