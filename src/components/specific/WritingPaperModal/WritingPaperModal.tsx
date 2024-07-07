import styled from 'styled-components';
import MultiStepForm from './MultiStepForm';
import { useContext, useState } from 'react';
import MessageInputStep from './MessageInputStep';
import { useKeydownListener } from '@hooks/useKeydownListener';
import { modalDispatchContext } from '@/contexts/states/modalContext';
import DialogContainer from '@components/common/Modal/DialogContainer';
import ConfirmCancelModalContents from './ConfirmCancelModalContents';
import { KEYS } from '@constants/modal';
import KeywordInputStep from './KeywordInputStep';
import CardSelectStep from './CardSelectStep';
import GenerateCardButton from './NextButton';

interface Props {
  closeModal: (key?: string) => void;
  userId: number;
  userName: string;
  userImgUrl: string;
}

const WritingPaperModal = ({
  closeModal,
  userId,
  userName,
  userImgUrl,
}: Props) => {
  const [alias, setAlias] = useState('');
  const [message, setMessage] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [card, setCard] = useState('');
  const [sticker, setSticker] = useState('');

  const handleChangeAlias = (newAlias: string) => {
    setAlias(newAlias);
  };

  const handleChangeMessage = (value: string) => {
    setMessage(value);
  };

  const handleChangeKeywords = (newKeywords: string[]) => {
    setKeywords([...newKeywords]);
  };

  const handleChangeCard = (newCard: string) => {
    setCard(newCard);
  };

  const handleChangeSticker = (newSticker: string) => {
    setSticker(newSticker);
  };

  const { handleOpen, handleClose, handleClear } =
    useContext(modalDispatchContext);

  const handleCancel = () => {
    handleOpen(
      KEYS.WRITE_MESSAGE_CANCEL,
      <ConfirmCancelModalContents
        handleClose={() => handleClose()}
        handleSubmit={() => handleClear()}
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

  return (
    <Container>
      <MultiStepForm
        steps={[
          {
            title: '메세지 작성하기',
            component: (
              <MessageInputStep
                userImgUrl={userImgUrl}
                userName={userName}
                message={message}
                alias={alias}
                onChangeAlias={handleChangeAlias}
                onChangeMessage={handleChangeMessage}
              />
            ),
            canNext: message.length >= 5,
          },
          {
            title: '메세지 카드 커스텀',
            component: (
              <KeywordInputStep
                userName={userName}
                keywords={keywords}
                handleChangeKeywords={handleChangeKeywords}
              />
            ),
            NextButton: GenerateCardButton,
            canNext: keywords.length >= 2,
            onNext: () => {
              console.log('generating');
            },
          },
          {
            title: '메세지 카드 커스텀',
            component: (
              <div>
                {
                  <CardSelectStep
                    name={userName}
                    keywords={keywords}
                    handleChangeKeywords={handleChangeKeywords}
                  />
                }
              </div>
            ),
            canNext: true,
          },
          {
            title: '네번째 스텝',
            component: <div>4</div>,
            canNext: true,
          },
        ]}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default WritingPaperModal;

const Container = styled.div`
  height: calc(100vh - 40px);
  box-sizing: border-box;
`;
