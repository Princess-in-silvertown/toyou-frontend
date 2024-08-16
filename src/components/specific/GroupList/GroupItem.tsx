import { modalDispatchContext } from '@/contexts/states/modalContext';
import { Group } from '@/types/group';
import { useContext } from 'react';
import styled from 'styled-components';
import GroupSelectModalContents from './GroupSelectModalContents';
import { useMyGroupList } from '@hooks/queries/useMyGroupList';
import { KEYS } from '@constants/modal';

interface Props extends Group {}

const GroupItem = ({ id, name }: Props) => {
  // const { mutateAsync } = mutation;

  const { handleOpen, handleClose } = useContext(modalDispatchContext);

  const handleModalSubmit = async () => {
    // mutateAsync(id).then(() => handleClose());
  };

  const handleClickGroupItem = () => {
    const modalContents = (
      <GroupSelectModalContents
        groupValue={''}
        handleSubmit={handleModalSubmit}
        handleClose={handleClose}
      />
    );

    handleOpen(KEYS.CONFIRM_ADD_GROUP, modalContents);
  };

  return (
    <Container onClick={handleClickGroupItem}>
      <Name>{name}</Name>
      <UserCount>{3}</UserCount>
    </Container>
  );
};

export default GroupItem;

const Container = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 35px;
  padding: 0 10px;
  box-sizing: border-box;

  color: gray;

  border-radius: 5px;
  background-color: lightgray;

  cursor: pointer;
`;

const Name = styled.div`
  font-size: 14px;
`;

const UserCount = styled.div`
  font-size: 12px;
`;
