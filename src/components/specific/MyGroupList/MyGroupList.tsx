import styled, { keyframes } from 'styled-components';

const MyGroupList = () => {
  return (
    <Container>
      <Text>{'(내 그룹)'}</Text>
    </Container>
  );
};

export default MyGroupList;

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
