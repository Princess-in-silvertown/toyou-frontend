import React, { useMemo, useState } from 'react';

import styled from 'styled-components';

const CalendarContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 25px;
  box-sizing: border-box;
  max-width: 450px;
  min-width: 350px;

  font-family: Arial, sans-serif;

  @media (max-width: 400px) {
    padding: 0 6vw;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;

  font-size: 20px;
  font-weight: 500;
  line-height: 23.87px;
  text-align: left;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 10px;
`;

const DaysOfWeek = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
`;

const Day = styled.div`
  flex-grow: 1;
  font-size: 10px;
  color: #aaaaaa;
  text-align: center;
`;

const DatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px 10px;

  @media (max-width: 400px) {
    gap: 8px 2vw;
  }
`;

const DateCell = styled.div<{
  $isCurrentDay: boolean;
  $isRenderingMonth: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid
    ${({ $isCurrentDay }) => ($isCurrentDay ? 'none' : '#616161')};

  font-size: 10px;
  color: ${({ $isCurrentDay }) => ($isCurrentDay ? 'white' : '#616161')};

  background: ${({ $isCurrentDay }) =>
    $isCurrentDay ? '#DD432E' : 'transparent'};

  opacity: ${({ $isRenderingMonth }) => ($isRenderingMonth ? 1 : 0.3)};
  cursor: pointer;
`;

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

const useCalender = () => {
  const date = useMemo(() => new Date(), []);

  const [renderingYear, setRenderingYear] = useState(date.getFullYear());
  const [renderingMonth, setRenderingMonth] = useState(date.getMonth());
  const [currentDate, setCurrentDate] = useState(date);

  const handleNextMonth = () => {
    if (renderingMonth < 11) {
      setRenderingMonth((prev) => prev + 1);
    } else {
      setRenderingMonth(1);
      setRenderingYear((prev) => prev + 1);
    }
  };

  const handlePrevMonth = () => {
    if (renderingMonth > 1) {
      setRenderingMonth((prev) => prev - 1);
    } else {
      setRenderingMonth(12);
      setRenderingYear((prev) => prev - 1);
    }
  };

  const changeCurrentDate = (date: Date, callback: (date: Date) => void) => {
    const newDate = new Date(date);
    setCurrentDate(newDate);

    callback(newDate);
  };

  const getStartOfMonth = () => {
    const date = new Date(renderingYear, renderingMonth, 1);
    const day = date.getDay();
    const diff = date.getDate() - day;
    return new Date(date.setDate(diff));
  };

  const getEndOfMonth = () => {
    const date = new Date(renderingYear, renderingMonth + 1, 0);
    const day = date.getDay();
    const diff = date.getDate() + (6 - day);

    return new Date(date.setDate(diff));
  };

  const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const compareDate = (date: Date) => {
    return (
      date.getFullYear() === currentDate.getFullYear() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getDate() === currentDate.getDate()
    );
  };

  const compareRenderingMonth = (date: Date) => {
    return (
      date.getFullYear() === renderingYear && date.getMonth() === renderingMonth
    );
  };

  const days: Date[] = useMemo(() => {
    const days = [];

    let day = getStartOfMonth();
    const endDate = getEndOfMonth();

    while (day <= endDate) {
      days.push(new Date(day));
      day = addDays(day, 1);
    }

    return days;
  }, [renderingYear, renderingMonth]);

  return {
    days,
    renderingYear,
    renderingMonth,
    currentDate,
    handleNextMonth,
    handlePrevMonth,
    changeCurrentDate,
    compareDate,
    compareRenderingMonth,
  };
};

const Calendar: React.FC = () => {
  const {
    days,
    renderingYear,
    renderingMonth,
    handleNextMonth,
    handlePrevMonth,
    changeCurrentDate,
    compareDate,
    compareRenderingMonth,
  } = useCalender();

  const renderHeader = () => {
    return (
      <Header>
        <div>{`${renderingYear}년 ${renderingMonth + 1}월`}</div>
        <Button onClick={handlePrevMonth}>{'<'}</Button>
        <Button onClick={handleNextMonth}>{'>'}</Button>
      </Header>
    );
  };

  const renderDaysOfWeek = () => {
    return (
      <DaysOfWeek>
        {DAYS.map((day, index) => (
          <Day key={index}>{day}</Day>
        ))}
      </DaysOfWeek>
    );
  };

  const renderDates = () => {
    const makeClickDayHandler = (day: Date) => () => {
      changeCurrentDate(day, () => {});
    };

    return (
      <DatesGrid>
        {days.map((day) => (
          <DateCell
            key={day.toString()}
            $isCurrentDay={compareDate(day)}
            $isRenderingMonth={compareRenderingMonth(day)}
            onClick={makeClickDayHandler(day)}
          >
            {day.getDate()}
          </DateCell>
        ))}
      </DatesGrid>
    );
  };

  return (
    <CalendarContainer>
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderDates()}
    </CalendarContainer>
  );
};

export default Calendar;
