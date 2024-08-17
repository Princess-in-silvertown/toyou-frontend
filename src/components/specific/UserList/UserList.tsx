import styled, { keyframes } from 'styled-components';
import { useParams } from 'react-router-dom';

const UserList = () => {
  const { groupId } = useParams();

  return <Container></Container>;
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
