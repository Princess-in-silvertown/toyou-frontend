import { modalDispatchContext } from '@/contexts/states/modalContext';
import { useCustomNavigate } from '@/routers/useCustomNavigate';
import { Group } from '@/types/group';
import { useContext } from 'react';
import styled from 'styled-components';

interface Props extends Group {}

const GroupItem = ({ id, name, value, userCount }: Props) => {
  const { goToSearchingUserPage } = useCustomNavigate();

  const handleClickGroupItem = () => {
    goToSearchingUserPage(id);
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
