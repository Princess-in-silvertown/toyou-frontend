import { compareDate } from '@utils/date';
import styled from 'styled-components';

interface Props {
  days: Date[];
  currentDate: Date;
  isMoving: boolean;
  renderingIndex: number;
  onChangeDay: (day: Date) => void;
}

const WeekDaysGrid = ({
  days,
  currentDate,
  isMoving,
  renderingIndex,
  onChangeDay,
}: Props) => {
  return (
    <WeekGridContainer>
      <DatesGrid
        style={{
          transform: `translate(${-100 * renderingIndex}%)`,
          transition: isMoving ? 'ease-in-out 0.8s' : 'none',
        }}
      >
        {days.map((day) => (
          <DateCell key={day.toString()} onClick={() => onChangeDay(day)}>
            <DateCircle
              $isCurrentDay={compareDate(day, currentDate)}
              $isRenderingMonth={true}
            >
              {day.getDate()}
            </DateCircle>
          </DateCell>
        ))}
      </DatesGrid>
    </WeekGridContainer>
  );
};

export default WeekDaysGrid;

const WeekGridContainer = styled.div`
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

  opacity: 1;

  transition: opacity 0.3s ease-in-out;
  cursor: pointer;
`;
