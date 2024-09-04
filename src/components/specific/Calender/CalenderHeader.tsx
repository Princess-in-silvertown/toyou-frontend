import styled from 'styled-components';
import leftArrow from '@assets/icons/leftarrow.svg';
import rightArrow from '@assets/icons/rightarrow.svg';

interface Props {
  isWeekView: boolean;
  renderingYear: number;
  renderingMonth: number;
  viewMonth: () => void;
  viewWeek: () => void;
  handleNextWeek: () => void;
  handlePrevWeek: () => void;
  handleNextMonth: () => void;
  handlePrevMonth: () => void;
}

const CalenderHeader = ({
  renderingYear,
  renderingMonth,
  isWeekView,
  viewMonth,
  viewWeek,
  handleNextMonth,
  handleNextWeek,
  handlePrevMonth,
  handlePrevWeek,
}: Props) => {
  const handleClickViewChange = () => {
    if (isWeekView) return viewMonth();
    else return viewWeek();
  };

  return (
    <Header>
      <ButtonContainer>
        <HeaderDate>{`${renderingYear}년 ${renderingMonth + 1}월`}</HeaderDate>
        <Button onClick={isWeekView ? handlePrevWeek : handlePrevMonth}>
          <Icon alt="이전" src={leftArrow} />
        </Button>
        <Button onClick={isWeekView ? handleNextWeek : handleNextMonth}>
          <Icon alt="다음" src={rightArrow} />
        </Button>
      </ButtonContainer>
      <ButtonContainer>
        <ViewChangeButton onClick={handleClickViewChange}>
          뷰 전환
        </ViewChangeButton>
      </ButtonContainer>
    </Header>
  );
};

export default CalenderHeader;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 30px;
`;

const HeaderDate = styled.div`
  width: 108px;

  font-size: 20px;
  font-weight: 500;
  line-height: 23.87px;

  white-space: nowrap;
`;

const Icon = styled.img`
  width: 4.5px;
  height: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  padding: 7px;
  box-sizing: border-box;

  cursor: pointer;
`;

const ViewChangeButton = styled.button`
  font-size: 12px;
  line-height: 17.38px;
  letter-spacing: -0.02em;
  text-align: center;
`;
