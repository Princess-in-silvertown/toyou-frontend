import { MessageFormProvider } from '@/contexts/providers/MessageFormProvider';
import { modalDispatchContext } from '@/contexts/states/modalContext';
import FullContainer from '@components/common/Modal/FullContainer';
import GroupList from '@components/specific/GroupList/GroupList';
import MyGroupList from '@components/specific/MyGroupList/MyGroupList';
import WritingPaperModal from '@components/specific/WritingPaperModal/WritingPaperModal';
import { KEYS } from '@constants/modal';
import { useMyGroupList } from '@hooks/queries/useMyGroupList';
import { useUserProfile } from '@hooks/queries/useUserProfile';
import { useContext } from 'react';
import styled from 'styled-components';

const HomePage = () => {
  useMyGroupList();

  const { handleOpen, handleClose } = useContext(modalDispatchContext);

  const handleClickWritingButton = () => {
    handleOpen(
      KEYS.WRITE_MESSAGE,
      <MessageFormProvider>
        <WritingPaperModal closeModal={handleClose} />,
      </MessageFormProvider>,
      FullContainer
    );
  };

  return (
    <>
      <WritingButton onClick={handleClickWritingButton}>
        글 작성하러 가기
      </WritingButton>
    </>
  );
};

export default HomePage;

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
