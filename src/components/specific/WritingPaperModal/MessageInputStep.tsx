import styled from 'styled-components';
import profile from '@assets/icons/profile.svg';
import { ChangeEvent } from 'react';

interface Props {
  userImgUrl: string;
  userName: string;
  canNext?: boolean;
  message: string;
  handleChangeMessage: (value: string) => void;
}

const MessageInputStep = ({
  userImgUrl,
  userName,
  message,
  handleChangeMessage,
}: Props) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;

    handleChangeMessage(text);
  };

  return (
    <Container>
      <UserContainer>
        <UserName>TO {userName}</UserName>
        <UserImage src={profile} />
      </UserContainer>
      <Textarea
        value={message}
        onChange={handleChange}
        placeholder="메세지를 적어주세요"
      />
    </Container>
  );
};

export default MessageInputStep;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: fit-content;
`;

const UserImage = styled.img`
  width: 35px;
  height: 35px;
`;

const UserName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 45px;

  font-size: 30px;
`;

const Textarea = styled.textarea`
  height: 400px;
  border: none;

  font-size: 16px;
  font-weight: 400;
  line-height: 23px;
  &:focus {
    outline: none;
  }
`;
