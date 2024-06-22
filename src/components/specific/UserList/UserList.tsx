import styled, { keyframes } from 'styled-components';
import UserItem from './UserItem';
import { useUserList } from '@hooks/queries/useUserList';
import { useParams } from 'react-router-dom';

const UserList = () => {
  const { groupId } = useParams();

  const { data: userList } = useUserList(Number(groupId));

  return (
    <Container>
      {userList?.map((user) => (
        <UserItem key={user.id} {...user} />
      ))}
    </Container>
  );
};

export default UserList;

const slideInFromRight = keyframes`  
  from {
    transform: translateX(110%);
  }
  to {
    transform: translateX(0);
  }
`;

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 20px 25px;

  animation: 0.5s ease-out ${slideInFromRight};
`;
