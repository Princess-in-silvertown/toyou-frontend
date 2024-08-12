import styled from 'styled-components';
import MultiStepForm from './MultiStepForm';
import { useContext, useMemo } from 'react';
import { useKeydownListener } from '@hooks/useKeydownListener';
import { modalDispatchContext } from '@/contexts/states/modalContext';
import DialogContainer from '@components/common/Modal/DialogContainer';
import ConfirmCancelModalContents from './ConfirmCancelModalContents';
import { KEYS } from '@constants/modal';
import { useViewportHeight } from '@hooks/useViewportHeight';
import UserSearchStep from './UserSearchStep/UserSearchStep';
import KeywordInputStep from './KeywordInputStep/KeywordInputStep';
import CardEditStep from './CardEditStep/CardEditStep';
import { messageFormContext } from '@/contexts/states/messageFormContext';
import PaperMessageInputStep from './PaperMessageInputStep/PaperMessageInputStep';

interface Props {
  closeModal: (key?: string) => void;
}

const WritingPaperModal = ({ closeModal }: Props) => {
  const { keywords, message } = useContext(messageFormContext);

  const { handleOpen, handleClose, handleClear } =
    useContext(modalDispatchContext);

  const handleAllClose = () => {
    closeModal();

    handleClear();
  };

  const handleCancel = () => {
    handleOpen(
      KEYS.WRITE_MESSAGE_CANCEL,
      <ConfirmCancelModalContents
        handleClose={() => handleClose()}
        handleSubmit={() => handleAllClose()}
      />,
      DialogContainer
    );
  };

  const handleSubmit = () => {
    const request = async () => {
      // 메세지 작성 요청

      await closeModal();
    };

    request();
  };

  useKeydownListener('Escape', handleCancel);
  const viewHeight = useViewportHeight();
  const height = useMemo(() => viewHeight ?? 0, []);

  return (
    <Container style={{ height }}>
      <MultiStepForm
        steps={[
          {
            component: <UserSearchStep />,
          },
          {
            component: <PaperMessageInputStep />,
            canNext: message.length >= 5,
          },
          {
            component: (
              <KeywordInputStep
                canNext={keywords && keywords.length >= 1}
                modalHeight={height}
              />
            ),
            canNext: keywords && keywords.length >= 1,
          },
          {
            component: <CardEditStep />,
            canNext: true,
          },
        ]}
        progressiveStartIndex={1}
        progressiveLastIndex={3}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default WritingPaperModal;

const Container = styled.div`
  box-sizing: border-box;
  padding: 20px 25px;

  overflow: hidden;
`;
