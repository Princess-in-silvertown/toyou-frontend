import styled from 'styled-components';
import { User } from '@/types/user';
import { useCustomNavigate } from '@/routers/useCustomNavigate';

interface Props extends User {}

const UserItem = ({ id, name }: Props) => {
  const { goToUserProfilePage } = useCustomNavigate();

  const handleClickGroupItem = () => {
    goToUserProfilePage(id);
  };

  return (
    <Container onClick={handleClickGroupItem}>
      <Name>{name}</Name>
    </Container>
  );
};

export default UserItem;

const Container = styled.li`
  display: flex;
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
