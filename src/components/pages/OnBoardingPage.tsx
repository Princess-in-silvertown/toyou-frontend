import ProgressiveDots from '@components/common/Progressive/ProgressiveDots';
import Swiper from '@components/common/Swiper/Swiper';
import SwiperSlider from '@components/common/Swiper/SwiperSlider';
import { useState } from 'react';
import styled from 'styled-components';
import tutorial1 from '@assets/image/tutorial1.webp';
import tutorial2 from '@assets/image/tutorial2.webp';
import tutorial3 from '@assets/image/tutorial3.webp';
import { useCustomNavigate } from '@/routers/useCustomNavigate';

const OnBoardingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { goToLoginPage } = useCustomNavigate();

  const infos = [
    {
      title: '혹시, 마음 전하기를 \n 망설였던 적 있나요?',
      subtitle:
        '보낼까 말까 망설이다 결국 \n 전하지 못한 마음들이 남아 있지는 않나요?',
      image: tutorial3,
    },
    {
      title: '메시지 카드를 보내 \n부담없이 마음 전해보세요!',
      subtitle: '한번의 전달로 소중한 마음을 전해보세요.',
      image: tutorial2,
    },
    {
      title: '정성을 담은 메시지는 \n곧 특별한 선물이 될 거예요.',
      subtitle:
        '메시지 속 감정들을 기반으로 만들어지는 \n세상에 단 하나뿐인 메시지 카드!',
      image: tutorial1,
    },
  ];

  return (
    <Container>
      <Swiper onSwipe={(index) => setCurrentIndex(index)}>
        {infos.map((info, i) => (
          <SwiperSlider key={i}>
            <SliderContainer>
              <Title>{info.title}</Title>
              <SubTitle>{info.subtitle}</SubTitle>
              <Image src={info.image} />
            </SliderContainer>
          </SwiperSlider>
        ))}
      </Swiper>
      <ProgressiveDots currentIndex={currentIndex} totalCount={infos.length} />
      <NextButton onClick={goToLoginPage}>시작하기</NextButton>
    </Container>
  );
};

export default OnBoardingPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 35px;

  margin-top: 58px;
  padding: 0 25px;

  @media (max-height: 670px) {
    gap: 15px;
  }
`;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 8px;

  margin-top: 50px;

  @media (max-height: 670px) {
    margin-top: 20px;
  }
`;

const Title = styled.div`
  width: 100%;
  height: 65px;

  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
  letter-spacing: -0.02em;
  text-align: left;
  color: ${({ theme }) => theme.color.gray500};
  white-space: pre-line;
`;

const SubTitle = styled.div`
  width: 100%;
  height: 52px;

  font-size: 18px;
  line-height: 26px;
  letter-spacing: -0.04em;
  text-align: left;
  color: ${({ theme }) => theme.color.gray400};
  white-space: pre-line;
`;

const Image = styled.img`
  width: 320px;
  height: 320px;

  margin: 0 auto;
`;

const NextButton = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 30px;

  width: calc(100% - 50px);
  height: 50px;
  border-radius: 25px;

  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.02em;
  color: white;

  background-color: ${({ theme }) => theme.color.red500};
`;
