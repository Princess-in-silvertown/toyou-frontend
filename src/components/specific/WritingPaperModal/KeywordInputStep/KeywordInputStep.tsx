import styled from 'styled-components';
import KeywordsCircle from './KeywordsCircle';
import { Suspense, useContext } from 'react';
import LoadingCircle from './LoadingCircle';
import GenerateCardButton from '../NextButton';
import { useViewportHeight } from '@hooks/useViewportHeight';
import {
  messageFormContext,
  messageFormDispatchContext,
} from '@/contexts/states/messageFormContext';

interface Props {
  canNext?: boolean;
  onNext?: () => void;
}

const KeywordInputStep = ({ canNext, onNext }: Props) => {
  const { keywords } = useContext(messageFormContext);

  const height = useViewportHeight() ?? 0;

  console.log(height);

  return (
    <Container style={{ height: height - 60 }}>
      <Title>
        {keywords
          ? keywords.length === 0
            ? '1개 이상의 키워드를 입력해주세요.'
            : `${keywords.length}가지의 키워드로 메시지를 대표하는 \n 감정 카드를 만들 수 있어요`
          : '메시지에서 감정 키워드를 \n 추출하는 중이에요'}
      </Title>
      <Suspense fallback={<LoadingCircle />}>
        <KeywordsCircle />
      </Suspense>
      <GenerateCardButton onNext={onNext} canNext={canNext} />
    </Container>
  );
};

export default KeywordInputStep;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  min-height: 530px;
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

  @media (max-height: 670px) {
    margin: 28px auto 25px auto;
  }
`;
