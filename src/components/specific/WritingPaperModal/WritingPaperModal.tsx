import styled from 'styled-components';
import MultiStepForm from './MultiStepForm';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useKeydownListener } from '@hooks/useKeydownListener';
import { modalDispatchContext } from '@/contexts/states/modalContext';
import DialogContainer from '@components/common/Modal/DialogContainer';
import ConfirmCancelModalContents from './ConfirmCancelModalContents';
import { KEYS } from '@constants/modal';
import UserSearchStep from './UserSearchStep/UserSearchStep';
import KeywordInputStep from './KeywordInputStep/KeywordInputStep';
import CardEditStep from './CardEditStep/CardEditStep';
import {
  messageFormContext,
  messageFormDispatchContext,
} from '@/contexts/states/messageFormContext';
import PaperMessageInputStep from './PaperMessageInputStep/PaperMessageInputStep';
import { useViewport } from '@hooks/useViewport';
import { User } from '@/types/user';

interface Props {
  closeModal: (key?: string) => void;
  userInfo?: User;
}

const WritingPaperModal = ({ closeModal, userInfo }: Props) => {
  const { keywords, message } = useContext(messageFormContext);

  const { handleChangeInfo } = useContext(messageFormDispatchContext);

  const { handleOpen, handleClose, handleClear } =
    useContext(modalDispatchContext);

  const [isWaitSubmit, setIsWaitSubmit] = useState(false);

  const waitSubmit = () => {
    setIsWaitSubmit(true);
  };

  const canEdit = () => {
    setIsWaitSubmit(false);
  };

  const handleAllClose = () => {
    closeModal();

    handleClear(1000);
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
  const [, height] = useViewport();

  const getSteps = () => {
    const arr = [
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
        component: (
          <CardEditStep
            isWaitSubmit={isWaitSubmit}
            canEdit={canEdit}
            waitSubmit={waitSubmit}
          />
        ),
        canNext: isWaitSubmit,
      },
    ];

    if (userInfo) arr.shift();

    return arr;
  };

  useEffect(() => {
    if (userInfo) {
      handleChangeInfo({ ...userInfo });
    }
  }, []);

  return (
    <Container style={{ height: height + 30 }}>
      <MultiStepForm
        steps={getSteps()}
        progressiveStartIndex={userInfo ? 0 : 1}
        progressiveLastIndex={userInfo ? 2 : 3}
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
