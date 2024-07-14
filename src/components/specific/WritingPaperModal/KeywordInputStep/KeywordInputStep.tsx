import styled from 'styled-components';
import KeywordsCircle from './KeywordsCircle';
import { Suspense } from 'react';
import LoadingCircle from './LoadingCircle';

interface Props {
  message: string;
  keywords?: string[];
  canNext?: boolean;
  onChangeKeywords: (newKeywords: string[]) => void;
}

const KeywordInputStep = ({ message, keywords, onChangeKeywords }: Props) => {
  return (
    <Container>
      <Title>
        {keywords
          ? keywords.length === 0
            ? '1개 이상의 키워드를 입력해주세요.'
            : `${keywords.length}가지의 키워드로 메시지를 대표하는 \n 감정 카드를 만들 수 있어요`
          : '메시지에서 감정 키워드를 \n 추출하는 중이에요'}
      </Title>
      <Suspense fallback={<LoadingCircle />}>
        <KeywordsCircle
          message={message}
          keywords={keywords}
          onChangeKeywords={onChangeKeywords}
        />
      </Suspense>
    </Container>
  );
};

export default KeywordInputStep;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  align-items: center;

  width: fit-content;
  height: 48px;
  margin: 48px auto 40px auto;

  text-align: center;
  font-size: 20px;
  white-space: pre-wrap;

  @media (max-height: 650px) {
    margin: 48px auto 10px auto;
  }
`;
