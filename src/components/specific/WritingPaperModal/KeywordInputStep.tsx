import styled, { keyframes } from 'styled-components';
import plus from '@assets/icons/plus.svg';

interface Props {
  userName: string;
  keywords: string[];
  canNext?: boolean;

  handleChangeKeywords: (newKeywords: string[]) => void;
}

const KEYWORD_MAX_LENGTH = 5;

const KeywordInputStep = ({
  userName,
  keywords,
  handleChangeKeywords,
}: Props) => {
  const angleStep = 360 / (keywords.length + 1);

  const addKeyword = () => {
    if (keywords.length >= KEYWORD_MAX_LENGTH) return;

    handleChangeKeywords([...keywords, 'TEST']);
  };

  return (
    <Container>
      <TitleContainer>
        <Title>
          <Strong>{userName}</Strong> 에게 전하는 메세지 키워드
        </Title>
        <Subtitle>
          키워드를 추가해서 메시지를 대표하는
          <br />
          이미지를 생성할 수 있어요
        </Subtitle>
      </TitleContainer>
      <KeywordContainer>
        <CountContainer>
          <Number>{keywords.length}</Number>
          <KeywordCount>단어</KeywordCount>
        </CountContainer>
        <Orbit>
          <AddKeywordButton onClick={addKeyword}>
            <PlusIcon src={plus} />
          </AddKeywordButton>
          {keywords.map((keyword, index) => {
            const angle = (index + 1) * angleStep;
            return (
              <Circle key={keyword + index} rotate={angle}>
                <Text rotate={-1 * angle}>{keyword}</Text>
              </Circle>
            );
          })}
        </Orbit>
      </KeywordContainer>
    </Container>
  );
};

export default KeywordInputStep;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;

  width: 100%;
  margin-top: 45px;
`;

const Strong = styled.strong`
  max-width: 105px;
  max-height: 40px;
  margin-right: 2px;

  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.gray700};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Title = styled.div`
  display: flex;
  align-items: center;

  text-align: center;
  font-size: 20px;
`;

const Subtitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 180px;

  text-align: center;
  line-height: 17px;
  font-size: 12px;
  color: ${({ theme }) => theme.gray700};
`;

const KeywordContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 300px;
  height: 300px;
  margin: 60px auto;
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
  border: 1px solid ${({ theme }) => theme.gray500};
  background-color: ${({ theme }) => theme.gray500};

  transform-origin: center;
  transform: rotate(0deg) translateY(125px);
`;

const Circle = styled.div<{ rotate: number }>`
  position: absolute;
  top: calc(50% - 35px);
  left: calc(50% - 35px);

  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.gray500};

  background-color: ${({ theme }) => theme.gray0};

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

const CountContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: end;
  gap: 3px;
  top: 50%;
  left: 50%;

  height: 85px;

  transform: translate(-50%, -50%);
`;

const KeywordCount = styled.div`
  padding: 15px 0;
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
