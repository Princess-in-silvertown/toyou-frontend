import { useEffect } from 'react';
import styled from 'styled-components';
import { Events } from '@/types/event';
import { useDrag } from '@hooks/useDrag';
import { getDateTime } from '@utils/date';
import { useViewport } from '@hooks/useViewport';
import CalenderHeader from './CalenderHeader';
import DaysOfWeek from './DaysOfWeek';
import MonthDaysGrid from './MonthDaysGrid';
import { useCalender } from '@hooks/useCalender';

interface Props {
  onChangeEventList?: (events?: Events) => void;
}

const ROW_HEIGHT = 48;

const Calendar = ({ onChangeEventList }: Props) => {
  const {
    monthDaysList,
    rowCount,
    isMoving,
    renderingYear,
    renderingMonth,
    renderingIndex,
    renderingWeekDate,
    currentDate,
    handleNextMonth,
    handlePrevMonth,
    changeCurrentDate,
    changeRenderingDate,
  } = useCalender();

  const [windowWidth] = useViewport();

  const handleDragEndXCalender = (deltaX: number, velocity: number) => {
    if (deltaX < -150 || (deltaX < -30 && velocity > 5)) {
      return handleNextMonth();
    } else if (deltaX > 150 || (deltaX > 30 && velocity > 5)) {
      return handlePrevMonth();
    }
  };

  const { collected, bind } = useDrag({
    moveXMinMax: [-windowWidth + 50, windowWidth - 50],

    onMove: ({ delta, startDirection, setStates }) => {
      const [deltaX, deltaY] = delta;

      if (startDirection === 'horizontal') {
        setStates.setX(deltaX);
        setStates.setY(0);
      } else {
        setStates.setY(deltaY);
        setStates.setY(0);
      }
    },

    onEnd: ({ delta, velocity, setStates }) => {
      const [deltaX] = delta;

      setStates.setX(0);
      setStates.setY(0);

      handleDragEndXCalender(deltaX, velocity);

      setStates.canDrag(false);

      setTimeout(() => setStates.canDrag(true), 250);
    },
  });

  const renderDates = () => {
    const handleClickMonthViewDay = (day: Date) => {
      if (isMoving) return;

      // click current Month day
      if (day.getMonth() === renderingMonth) {
        changeCurrentDate(day, () => {});
        changeRenderingDate(day);
      }

      // click prev Month day
      else if (day < new Date(renderingYear, renderingMonth)) {
        handlePrevMonth().then(() => {
          changeCurrentDate(day);
          changeRenderingDate(day);
        });

        changeCurrentDate(day, () => {});
      }

      // click next Month day
      else if (day > new Date(renderingYear, renderingMonth)) {
        handleNextMonth().then(() => {
          changeCurrentDate(day);
          changeRenderingDate(day);
        });

        changeCurrentDate(day, () => {});
      }
    };

    return (
      <DatesContainer
        style={{
          height: rowCount * ROW_HEIGHT,
        }}
      >
        {monthDaysList.map((days, index) => {
          const date = new Date(renderingYear, renderingMonth);
          date.setMonth(date.getMonth() + index - 1);

          return (
            <MonthDaysGrid
              key={renderingWeekDate.getDay() + `${date.getMonth()}`}
              days={days}
              renderingYear={date.getFullYear()}
              renderingMonth={date.getMonth()}
              renderingIndex={renderingIndex}
              deltaX={collected.x}
              currentDate={currentDate}
              isMoving={isMoving}
              onChangeDay={handleClickMonthViewDay}
            />
          );
        })}
      </DatesContainer>
    );
  };

  return (
    <CalendarContainer {...bind}>
      <CalenderHeader
        renderingYear={renderingYear}
        renderingMonth={renderingMonth}
        handleNextMonth={handleNextMonth}
        handlePrevMonth={handlePrevMonth}
      />
      <DaysOfWeek />
      {renderDates()}
    </CalendarContainer>
  );
};

export default Calendar;

const CalendarContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  max-width: 500px;
  min-width: 350px;

  font-family: Arial, sans-serif;
`;

const DatesContainer = styled.div`
  display: flex;
  align-items: start;

  margin: 0 25px;

  transition: height ease-out 0.3s;
  /* height: 51px; */

  overflow: hidden;
`;
