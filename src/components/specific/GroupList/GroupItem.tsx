import { modalDispatchContext } from '@/contexts/states/modalContext';
import { Group } from '@/types/group';
import { useContext } from 'react';
import styled from 'styled-components';

interface Props extends Group {}

const GroupItem = ({ name, value, userCount }: Props) => {
  const { handleOpen, setupHandler } = useContext(modalDispatchContext);

  const handleClickGroupItem = () => {
    const modalContents = (
      <ModalMessage>{value} 그룹에 들어가시겠습니까?</ModalMessage>
    );

    handleOpen(modalContents);
    setupHandler(() => {});
  };

  return (
    <Container onClick={handleClickGroupItem}>
      <Name>{name}</Name>
      <UserCount>{userCount}</UserCount>
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

const ModalMessage = styled.div`
  font-size: 14px;
  color: gray;
`;
