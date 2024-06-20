export type ModalType = 'Confirmation' | 'Basic' | undefined;

export type ModalInfo = {
  type?: ModalType;
  isOpen?: boolean;
  isClosing?: boolean;
  handleClose: () => void;
  handleAction?: () => void;
};
