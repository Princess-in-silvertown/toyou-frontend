import Swiper from '@components/common/Swiper/Swiper';
import SwiperSlider from '@components/common/Swiper/SwiperSlider';
import edit from '@assets/icons/edit.svg';
import styled from 'styled-components';

interface Props {
  name: string;
  keywords: string[];
  handleChangeKeywords: (newKeywords: string[]) => void;
}

const CardEditStep = ({ name, keywords, handleChangeKeywords }: Props) => {
  const cards = [1, 2, 3, 4, 5];
  const [mainKeyword] = keywords;

  const addKeyword = (newKeyword: string) => {
    handleChangeKeywords([...keywords, newKeyword]);
  };

  const deleteKeyword = (keyword: string) => {
    handleChangeKeywords(keywords.filter((key) => key !== keyword));
  };

  return (
    <Container>
      <UserName>TO {name}</UserName>
      <KeywordContainer>
        <MainKeyword>
          {mainKeyword}
          <KeywordCount>+{keywords.length}</KeywordCount>
        </MainKeyword>
        <IconContainer>
          <EditIcon src={edit} />
        </IconContainer>
      </KeywordContainer>
      <Swiper>
        {cards.map((card, index) => (
          <SwiperSlider key={card}>{card}</SwiperSlider>
        ))}
      </Swiper>
      <Answer>기능 부가설명 필요</Answer>
    </Container>
  );
};

export default CardEditStep;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const UserName = styled.div`
  font-size: 18px;
`;

const KeywordContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 16px;

  width: 100%;
  padding: 10px 0;

  overflow-x: scroll;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MainKeyword = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 105px;
  height: 45px;
  border-radius: 22.5px;

  background-color: ${({ theme }) => theme.gray300};
  box-shadow: 12px 8px ${({ theme }) => theme.gray500};
`;

const KeywordCount = styled.div`
  position: absolute;
  top: -5px;
  right: -18px;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 30px;
  height: 30px;
  border-radius: 50%;

  color: ${({ theme }) => theme.gray300};
  font-size: 14px;

  background-color: ${({ theme }) => theme.gray700};
`;

const IconContainer = styled.button`
  display: flex;
  align-items: end;

  width: 26px;
  height: 53px;
`;

const EditIcon = styled.img`
  width: 26px;
  height: 26px;
`;

const Answer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%px;
  height: 70px;
  border-radius: 10px;
  margin: 30px 0;

  color: ${({ theme }) => theme.gray300};
  font-size: 14px;

  background-color: ${({ theme }) => theme.gray700};
`;
