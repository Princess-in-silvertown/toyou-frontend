import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import CalenderHeader from './CalenderHeader';
import MonthDaysGrid from './MonthDaysGrid';
import WeekDaysGrid from './WeekDaysGrid';
import DaysOfWeek from './DaysOfWeek';
import { Events } from '@/types/event';
import { useDrag } from '@hooks/useDrag';
import { getDateTime } from '@utils/date';
import { useViewport } from '@hooks/useViewport';
import { calenderContext } from '@/contexts/states/calenderContext';
import { useEvents } from '@hooks/queries/useEvent';

interface Props {
  onChangeEventList?: (events?: Events) => void;
}

const ROW_HEIGHT = 48;

const Calendar = ({ onChangeEventList }: Props) => {
  const {
    monthDaysList,
    weekDaysList,
    rowCount,
    isMoving,
    isResizing,
    isWeekView,
    renderingYear,
    renderingMonth,
    renderingIndex,
    renderingWeekDate,
    currentDate,
    viewWeek,
    viewMonth,
    handleNextMonth,
    handlePrevMonth,
    handleNextWeek,
    handlePrevWeek,
    changeCurrentDate,
    changeRenderingDate,
  } = useContext(calenderContext)!;

  const [windowWidth] = useViewport();

  const handleDragEndXCalender = (deltaX: number, velocity: number) => {
    if (isWeekView) {
      if (deltaX < -150 || (deltaX < -30 && velocity > 5)) {
        return handleNextWeek();
      } else if (deltaX > 150 || (deltaX > 30 && velocity > 5)) {
        return handlePrevWeek();
      }
    }

    if (deltaX < -150 || (deltaX < -30 && velocity > 5)) {
      return handleNextMonth();
    } else if (deltaX > 150 || (deltaX > 30 && velocity > 5)) {
      return handlePrevMonth();
    }
  };

  const handleDragEndYCalender = (deltaY: number, velocity: number) => {
    if (!isWeekView) {
      if (deltaY < -75 || (deltaY < -30 && velocity > 2)) {
        viewWeek();
      }
    } else if (deltaY > 75 || (deltaY > 30 && velocity > 2)) {
      viewMonth();
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

    onEnd: ({ delta, velocity, startDirection, setStates }) => {
      const [deltaX, deltaY] = delta;

      setStates.setX(0);
      setStates.setY(0);

      if (startDirection === 'horizontal') {
        handleDragEndXCalender(deltaX, velocity);
      } else {
        handleDragEndYCalender(deltaY, velocity);
      }

      setStates.canDrag(false);

      setTimeout(() => setStates.canDrag(true), 250);
    },
  });

  const renderDates = () => {
    const dateParams = [
      { year: currentDate.getFullYear(), month: currentDate.getMonth() + 1 },
    ];

    const [currentMonthQuery] = useEvents(dateParams);

    const handleClickWeekViewDay = (day: Date) => {
      if (isMoving) return;

      changeRenderingDate(day);
      changeCurrentDate(day);
    };

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

    useEffect(() => {
      const key = getDateTime(currentDate);

      onChangeEventList?.(currentMonthQuery.data?.[key]?.events);
    }, [currentDate, currentMonthQuery.data]);

    return (
      <>
        {!isResizing && isWeekView ? (
          <>
            <DatesContainer
              style={{
                height: ROW_HEIGHT,
              }}
            >
              {weekDaysList.map((days, index) => {
                const date = new Date(renderingYear, renderingMonth);
                date.setMonth(date.getMonth() + index - 1);

                return (
                  <WeekDaysGrid
                    key={renderingWeekDate.getDay() + `${date.getMonth()}`}
                    days={days}
                    renderingYear={date.getFullYear()}
                    renderingMonth={date.getMonth()}
                    renderingIndex={renderingIndex}
                    deltaX={collected.x}
                    isMoving={isMoving}
                    onChangeDay={handleClickWeekViewDay}
                  />
                );
              })}
            </DatesContainer>
          </>
        ) : (
          <DatesContainer
            style={{
              height: isWeekView ? ROW_HEIGHT : rowCount * ROW_HEIGHT,
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
                  isMoving={isMoving}
                  onChangeDay={handleClickMonthViewDay}
                />
              );
            })}
          </DatesContainer>
        )}
      </>
    );
  };

  return (
    <CalendarContainer {...bind}>
      <CalenderHeader
        renderingYear={renderingYear}
        renderingMonth={renderingMonth}
        isWeekView={isWeekView}
        viewMonth={viewMonth}
        viewWeek={viewWeek}
        handleNextMonth={handleNextMonth}
        handleNextWeek={handleNextWeek}
        handlePrevMonth={handlePrevMonth}
        handlePrevWeek={handlePrevWeek}
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
