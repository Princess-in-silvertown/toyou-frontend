import styled from 'styled-components';
import KeywordsCircle from './KeywordsCircle';
import { Suspense, useContext } from 'react';
import LoadingCircle from './LoadingCircle';
import { messageFormContext } from '@/contexts/states/messageFormContext';

interface Props {
  modalHeight?: number;
  canNext?: boolean;
  onNext?: () => void;
}

const KeywordInputStep = ({ canNext, onNext, modalHeight = 600 }: Props) => {
  const { keywords, userInfo } = useContext(messageFormContext);

  const handleClickNextButton = () => {
    if (!canNext) return;

    onNext?.();
  };

  return (
    <Container style={{ height: modalHeight - 60 }}>
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
      <NextButton onClick={handleClickNextButton} $canNext={canNext ?? false}>
        확인
      </NextButton>
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
  height: 48px;
  margin: 14px auto 40px auto;

  text-align: center;
  font-size: 20px;
  white-space: pre-wrap;
`;

const NextButton = styled.button<{ $canNext: boolean }>`
  position: fixed;

  bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 500px;
  height: 49px;
  margin: 0 auto;
  border-radius: 24.5px;

  color: ${({ theme }) => theme.gray0};
  font-size: 16px;
  font-weight: 400;

  background-color: ${({ theme, $canNext }) =>
    $canNext ? theme.red500 : theme.gray500};
`;
