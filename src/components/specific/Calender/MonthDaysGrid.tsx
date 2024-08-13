import { useEvent } from '@hooks/queries/useEvent';
import { compareDate, getDateTime } from '@utils/date';
import styled from 'styled-components';

interface Props {
  days: Date[];
  currentDate: Date;
  isWeekView: boolean;
  isMoving: boolean;
  currentRow: number;
  renderingYear: number;
  renderingMonth: number;
  renderingIndex: number;
  deltaX: number;
  deltaY: number;
  onChangeDay: (day: Date) => void;
}

const MonthDaysGrid = ({
  days,
  currentDate,
  isWeekView,
  isMoving,
  currentRow,
  renderingYear,
  renderingMonth,
  renderingIndex,
  deltaX,
  deltaY,
  onChangeDay,
}: Props) => {
  const { data } = useEvent(renderingYear, renderingMonth);

  const isEventDay = (date: Date) => {
    const key = getDateTime(date);
    return (data?.[key]?.count ?? 0) >= 1;
  };

  const isRenderingMonth = (date: Date) => {
    return date.getMonth() === renderingMonth;
  };

  return (
    <GridContainer
      style={{
        transform: `translateY(${isWeekView ? -48 * currentRow : 0}px`,
      }}
    >
      <TranslateX style={{ transform: `translateX(${deltaX}px)` }}>
        <DatesGrid
          style={{
            transform: `translateX(calc(${-100 * renderingIndex}%))`,
            transition: isMoving ? 'ease-out 0.3s' : 'none',
          }}
        >
          {days.map((day) => (
            <DateCell
              key={day.toString() + ((renderingMonth + 12) % 12)}
              onClick={() => onChangeDay(day)}
            >
              <DateCircle
                $isWeekView={isWeekView}
                $isCurrentDay={compareDate(day, currentDate)}
                $isRenderingMonth={isRenderingMonth(day)}
              >
                {day.getDate()}
              </DateCircle>
              {isEventDay(day) && (
                <EventMarker
                  $isRenderingMonth={isRenderingMonth(day)}
                  $isWeekView={isWeekView}
                />
              )}
            </DateCell>
          ))}
        </DatesGrid>
      </TranslateX>
    </GridContainer>
  );
};

export default MonthDaysGrid;

const GridContainer = styled.div`
  flex-shrink: 0;

  width: 100%;
  padding: 4px 0;

  transition: transform 0.3s ease-out;
`;

const TranslateX = styled.div`
  transition: transform ease-out 0.2s;
`;

const DatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 8px;

  transform: translateX(-100%);
`;

const DateCell = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 40px;
`;

const EventMarker = styled.div<{
  $isRenderingMonth: boolean;
  $isWeekView: boolean;
}>`
  position: absolute;
  bottom: -5px;

  width: 5px;
  height: 5px;
  border-radius: 2px;

  background: #dd432e;

  opacity: ${({ $isRenderingMonth, $isWeekView }) =>
    $isWeekView || $isRenderingMonth ? 1 : 0.3};

  transition: opacity 0.3s ease-in-out;
`;

const DateCircle = styled.div<{
  $isCurrentDay: boolean;
  $isRenderingMonth: boolean;
  $isWeekView: boolean;
}>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 31px;
  height: 31px;
  border-radius: 50%;

  font-size: 16px;
  letter-spacing: -0.02em;

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
