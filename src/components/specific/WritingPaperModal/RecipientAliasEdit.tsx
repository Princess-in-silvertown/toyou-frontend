import { useViewportHeight } from '@hooks/useViewportHeight';
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled, { Keyframes, keyframes } from 'styled-components';

interface Props extends React.PropsWithChildren {
  recipientName: string;
  recipientAlias: string;
  message: string;
  onChangeAlias: (newValue: string) => void;
  onNext: () => void;
}

const RecipientAliasEdit = ({
  children,
  recipientName,
  recipientAlias,
  message,
  onChangeAlias,
  onNext,
}: Props) => {
  const [isEditing, setIsEditing] = useState(!recipientAlias);

  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const contentsRef = useRef<HTMLDivElement>(null);

  const defaultAlias = useMemo(() => `${recipientName}에게`, []);

  const openEdit = () => {
    if (isEditing) return;

    setIsEditing(() => true);
  };

  const closeEdit = () => {
    if (!isEditing) return;

    setIsEditing(() => false);

    if (recipientAlias.length === 0) {
      onChangeAlias(defaultAlias);
    }

    onNext();
  };

  const handleBlurInput = () => closeEdit();
  const handleClickInput = () => openEdit();
  const handleFocusInput = () => openEdit();

  const handleKeydown: KeyboardEventHandler = (e) => {
    if (e.key === 'Enter' || e.key === 'Tab' || e.key === 'Escape') {
      closeEdit();

      setTimeout(
        () => contentsRef.current?.focus({ preventScroll: false }),
        100
      );
    }
  };

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!isEditing) return;

    const value = e.target.value;

    onChangeAlias(value);
  };

  const handleKeydownTextarea: KeyboardEventHandler = (e) => {
    if (e.key === 'Backspace' && !message) {
      // prevent to delete alias
      setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 100);
    }
  };

  useEffect(() => {
    if (spanRef.current && inputRef.current) {
      if (!!recipientAlias) {
        spanRef.current.textContent = recipientAlias;
      } else {
        const placeholder = defaultAlias;
        spanRef.current.textContent = placeholder;
      }

      const newWidth = spanRef.current.offsetWidth + 20;
      inputRef.current.style.width = `${newWidth}px`;
    }
  }, [recipientAlias]);

  useEffect(() => {
    if (!isEditing) return;

    setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 300);
  }, []);

  const viewportHeight = useViewportHeight();

  return (
    <Container>
      <InputContainer
        style={{
          height: isEditing ? `calc(${viewportHeight}px - 220px)` : '40px',
        }}
        $isEditing={isEditing}
      >
        <InputContents $isEditing={isEditing}>
          <To $isEditing={isEditing}>To</To>
          <Input
            ref={inputRef}
            placeholder={defaultAlias}
            onKeyDown={handleKeydown}
            onClick={handleClickInput}
            onChange={handleChangeInput}
            onFocus={handleFocusInput}
            onBlur={handleBlurInput}
            $isEditing={isEditing}
            value={recipientAlias}
          />
          <InputWidthCalculator ref={spanRef} />
        </InputContents>
      </InputContainer>
      <ContentsContainer
        ref={contentsRef}
        $isEditing={isEditing}
        onKeyDown={handleKeydownTextarea}
      >
        {children}
      </ContentsContainer>
    </Container>
  );
};

export default RecipientAliasEdit;

const moveCenter = keyframes`
  from {
    top: 0;
    left: 0;
    transform: translate(0, 0);
  }
  to {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const moveLeftTop = keyframes`
  from {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  to {
    top: 0;
    left: 0;
    transform: translate(0, 0);
  }
`;

const toScaleUp = keyframes`  
  from {
    font-size: 30px;
  }
  to { 
    font-size: 40px;
  }
`;

const toScaleDown = keyframes`  
  from {
    font-size: 40px;
  }
  to { 
    font-size: 30px;
  }
`;

const contentsUp = keyframes`  
  from {
    opacity: 0;
  }
  to { 
    opacity: 1;
  }
`;

const contentsDown = keyframes`  
  from {
    opacity: 1;
  }
  to { 
    opacity: 0;
  }
`;

const Container = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputContainer = styled.div<{
  $isEditing: boolean;
}>`
  position: relative;

  width: 100%;
  max-height: 250px;

  transition: height 0.5s ease;
`;

const InputContents = styled.div<{ $isEditing: boolean }>`
  position: relative;
  display: flex;
  align-items: end;
  gap: 10px;

  width: fit-content;

  animation: ${({ $isEditing }) => ($isEditing ? moveCenter : moveLeftTop)} 0.5s
    ease;
  animation-fill-mode: both;
`;

const To = styled.div<{ $isEditing: boolean }>`
  position: relative;

  font-family: 'Montserrat';
  font-weight: 500;
  font-style: italic;
  letter-spacing: -2px;

  animation: ${({ $isEditing }) => ($isEditing ? toScaleUp : toScaleDown)} 0.5s
    ease;
  animation-fill-mode: both;
`;

const Input = styled.input<{ $isEditing: boolean }>`
  margin-bottom: ${({ $isEditing }) => ($isEditing ? '7px' : '2px')};
  max-width: 300px;

  font-family: 'Montserrat';
  font-size: 22px;
  font-weight: 500;
  letter-spacing: -1px;

  animation-fill-mode: both;
`;

const InputWidthCalculator = styled.span`
  position: absolute;
  visibility: hidden;
  white-space: nowrap;
  font-size: 22px;
  font-weight: 500;
  font-family: 'Montserrat';
`;

const ContentsContainer = styled.div<{ $isEditing: boolean }>`
  width: 100%;

  overflow: hidden;
  animation: ${({ $isEditing }) => ($isEditing ? contentsDown : contentsUp)}
    0.5s ease;
  animation-fill-mode: both;
`;
