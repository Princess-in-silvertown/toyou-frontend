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
  const keywordLength = keywords?.length ?? 0;

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
      <CountContainer
        style={{ opacity: keywordLength > 0 ? 1 : 0 }}
      >{`${keywordLength}가지 마음`}</CountContainer>
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
  top: calc(50% + 8px);
  left: 50%;

  border-bottom: 1px solid #616161;

  color: #616161;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.71px;
  text-align: center;

  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease;
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
  border: 2px solid #616161;
  box-shadow: 0 0 0 7px white; /* 두 번째 border처럼 보이는 효과 */

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
