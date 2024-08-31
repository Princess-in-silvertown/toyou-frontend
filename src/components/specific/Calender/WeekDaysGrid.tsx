import { calenderContext } from '@/contexts/states/calenderContext';
import { ParsedEvent } from '@/types/event';
import { useEvent } from '@hooks/queries/useEvent';
import { compareDate, getDateTime } from '@utils/date';
import { useContext } from 'react';
import styled from 'styled-components';

interface Props {
  days: Date[];
  isMoving: boolean;
  deltaX: number;
  renderingYear: number;
  renderingMonth: number;
  renderingIndex: number;
  onChangeDay: (day: Date) => void;
}

const WeekDaysGrid = ({
  days,
  isMoving,
  deltaX,
  renderingMonth,
  renderingYear,
  renderingIndex,
  onChangeDay,
}: Props) => {
  const { currentDate, eventMap } = useContext(calenderContext)!;

  const isEventDay = (date: Date) => {
    if (!eventMap) return false;
    const key = getDateTime(date);
    return (eventMap?.[key]?.count ?? 0) >= 1;
  };

  return (
    <WeekGridContainer>
      <TranslateX style={{ transform: `translateX(${deltaX}px)` }}>
        <DatesGrid
          style={{
            transform: `translateX(calc(${-100 * renderingIndex}%)`,
            transition: isMoving ? 'ease-out 0.2s' : 'none',
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
  bottom: -4px;

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
