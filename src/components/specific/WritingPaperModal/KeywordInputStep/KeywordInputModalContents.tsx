import {
  KeyboardEventHandler,
  MouseEventHandler,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import cancel from '@assets/icons/cancel_gray.svg';
import { useScrollListener } from '@hooks/useScrollListener';

const KEYWORD_MAX_LENGTH = 5;

interface Props {
  keywords: string[];
  onAddKeyword: (keyword: string) => void;
  onDeleteKeyword: (keyword: string) => void;
}

const KeywordInputModalContents = ({
  keywords,
  onAddKeyword,
  onDeleteKeyword,
}: Props) => {
  const [modalKeywords, setModalKeywords] = useState(keywords);

  useScrollListener(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const addKeyword = (newKeyword: string) => {
    if (modalKeywords.length >= KEYWORD_MAX_LENGTH) return;

    if (modalKeywords.includes(newKeyword) || newKeyword === '') return;

    onAddKeyword(newKeyword);
    setModalKeywords([...modalKeywords, newKeyword]);
  };

  const deleteKeyword = (keyword: string) => {
    onDeleteKeyword(keyword);
    setModalKeywords((prev) => prev.filter((item) => item !== keyword));
  };

  const submit = () => {
    if (!inputRef.current) return;

    addKeyword(inputRef.current.value);

    inputRef.current.value = '';
  };

  const handleKeyDownInput: KeyboardEventHandler = (e) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Enter' || e.key === 'Tab') {
      submit();
    }
  };

  const handleClearInput: MouseEventHandler = () => {
    if (!inputRef.current) return;

    inputRef.current.value = '';
  };

  return (
    <Container>
      <Title>메세지 키워드 추가하기</Title>
      <InputContainer>
        <InputClearButton src={cancel} onClick={handleClearInput} />
        {modalKeywords.length < KEYWORD_MAX_LENGTH ? (
          <Input
            ref={inputRef}
            placeholder="메시지 키워드 입력"
            maxLength={4}
            onKeyDown={handleKeyDownInput}
          />
        ) : (
          <NotInput>최대 5개의 키워드를 입력할 수 있어요</NotInput>
        )}
        <InputSubmitButton onClick={submit}>등록</InputSubmitButton>
      </InputContainer>
      <KeywordList>
        {modalKeywords.map((keyword) => (
          <KeywordContainer
            key={keyword}
            onClick={() => deleteKeyword(keyword)}
          >
            <KeywordText>{keyword}</KeywordText>
            <KeywordDeleteButton src={cancel} />
          </KeywordContainer>
        ))}
      </KeywordList>
    </Container>
  );
};

export default KeywordInputModalContents;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  margin: 30px 20px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 40px;
  padding: 0 20px;
  box-sizing: border-box;
  border-radius: 20px;

  background-color: ${({ theme }) => theme.color.white};
`;

const InputClearButton = styled.img`
  width: 12px;
  height: 12px;
`;

const InputSubmitButton = styled.button`
  height: 25px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.gray500};
`;

const Input = styled.input`
  width: calc(100% - 70px);

  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.color.gray500};

  background-color: transparent;

  &::placeholder {
    color: #616161b2;
  }
`;

const NotInput = styled.div`
  width: calc(100% - 70px);

  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.03em;
  color: #616161b2;

  background-color: transparent;
`;

const KeywordList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 14px 16px;

  margin-top: 14px;
  margin-bottom: 50px;
`;

const KeywordContainer = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;

  width: fit-content;
  height: 33px;
  padding: 0 16px;
  border-radius: 16.5px;

  background-color: ${({ theme }) => theme.color.white};

  cursor: pointer;
`;

const KeywordDeleteButton = styled.img`
  width: 8px;
  height: 8px;
`;

const KeywordText = styled.div`
  font-size: 14px;
  font-weight: 500;

  color: ${({ theme }) => theme.color.red500};
`;
