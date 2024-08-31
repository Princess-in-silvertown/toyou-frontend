import styled from 'styled-components';
import { ChangeEvent, useContext, useEffect, useRef } from 'react';
import RecipientAliasEdit from './RecipientAliasEdit';
import {
  messageFormContext,
  messageFormDispatchContext,
} from '@/contexts/states/messageFormContext';
import { useViewport } from '@hooks/useViewport';

interface Props {
  canNext?: boolean;
}

const PaperMessageInputStep = ({}: Props) => {
  const { alias, message, userInfo } = useContext(messageFormContext);

  const {
    handleChangeAlias: onChangeAlias,
    handleChangeMessage: onChangeMessage,
  } = useContext(messageFormDispatchContext);

  const textContainerRef = useRef<HTMLDivElement>(null);
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

  const [, height] = useViewport();

  useEffect(() => {
    if (pRef.current && textareaRef.current) {
      pRef.current.textContent = message;
      const newHeight = pRef.current.offsetHeight + 30;
      textareaRef.current.style.height = `${newHeight}px`;

      textContainerRef.current?.scroll(0, newHeight);
    }
  }, [message]);

  return (
    <Container style={{ height: height - 100 }}>
      <CalculatorContainer>
        <TextareaHeightCalculator ref={pRef} />
      </CalculatorContainer>
      <TextareaContainer
        ref={textContainerRef}
        style={{ maxHeight: height - 140 }}
      >
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
        </RecipientAliasEdit>
      </TextareaContainer>
    </Container>
  );
};

export default PaperMessageInputStep;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  margin-top: 13px;
  transform: translate(0);
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  border: none;

  font-size: 18px;
  line-height: 21.48px;
  color: ${({ theme }) => theme.color.gray500};

  background-color: transparent;
  overflow-y: auto;
  resize: none;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #9e9e9e;
  }
`;

const TextareaContainer = styled.div`
  position: fixed;
  top: 10px;
  max-height: 400px;
  width: 100%;

  overflow-y: auto;
  overflow-x: hidden;
`;

const CalculatorContainer = styled.div`
  position: fixed;
  top: 0;
  max-height: 0px;
  width: 100%;

  overflow-y: hidden;
`;

const TextareaHeightCalculator = styled.p`
  visibility: hidden;
  touch-action: none;
  white-space: pre-wrap;
  width: 100%;
  font-size: 18px;
  line-height: 21.48px;
`;
