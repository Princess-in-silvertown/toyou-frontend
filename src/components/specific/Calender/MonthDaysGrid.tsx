import { compareDate } from '@utils/date';
import styled from 'styled-components';

interface Props {
  days: Date[];
  currentDate: Date;
  isWeekView: boolean;
  isMoving: boolean;
  currentRow: number;
  renderingMonth: number;
  renderingIndex: number;
  onChangeDay: (day: Date) => void;
}

const MonthDaysGrid = ({
  days,
  currentDate,
  isWeekView,
  isMoving,
  currentRow,
  renderingMonth,
  renderingIndex,
  onChangeDay,
}: Props) => {
  return (
    <GridContainer
      style={{
        transform: `translateY(${isWeekView ? -48 * currentRow : 0}px`,
      }}
    >
      <DatesGrid
        style={{
          transform: `translateX(${-100 * renderingIndex}%)`,
          transition: isMoving ? 'ease-in-out 0.5s' : 'none',
        }}
      >
        {days.map((day) => (
          <DateCell
            key={day.toString() + renderingMonth}
            onClick={() => onChangeDay(day)}
          >
            <DateCircle
              $isWeekView={isWeekView}
              $isCurrentDay={compareDate(day, currentDate)}
              $isRenderingMonth={day.getMonth() === (renderingMonth + 12) % 12}
            >
              {day.getDate()}
            </DateCircle>
          </DateCell>
        ))}
      </DatesGrid>
    </GridContainer>
  );
};

export default MonthDaysGrid;

const GridContainer = styled.div`
  flex-shrink: 0;

  width: 100%;
  padding: 4px 0;

  transition: transform 0.3s ease-in-out;
`;

const DatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 8px;

  transform: translateX(-100%);
`;

const DateCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DateCircle = styled.div<{
  $isCurrentDay: boolean;
  $isRenderingMonth: boolean;
  $isWeekView: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid
    ${({ $isCurrentDay, $isRenderingMonth }) => {
      if ($isRenderingMonth) return $isCurrentDay ? 'none' : '#616161';

      return '#616161';
    }};

  font-size: 10px;
  color: ${({ $isCurrentDay, $isRenderingMonth }) => {
    if ($isRenderingMonth) return $isCurrentDay ? 'white' : '#616161';

    return '#616161';
  }};

  background-color: ${({ $isCurrentDay, $isRenderingMonth }) => {
    if ($isRenderingMonth) return $isCurrentDay ? '#DD432E' : 'transparent';

    return 'transparent';
  }};

  opacity: ${({ $isRenderingMonth, $isWeekView }) =>
    $isWeekView || $isRenderingMonth ? 1 : 0.3};

  transition: opacity 0.3s ease-in-out;
  cursor: pointer;
`;
