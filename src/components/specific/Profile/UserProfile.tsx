import { modalDispatchContext } from '@/contexts/states/modalContext';
import { ConfirmButton } from '@components/common/Modal';
import { useUserProfile } from '@hooks/queries/useUserProfile';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const UserProfile = () => {
  const { userId } = useParams();

  if (isNaN(Number(userId))) throw new Error('wrong userId');

  const { data: user } = useUserProfile(Number(userId));
  const { handleOpen, handleClose } = useContext(modalDispatchContext);

  const handleClickWritingButton = () => {
    handleOpen(
      <Container>
        <TextArea />
        <ConfirmButton handleClose={handleClose} handleSubmit={handleClose} />
      </Container>
    );
  };

  return (
    <Container>
      <Title>{user?.name} 님의 프로필</Title>
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

const TextArea = styled.textarea`
  height: 70vh;
  width: 100%;

  border: none;
`;
