import styled from 'styled-components';
import KeywordsCircle from './KeywordsCircle';
import { Suspense, useContext } from 'react';
import LoadingCircle from './LoadingCircle';
import { messageFormContext } from '@/contexts/states/messageFormContext';
import { useViewport } from '@hooks/useViewport';

interface Props {
  modalHeight?: number;
  canNext?: boolean;
  onNext?: () => void;
}

const KeywordInputStep = ({ canNext, onNext, modalHeight = 600 }: Props) => {
  const { keywords, userInfo } = useContext(messageFormContext);

  const [, height] = useViewport();
  const marginTop = Math.max((height - 800) / 2, 0);

  return (
    <Container style={{ height: modalHeight - 60, marginTop }}>
      <Title>
        {keywords
          ? keywords.length === 0
            ? '1개 이상의\n마음을 입력해주세요.'
            : `분석된 마음 키워드가\n정확한지 확인해주세요`
          : `${userInfo.name} 님에게 전하고 싶은\n마음을 분석 중이에요`}
      </Title>
      <Suspense fallback={<LoadingCircle />}>
        <KeywordsCircle />
      </Suspense>
    </Container>
  );
};

export default KeywordInputStep;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  min-height: 50px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;

  width: fit-content;
  height: 50px;
  margin: 14px auto 40px auto;

  text-align: center;
  font-weight: 500;
  font-size: 22px;
  line-height: 28.64px;
  white-space: pre-wrap;
`;
