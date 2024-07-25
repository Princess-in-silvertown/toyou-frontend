import styled from 'styled-components';
import MultiStepForm from './MultiStepForm';
import { useContext, useMemo, useState } from 'react';
import { useKeydownListener } from '@hooks/useKeydownListener';
import { modalDispatchContext } from '@/contexts/states/modalContext';
import DialogContainer from '@components/common/Modal/DialogContainer';
import ConfirmCancelModalContents from './ConfirmCancelModalContents';
import { KEYS } from '@constants/modal';
import { useViewportHeight } from '@hooks/useViewportHeight';
import { User } from '@/types/user';
import UserSearchStep from './UserSearchStep/UserSearchStep';
import KeywordInputStep from './KeywordInputStep/KeywordInputStep';
import MessageInputStep from './messageInputStep/MessageInputStep';
import CardEditStep from './CardEditStep/CardEditStep';

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
  const [alias, setAlias] = useState('집에 가고 싶은 누군가에게 ㅠㅠ');
  const [message, setMessage] = useState(`안녕 보인아, 생일 축하해-!

오늘 최고로 행복한 하루 보내기를 바라. 너한테는 고마운게 많은데, 항상 표현을 잘 못했던 것 같아. 학교에서 매 학기마다 나와 함께해줘서 고마워. 네가 있어서 매번 잘 버텨낼 수 있었어.

못 본지 꽤 된 것 같아. 조만간 얼른 만나자! 다시한번 생일 진심으로 축하해.그럼 안녕!

안녕 보인아, 생일 축하해-!

오늘 최고로 행복한 하루 보내기를 바라. 너한테는 고마운게 많은데, 항상 표현을 잘 못했던 것 같아. 학교에서 매 학기마다 나와 함께해줘서 고마워. 네가 있어서 매번 잘 버텨낼 수 있었어.

못 본지 꽤 된 것 같아. 조만간 얼른 만나자! 다시한번 생일 진심으로 축하해.그럼 안녕!`);
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
  const height = useMemo(() => viewHeight ?? 0, []);

  return (
    <Container style={{ height }}>
      <MultiStepForm
        steps={[
          {
            component: <CardEditStep alias={alias} message={message} />,
            canNext: true,
          },
          {
            component: (
              <KeywordInputStep
                message={message}
                keywords={keywords}
                canNext={keywords && keywords.length >= 1}
                onChangeKeywords={handleChangeKeywords}
              />
            ),
            canNext: keywords && keywords.length >= 1,
          },
          {
            component: <CardEditStep alias={alias} message={message} />,
            canNext: true,
          },

          {
            component: <UserSearchStep onChangeUserInfo={handleChangeInfo} />,
            canNext: true,
          },
          {
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
