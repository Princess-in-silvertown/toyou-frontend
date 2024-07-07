import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled, { keyframes } from 'styled-components';

interface Props extends React.PropsWithChildren {
  recipientName: string;
  recipientAlias: string;
  onChangeAlias: (newValue: string) => void;
  onNext: () => void;
}

const RecipientAliasEdit = ({
  children,
  recipientName,
  recipientAlias,
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

  const handleClickBackDrop = () => closeEdit();
  const handleBlurInput = () => closeEdit();
  const handleClickInput = () => openEdit();
  const handleFocusInput = () => openEdit();

  const handleKeydown: KeyboardEventHandler = (e) => {
    if (e.key === 'Enter' || e.key === 'Tab' || e.key === 'Escape') {
      e.preventDefault();

      closeEdit();

      contentsRef.current?.focus();
    }
  };

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;

    onChangeAlias(value);
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

    // delay to solve collision focus and css animation
    setTimeout(() => inputRef.current?.focus(), 150);
  }, []);

  return (
    <Container>
      <InputContainer $isEditing={isEditing}>
        {isEditing && <BackDrop onClick={handleClickBackDrop} />}
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
      <ContentsContainer ref={contentsRef} $isEditing={isEditing}>
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

const containerScaleUp = keyframes`  
  from {
    height: 40px;
  }
  to {
    height: 280px;
  }
`;

const containerScaleDown = keyframes`  
  from {
    height: 280px;
  }
  to {     
    height: 40px;
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
    transform: translateY(100vh);
  }
  to { 
    transform: translateY(0);
  }
`;

const contentsDown = keyframes`  
  from {
    transform: translateY(0);
  }
  to { 
    transform: translateY(100vh);
  }
`;

const Container = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const BackDrop = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: transparent;
`;

const InputContainer = styled.div<{ $isEditing: boolean }>`
  position: relative;

  width: 100%;

  animation: ${({ $isEditing }) =>
      $isEditing ? containerScaleUp : containerScaleDown}
    0.5s ease;
  animation-fill-mode: both;
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
  font-family: 'Montserrat';
  font-weight: 500;
  font-style: italic;
  letter-spacing: -1px;

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
  animation: ${({ $isEditing }) => ($isEditing ? contentsDown : contentsUp)}
    0.5s ease;
  animation-fill-mode: both;
`;
