import {
  messageFormContext,
  messageFormDispatchContext,
} from '@/contexts/states/messageFormContext';
import { CardColor } from '@/types/card';
import ProgressiveDots from '@components/common/Progressive/ProgressiveDots';
import Swiper from '@components/common/Swiper/Swiper';
import SwiperSlider from '@components/common/Swiper/SwiperSlider';
import { CARD_THEME } from '@constants/card';
import { useViewport } from '@hooks/useViewport';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

interface Props {
  onNext?: () => void;
}

const CoverSelectStep = ({ onNext }: Props) => {
  const { cardTheme } = useContext(messageFormContext);
  const theme = CARD_THEME[cardTheme];

  const [currentIndex, setCurrentIndex] = useState(cardTheme); // index === cardThemeId
  const [coverName, setCoverName] = useState('');

  const { handleChangeCoverImgUrl } = useContext(messageFormDispatchContext);

  const [width, height] = useViewport();
  const modalWidth = Math.min(width, 500);
  const marginTop = Math.max((height - 800) / 2, 0) + 50;

  const handleChangeCover = (themeId: number, index: number) => {
    theme.coverImageUrl[index];
  };

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
      handleChangeCoverImgUrl(theme.coverImageUrl[0].url);
      setCoverName(theme.coverImageUrl[0].name);
    }

    handleChangeCoverImgUrl(theme.coverImageUrl[currentIndex].url);
    setCoverName(theme.coverImageUrl[currentIndex].name);
  }, [currentIndex]);

  return (
    <Container style={{ height: height - 100 }}>
      <Title>
        마음에 드는 커버 이미지를 <br /> 선택해주세요
      </Title>
      <CardListContainer style={{ marginTop }}>
        <Swiper
          startIndex={currentIndex}
          $width={240}
          $padding={(-240 + modalWidth - 50) / 2}
          $gap={24}
          onSwipe={handleChangeIndex}
        >
          {theme.coverImageUrl.map((item, index) => (
            <SwiperSlider key={index}>
              <Card style={{ background: getColorString(theme.color) }}>
                <CoverImage src={item.url} />
              </Card>
            </SwiperSlider>
          ))}
        </Swiper>
        <CardMessage>{coverName}</CardMessage>
        <ProgressiveContainer>
          <ProgressiveDots
            totalCount={theme.coverImageUrl.length}
            currentIndex={currentIndex}
          />
        </ProgressiveContainer>
      </CardListContainer>
    </Container>
  );
};

export default CoverSelectStep;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  margin-top: 14px;

  transform: translate(0);
`;

const Title = styled.div`
  margin-top: 14px;

  font-weight: 500;
  font-size: 20px;
  line-height: 28.64px;
  text-align: left;

  color: ${({ theme }) => theme.color.gray500};
`;

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 240px;
  height: 330px;
  border-radius: 6px;
  background-color: gray;
`;

const CoverImage = styled.img`
  width: 150px;
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
