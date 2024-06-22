import styled, { keyframes } from 'styled-components';
import MyGroupItem from './MyGroupItem';
import { useMyGroupList } from '@hooks/queries/useMyGroupList';

const MyGroupList = () => {
  const { query } = useMyGroupList();
  const { data: groupList } = query;

  return (
    <Container>
      <Text>{'(내 그룹)'}</Text>
      {groupList?.map((group) => (
        <MyGroupItem key={group.id} {...group} />
      ))}
    </Container>
  );
};

export default MyGroupList;

const slideInFromLeft = keyframes`  
  from {
    transform: translateX(-110%);
  }
  to {
    transform: translateX(0);
  }
`;

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

const Text = styled.div`
  color: gray;
  font: 14px;
`;
