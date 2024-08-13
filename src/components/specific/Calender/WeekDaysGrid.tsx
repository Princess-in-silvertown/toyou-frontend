import { useEvent } from '@hooks/queries/useEvent';
import { compareDate, getDateTime } from '@utils/date';
import styled from 'styled-components';

interface Props {
  days: Date[];
  currentDate: Date;
  isMoving: boolean;
  renderingIndex: number;
  renderingYear: number;
  renderingMonth: number;
  deltaX: number;
  onChangeDay: (day: Date) => void;
}

const WeekDaysGrid = ({
  days,
  currentDate,
  isMoving,
  renderingYear,
  renderingMonth,
  renderingIndex,
  deltaX,
  onChangeDay,
}: Props) => {
  const { data } = useEvent(renderingYear, renderingMonth);

  const isEventDay = (date: Date) => {
    if (!data) return false;

    const key = getDateTime(date);

    return (data?.[key]?.count ?? 0) >= 1;
  };

  return (
    <WeekGridContainer>
      <TranslateX style={{ transform: `translateX(${deltaX}px)` }}>
        <DatesGrid
          style={{
            transform: `translateX(calc(${-100 * renderingIndex}%)`,
            transition: isMoving ? 'ease-out 0.3s' : 'none',
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
              {isEventDay(day) && <EventMarker />}
            </DateCell>
          ))}
        </DatesGrid>
      </TranslateX>
    </WeekGridContainer>
  );
};

export default WeekDaysGrid;

const WeekGridContainer = styled.div`
  flex-shrink: 0;

  width: 100%;
  padding: 4px 0;

  transition: transform 0.3s ease-out;
`;

const TranslateX = styled.div`
  transition: transform ease-out 0.2s;
`;

const TranslateY = styled.div``;

const DatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 8px;
`;

const DateCell = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 40px;
`;

const EventMarker = styled.div`
  position: absolute;
  bottom: -5px;

  width: 5px;
  height: 5px;
  border-radius: 2px;

  background: #dd432e;
`;

const DateCircle = styled.div<{
  $isCurrentDay: boolean;
  $isRenderingMonth: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 31px;
  height: 31px;
  border-radius: 50%;

  font-size: 16px;
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
