import { ModalInfo, ModalType } from '@/types/modal';
import BasicModal from './BasicModal';
import ConfirmationModal from './ConfirmationModal';

interface Props extends React.PropsWithChildren<ModalInfo> {}

const getModalComponentByType = (props: Props) => {
  switch (props.type) {
    case 'Confirmation':
      return <ConfirmationModal {...props} />;

    default:
      return <BasicModal {...props} />;
  }
};

const ModalSelector = (props: Props) => {
  return <>{getModalComponentByType(props)}</>;
};

export default ModalSelector;
