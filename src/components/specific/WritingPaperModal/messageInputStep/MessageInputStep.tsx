import styled from 'styled-components';
import { ChangeEvent, useEffect, useRef } from 'react';
import RecipientAliasEdit from './RecipientAliasEdit';

interface Props {
  userName: string;
  canNext?: boolean;
  alias: string;
  message: string;
  onChangeAlias: (newAlias: string) => void;
  onChangeMessage: (value: string) => void;
}

const MessageInputStep = ({
  userName,
  message,
  alias,
  onChangeMessage,
  onChangeAlias,
}: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);

  const handleNextAliasInput = () => {
    // delay to solve collision focus and css animation
    setTimeout(() => textareaRef.current?.focus({ preventScroll: true }), 300);
  };

  const handleChangeMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;

    onChangeMessage(text);
  };

  const handleChangeAlias = onChangeAlias;

  useEffect(() => {
    if (!textareaRef || !textareaRef.current) return;

    textareaRef.current.onfocus = () => {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
    };
  }, []);

  useEffect(() => {
    if (pRef.current && textareaRef.current) {
      pRef.current.textContent = message;
      const newHeight = pRef.current.offsetHeight + 20;
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [message]);

  return (
    <Container>
      <RecipientAliasEdit
        recipientName={userName}
        recipientAlias={alias}
        message={message}
        onChangeAlias={handleChangeAlias}
        onNext={handleNextAliasInput}
      >
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={handleChangeMessage}
          placeholder="내용을 입력하세요."
        />
        <TextareaHeightCalculator ref={pRef} />
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
  width: 100%;
  height: 100px;
  border: none;

  font-size: 16px;
  font-weight: 400;
  line-height: 23px;

  color: #616161;

  scroll-behavior: auto;
  overflow: hidden;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #9e9e9e;
  }
`;

const TextareaHeightCalculator = styled.p`
  position: absolute;
  visibility: hidden;
  white-space: pre-wrap;
  font-size: 16px;
  font-weight: 400;
  line-height: 23px;
  max-height: 350px;
`;