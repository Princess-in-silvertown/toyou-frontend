import styled from 'styled-components';
import { ChangeEvent, useContext, useEffect, useRef } from 'react';
import RecipientAliasEdit from './RecipientAliasEdit';
import {
  messageFormContext,
  messageFormDispatchContext,
} from '@/contexts/states/messageFormContext';

interface Props {
  canNext?: boolean;
}

const PaperMessageInputStep = ({}: Props) => {
  const { alias, message, userInfo } = useContext(messageFormContext);

  const {
    handleChangeAlias: onChangeAlias,
    handleChangeMessage: onChangeMessage,
  } = useContext(messageFormDispatchContext);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);

  const handleNextAliasInput = () => {
    setTimeout(() => textareaRef.current?.focus({ preventScroll: true }), 100);
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
        recipientName={userInfo.name}
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

export default PaperMessageInputStep;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  margin-top: 13px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  border: none;

  font-size: 18px;
  line-height: 21.48px;
  color: ${({ theme }) => theme.color.gray500};

  background-color: transparent;

  scroll-behavior: auto;
  overflow-y: auto;

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
