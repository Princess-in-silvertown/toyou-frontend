import styled from 'styled-components';
import MultiStepForm from './MultiStepForm';
import { useContext, useMemo, useState } from 'react';
import MessageInputStep from './MessageInputStep';
import { useKeydownListener } from '@hooks/useKeydownListener';
import { modalDispatchContext } from '@/contexts/states/modalContext';
import DialogContainer from '@components/common/Modal/DialogContainer';
import ConfirmCancelModalContents from './ConfirmCancelModalContents';
import { KEYS } from '@constants/modal';
import KeywordInputStep from './KeywordInputStep';
import CardSelectStep from './CardSelectStep';
import GenerateCardButton from './NextButton';
import Recipient from './Recipient';
import { useViewportHeight } from '@hooks/useViewportHeight';
import { User } from '@/types/user';
import UserSearchStep from './UserSearchStep/UserSearchStep';

interface Props {
  closeModal: (key?: string) => void;
  userId: number;
  userName?: string;
  userImgUrl: string;
}

const WritingPaperModal = ({ closeModal }: Props) => {
  const [userInfo, setUserInfo] = useState<User>({
    id: -1,
    name: '',
    imgUrl: '',
  });
  const [alias, setAlias] = useState('');
  const [message, setMessage] = useState('');
  const [keywords, setKeywords] = useState<string[] | undefined>();
  const [card, setCard] = useState('');
  const [sticker, setSticker] = useState('');

  const handleChangeInfo = (newInfo: Partial<User>) => {
    setUserInfo({ ...userInfo, ...newInfo });
  };

  const handleChangeAlias = (newAlias: string) => {
    setAlias(newAlias);
  };

  const handleChangeMessage = (value: string) => {
    setMessage(value);
  };

  const handleChangeKeywords = (newKeywords: string[]) => {
    setKeywords(() => [...newKeywords]);
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
  const viewHeight = useViewportHeight();
  const height = useMemo(() => viewHeight, []);

  return (
    <Container style={{ height }}>
      <MultiStepForm
        steps={[
          {
            title: '메세지 작성하기',
            component: <UserSearchStep onChangeUserInfo={handleChangeInfo} />,
            canNext: true,
          },
          {
            title: '메세지 작성하기',
            component: (
              <MessageInputStep
                userName={userInfo.name}
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
                message={message}
                keywords={keywords}
                onChangeKeywords={handleChangeKeywords}
              />
            ),
            NextButton: GenerateCardButton,
            canNext: keywords && keywords.length >= 1,
          },
          {
            title: '메세지 카드 커스텀',
            component: (
              <CardSelectStep
                name={userInfo.name}
                keywords={keywords ?? []}
                handleChangeKeywords={setKeywords}
              />
            ),
            canNext: true,
          },
        ]}
        headerContents={
          <Recipient userName={userInfo.name} imgUrl={userInfo.imgUrl} />
        }
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
