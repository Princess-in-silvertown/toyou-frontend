import styled from 'styled-components';
import { ChangeEvent, useRef } from 'react';
import Recipient from './Recipient';
import RecipientAliasEdit from './RecipientAliasEdit';

interface Props {
  userImgUrl: string;
  userName: string;
  canNext?: boolean;
  alias: string;
  message: string;
  onChangeAlias: (newAlias: string) => void;
  onChangeMessage: (value: string) => void;
}

const MessageInputStep = ({
  userImgUrl,
  userName,
  message,
  alias,
  onChangeMessage,
  onChangeAlias,
}: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleNextAliasInput = () => {
    // delay to solve collision focus and css animation
    setTimeout(() => textareaRef.current?.focus(), 150);
  };

  const handleChangeMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;

    onChangeMessage(text);
  };

  const handleChangeAlias = onChangeAlias;

  return (
    <Container>
      <Recipient userName={userName} imgUrl={userImgUrl} />
      <RecipientAliasEdit
        recipientName={userName}
        recipientAlias={alias}
        onChangeAlias={handleChangeAlias}
        onNext={handleNextAliasInput}
      >
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={handleChangeMessage}
          placeholder="메세지를 적어주세요"
        />
      </RecipientAliasEdit>
    </Container>
  );
};

export default MessageInputStep;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Textarea = styled.textarea`
  height: 400px;
  width: 100%;
  border: none;

  font-size: 16px;
  font-weight: 400;
  line-height: 23px;

  color: #616161;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #9e9e9e;
  }
`;
