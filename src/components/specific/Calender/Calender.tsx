import React from 'react';

import styled from 'styled-components';
import CalenderHeader from './CalenderHeader';
import MonthDaysGrid from './MonthDaysGrid';
import WeekDaysGrid from './WeekDaysGrid';
import { useCalender } from '@hooks/useCalender';
import DaysOfWeek from './DaysOfWeek';

const Calendar: React.FC = () => {
  const {
    monthDaysList,
    weekDaysList,
    currentRow,
    rowCount,
    isMoving,
    isResizing,
    isWeekView,
    renderingIndex,
    renderingYear,
    renderingMonth,
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
  } = useCalender();

  const renderDates = () => {
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

    return (
      <>
        {!isResizing && isWeekView ? (
          <>
            <DatesContainer
              style={{
                height: 50,
              }}
            >
              {weekDaysList.map((days, index) => {
                return (
                  <WeekDaysGrid
                    key={renderingWeekDate.getDay() + index - 7}
                    days={days}
                    renderingIndex={renderingIndex}
                    currentDate={currentDate}
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
              height: isWeekView ? 50 : rowCount * 50,
            }}
          >
            {monthDaysList.map((days, index) => {
              return (
                <MonthDaysGrid
                  key={renderingMonth + index - 1}
                  days={days}
                  renderingMonth={renderingMonth + index - 1}
                  renderingIndex={renderingIndex}
                  currentDate={currentDate}
                  isWeekView={isWeekView}
                  isMoving={isMoving}
                  currentRow={currentRow}
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
    <CalendarContainer>
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
  max-width: 450px;
  min-width: 350px;

  font-family: Arial, sans-serif;
`;

const DatesContainer = styled.div`
  display: flex;
  align-items: start;

  margin: 0 25px;

  transition: height ease-in-out 0.3s;
  /* height: 51px; */

  overflow: hidden;
`;
