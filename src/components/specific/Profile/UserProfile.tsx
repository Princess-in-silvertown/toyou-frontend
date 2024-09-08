import { modalDispatchContext } from '@/contexts/states/modalContext';
import { useUserProfile } from '@hooks/queries/useUserProfile';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import WritingPaperModal from '../WritingPaperModal/WritingPaperModal';
import { KEYS } from '@constants/modal';
import FullContainer from '@components/common/Modal/FullContainer';
import { MessageFormProvider } from '@/contexts/providers/MessageFormProvider';

const UserProfile = () => {
  const { userId } = useParams();

  if (isNaN(Number(userId))) throw new Error('wrong userId');

  const { data: user } = useUserProfile(Number(userId));
  const { handleOpen, handleClose } = useContext(modalDispatchContext);

  const { id, imageUrl, name } = user ?? {};

  const handleClickWritingButton = () => {
    handleOpen(
      KEYS.WRITE_MESSAGE,
      <MessageFormProvider>
        <WritingPaperModal closeModal={handleClose} />
      </MessageFormProvider>,
      FullContainer
    );
  };

  return (
    <Container>
      <Title>{name} 님의 프로필</Title>
      <UserImage />
      <WritingButton onClick={handleClickWritingButton}>
        글 작성하러 가기
      </WritingButton>
    </Container>
  );
};

export default UserProfile;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;

  margin: 25px 0;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  box-sizing: border-box;

  font-size: 18px;
  color: gray;
`;

const WritingButton = styled.button`
  font-size: 18px;
  color: gray;
`;

const UserImage = styled.div`
  width: 330px;
  height: 330px;
  border-radius: 10px;

  background-color: lightgray;
`;
