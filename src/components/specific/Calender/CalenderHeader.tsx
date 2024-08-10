import styled from 'styled-components';

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
        {`${renderingYear}년 ${renderingMonth + 1}월`}
        <Button onClick={isWeekView ? handlePrevWeek : handlePrevMonth}>
          {'<'}
        </Button>
        <Button onClick={isWeekView ? handleNextWeek : handleNextMonth}>
          {'>'}
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
  align-items: end;
  padding: 16px 30px;

  font-size: 20px;
  font-weight: 500;
  line-height: 23.87px;
  text-align: left;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  font-size: 12px;
  padding: 3px;

  cursor: pointer;
`;

const ViewChangeButton = styled.button`
  font-size: 12px;
  line-height: 17.38px;
  letter-spacing: -0.02em;
  text-align: center;
`;
