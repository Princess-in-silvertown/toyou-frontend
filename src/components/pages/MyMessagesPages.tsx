import styled from 'styled-components';

const MyMessagesPages = () => {
  return (
    <Container>
      <Title>효섭 님의 메시지함</Title>
      <MyMessageList />
    </Container>
  );
};

const Container = styled.div`
  padding: 15px 25px;
  box-sizing: border-box;
`;

const Title = styled.div`
  margin-top: 15px;

  font-size: 20px;
  font-weight: 500;
  line-height: 23.87px;
  letter-spacing: -0.02em;
`;

export default MyMessagesPages;

const MyMessageList = () => {
  return (
    <MyMessageListContainer>
      <MessageLengthContainer>
        <LengthText>받은 메시지</LengthText>
        <LengthNumber>3</LengthNumber>
      </MessageLengthContainer>
    </MyMessageListContainer>
  );
};

const MyMessageListContainer = styled.div`
  margin-top: 7px;
`;

const MessageLengthContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

const LengthText = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 27px;

  color: #616161;
`;

const LengthNumber = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 27px;

  color: #dd432e;
`;

const MyMessageItem = () => {
  <></>;
};
