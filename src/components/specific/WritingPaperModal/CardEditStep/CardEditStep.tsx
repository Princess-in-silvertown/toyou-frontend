import styled, { keyframes } from 'styled-components';
import CardEdit from './CardEdit';
import { Suspense, useContext } from 'react';
import LoadingCardSpinner from './LoadingCardSpinner';
import { messageFormContext } from '@/contexts/states/messageFormContext';
import { useViewport } from '@hooks/useViewport';
import letterImage from '@assets/image/love_letter.png';
import { useImagePreLoad } from '@hooks/useImagePreLoad';
import letter from '@assets/image/love_letter.png';

interface Props {
  isPendingSubmit: boolean;
  isSubmitted: boolean;
}

const CardEditStep = ({ isPendingSubmit, isSubmitted }: Props) => {
  const { alias, message } = useContext(messageFormContext);

  useImagePreLoad([letter]);

  const [, height] = useViewport();
  const marginTop = Math.max((height - 800) / 2, 0);

  return (
    <Container style={{ marginTop }}>
      {isSubmitted || isPendingSubmit ? (
        <ResultContainer>
          {isPendingSubmit ? (
            <MovingLetterImage src={letterImage} alt="로딩이미지" />
          ) : (
            <LetterImage src={letterImage} alt="완료이미지" />
          )}
          <ResultText>
            {isPendingSubmit
              ? '메시지 카드를 \n 전송하는 중이에요'
              : ' 메시지 카드 전송을 \n 완료했어요'}
          </ResultText>
        </ResultContainer>
      ) : (
        <Suspense fallback={<LoadingCardSpinner />}>
          <CardEdit alias={alias} message={message} />
        </Suspense>
      )}
    </Container>
  );
};

export default CardEditStep;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

const bounce = keyframes`
  0%, 20%, 100% {
    transform: translateY(0); 
  }
  30%, 50% {
    transform: translateY(-10px); 
  }
  40% {
    transform: translateY(5px); 
  }
  80% {
    transform: translateY(0);
  }
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  height: 500px;
  width: 100%;
`;

const ResultText = styled.div`
  font-size: 24px;
  font-weight: 500;
  line-height: 28.64px;
  text-align: center;

  white-space: pre-wrap;
`;

const MovingLetterImage = styled.img`
  width: 154px;
  height: 154px;

  animation: ${bounce} 1.2s infinite;
`;

const LetterImage = styled.img`
  width: 154px;
  height: 154px;
`;
