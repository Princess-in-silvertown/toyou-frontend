import {
  messageFormContext,
  messageFormDispatchContext,
} from '@/contexts/states/messageFormContext';
import { CardColor } from '@/types/card';
import { Group } from '@/types/group';
import ProgressiveDots from '@components/common/Progressive/ProgressiveDots';
import Swiper from '@components/common/Swiper/Swiper';
import SwiperSlider from '@components/common/Swiper/SwiperSlider';
import NextIcon from '@components/specific/CardSelect/UpIcon';
import { CARD_THEME } from '@constants/card';
import { useViewport } from '@hooks/useViewport';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

interface Props {
  onNext?: () => void;
}

const ThemeSelectStep = ({ onNext }: Props) => {
  const { cardTheme } = useContext(messageFormContext);
  const theme = CARD_THEME[cardTheme];

  const [currentIndex, setCurrentIndex] = useState(cardTheme); // index === cardThemeId

  const { handleChangeCardTheme } = useContext(messageFormDispatchContext);

  const [width, height] = useViewport();
  const modalWidth = Math.min(width, 500);
  const marginTop = Math.max((height - 800) / 2, 0) + 50;

  const handleChangeIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const handleClickNextButton = () => {
    onNext?.();
  };

  const getColorString = (color: Readonly<CardColor>) => {
    return `rgba(${color.R}, ${color.G}, ${color.B}, ${0.85})`;
  };

  useEffect(() => {
    if (!!cardTheme) {
      handleChangeCardTheme(0);
    }

    handleChangeCardTheme(currentIndex);
  }, [currentIndex]);

  return (
    <Container style={{ height: height - 100 }}>
      <Title>
        어떤 메시지 카드를 <br /> 보낼까요?
      </Title>
      <CardListContainer style={{ marginTop }}>
        <Swiper
          startIndex={currentIndex}
          $width={163}
          $padding={(-163 + modalWidth - 50) / 2}
          $gap={24}
          onSwipe={handleChangeIndex}
        >
          {[...CARD_THEME.values()].map((theme) => (
            <SwiperSlider key={theme.themeId}>
              <Card style={{ background: getColorString(theme.color) }} />
            </SwiperSlider>
          ))}
        </Swiper>
        <CardMessage>{theme.message}</CardMessage>
        <ProgressiveContainer>
          <ProgressiveDots
            totalCount={CARD_THEME.length}
            currentIndex={currentIndex}
          />
        </ProgressiveContainer>
      </CardListContainer>

      <NextButtonContainer>
        <NextDescriptionContainer>
          <CardIcon style={{ background: getColorString(theme.color) }} />
          <NextButtonText>{theme.message}</NextButtonText>
        </NextDescriptionContainer>
        <NextButton onClick={handleClickNextButton}>선택하기</NextButton>
      </NextButtonContainer>
    </Container>
  );
};

export default ThemeSelectStep;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  margin-top: 14px;

  transform: translate(0);
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 28.64px;
  text-align: left;

  color: ${({ theme }) => theme.color.gray500};
`;

const Card = styled.div`
  width: 163px;
  height: 231px;
  border-radius: 6px;
  background-color: gray;
`;

const CardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 90px;
`;

const CardMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 163px;
  height: 28px;
  margin-top: 16px;
  border-radius: 14px;
  background-color: ${({ theme }) => theme.color.white};

  font-size: 12px;
  font-weight: 500;
  line-height: 14.32px;
  letter-spacing: -0.02em;
  text-align: center;
  color: ${({ theme }) => theme.color.gray500};
`;

const ProgressiveContainer = styled.div`
  margin-top: 30px;
`;

const NextButtonContainer = styled.div`
  position: fixed;
  bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 70px;
  padding: 4px;
  border-radius: 35px;
  box-sizing: border-box;

  background-color: ${({ theme }) => theme.color.white};
`;

const NextDescriptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  padding: 0 20px;
`;

const CardIcon = styled.div`
  width: 13px;
  height: 19px;
  border-radius: 1px;
`;

const NextButtonText = styled.div`
  font-size: 16px;
  line-height: 21px;
`;

const NextButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 119px;
  height: 62px;
  border-radius: 31px;

  font-size: 16px;
  line-height: 21px;
  color: ${({ theme }) => theme.color.white};

  background-color: ${({ theme }) => theme.color.red500};
`;
