import styled, { keyframes } from 'styled-components';
import plus from '@assets/icons/plus.svg';
import { useExtractedKeywords } from '@hooks/queries/useKeywords';
import { useContext } from 'react';
import { modalDispatchContext } from '@/contexts/states/modalContext';
import { KEYS } from '@constants/modal';
import {
  messageFormContext,
  messageFormDispatchContext,
} from '@/contexts/states/messageFormContext';
import KeywordInputModalContents from './KeywordInputModalContents';

const KeywordsCircle = () => {
  const { keywords, message } = useContext(messageFormContext);
  const { handleLoadKeywords, handleAddKeyword, handleDeleteKeyword } =
    useContext(messageFormDispatchContext);

  const count = keywords?.length ?? 0;
  const angleStep = 360 / (count + 1);

  useExtractedKeywords(message, !!keywords, handleLoadKeywords);

  const { handleOpen } = useContext(modalDispatchContext);

  const handleClickButton = () => {
    handleOpen(
      KEYS.KEYWORDS_INPUT,
      <KeywordInputModalContents
        keywords={keywords ?? []}
        onAddKeyword={handleAddKeyword}
        onDeleteKeyword={handleDeleteKeyword}
      />
    );
  };

  return (
    <KeywordContainer>
      <CountContainer>
        <Number>{keywords?.length}</Number>
        <KeywordCount>단어</KeywordCount>
      </CountContainer>
      <Orbit>
        <CircleContainer>
          <AddKeywordButton onClick={handleClickButton}>
            <PlusIcon src={plus} />
          </AddKeywordButton>
        </CircleContainer>
        {keywords?.map((keyword, index) => {
          const angle = (index + 1) * angleStep;
          return (
            <CircleContainer key={keyword}>
              <Circle rotate={-1 * angle}>
                <Text rotate={angle}>{keyword}</Text>
              </Circle>
            </CircleContainer>
          );
        })}
      </Orbit>
    </KeywordContainer>
  );
};

export default KeywordsCircle;

const createAnimation = keyframes`
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const KeywordContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 300px;
  height: 300px;
  margin: 10px auto;
`;

const CountContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: end;
  gap: 3px;
  top: 49%;
  left: 50%;

  height: 85px;

  transform: translate(-50%, -50%);
`;

const KeywordCount = styled.div`
  padding: 8px 0;
  box-sizing: border-box;

  font-size: 24px;
  color: ${({ theme }) => theme.gray900};
`;

const Number = styled.div`
  min-width: 25px;

  font-size: 60px;
  font-weight: 700;
  color: ${({ theme }) => theme.gray700};
`;

const PlusIcon = styled.img`
  width: 35px;
  height: 35px;
`;

const Orbit = styled.div`
  position: relative;
  width: 250px;
  height: 250px;

  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.gray500};
`;

const AddKeywordButton = styled.button`
  position: absolute;
  top: calc(50% - 35px);
  left: calc(50% - 35px);

  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => '#616161'};

  background-color: white;

  transform-origin: center;
  transform: rotate(0deg) translateY(125px);
`;

const CircleContainer = styled.div`
  position: absolute;
  top: calc(50% - 35px);
  left: calc(50% - 35px);

  width: 70px;
  height: 70px;

  animation: ${createAnimation} 0.5s ease-out;
`;

const Circle = styled.div<{ rotate: number }>`
  position: absolute;

  width: 70px;
  height: 70px;
  border-radius: 50%;

  background-color: ${({ theme }) => '#E9E9E9'};
  border: 5px solid ${({ theme }) => '#FCFCFC'};

  overflow: hidden;

  transform-origin: center;
  transform: ${({ rotate }) => `rotate(${rotate}deg) translateY(125px)`};
  transition: all 0.5s ease-in;
`;

const Text = styled.div<{ rotate: number }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  transform: ${({ rotate }) => `rotate(${rotate}deg) `};
  transition: all 0.5s ease-in;
`;
