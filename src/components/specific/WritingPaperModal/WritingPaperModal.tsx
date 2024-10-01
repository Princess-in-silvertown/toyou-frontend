import styled from 'styled-components';
import MultiStepForm from './MultiStepForm';
import { useContext, useEffect, useState } from 'react';
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
import { RollingPaperForm } from '@/types/paper';
import { useWritePaper } from '@hooks/queries/useWritePaper';
import ThemeSelectStep from './ThemeSelectStep/ThemeSelectStep';
import CoverSelectStep from './CoverSelectStep/CoverSelectStep';

interface Props {
  closeModal: (key?: string) => void;
  userInfo?: User;
}

const WritingPaperModal = ({ closeModal, userInfo }: Props) => {
  const {
    alias,
    cardTheme,
    coverImgUrl,
    keywords,
    stickers,
    message,
    groupId,
    userInfo: info,
  } = useContext(messageFormContext);

  const { handleChangeInfo } = useContext(messageFormDispatchContext);

  const { handleOpen, handleClose, handleClear } =
    useContext(modalDispatchContext);

  const { mutateAsync, isPending, isSubmitted } = useWritePaper(info.id);

  const handleAllClose = () => {
    closeModal();

    handleClear(1000);
  };

  const handleCancel = () => {
    handleOpen(
      KEYS.WRITE_MESSAGE_CANCEL,
      <ConfirmCancelModalContents
        handleClose={() => handleClose(KEYS.WRITE_MESSAGE_CANCEL)}
        handleSubmit={() => handleAllClose()}
      />,
      DialogContainer
    );
  };

  const handleSubmit = () => {
    const paper: RollingPaperForm = {
      groupId,
      themeId: cardTheme,
      coverImageUrl: coverImgUrl,
      content: message,
      title: alias,
      stickers: [...stickers.values()].map((sticker) => {
        const { rotate, scale, side, x, y, imageUrl } = sticker;

        return {
          imageUrl,
          rotate,
          scale,
          x: Math.floor(x),
          y: Math.floor(y),
          side,
        };
      }),
    };

    mutateAsync(paper).then(() => {
      setTimeout(() => handleAllClose(), 1000);
    });
  };

  useKeydownListener('Escape', handleCancel);

  const [, height] = useViewport();

  const getSteps = () => {
    if (!userInfo) {
      return [
        {
          component: <UserSearchStep />,
        },
        {
          component: <PaperMessageInputStep />,
          canNext: message.length >= 1,
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
          component: <CoverSelectStep />,
          canNext: true,
        },
        {
          component: (
            <CardEditStep
              isPendingSubmit={isPending}
              isSubmitted={isSubmitted}
            />
          ),
          canNext: height > 670 ? undefined : coverImgUrl.length > 0,
        },
      ];
    }

    return [
      {
        component: <ThemeSelectStep />,
      },
      {
        component: <PaperMessageInputStep />,
        canNext: message.length >= 1,
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
        component: <CoverSelectStep />,
        canNext: coverImgUrl.length > 0,
      },
      {
        component: (
          <CardEditStep isPendingSubmit={isPending} isSubmitted={isSubmitted} />
        ),
        canNext: coverImgUrl.length > 1,
      },
    ];
  };

  useEffect(() => {
    if (userInfo) {
      handleChangeInfo({ ...userInfo });
    }
  }, []);

  return (
    <Container style={{ height }}>
      <MultiStepForm
        steps={getSteps()}
        progressiveStartIndex={1}
        progressiveLastIndex={4}
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
