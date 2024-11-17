import { useCalender } from '@hooks/useCalender';
import { calenderContext } from '../states/calenderContext';
import { ParsedEvent } from '@/types/event';
import { useState } from 'react';
import { useEvents } from '@hooks/queries/useEvent';

interface Props extends React.PropsWithChildren {}

export const CalenderProvider = ({ children }: Props) => {
  const value = useCalender();

  const [eventMap, setEventMap] = useState<ParsedEvent>({});

  const handleChangeEvent = (eventMap: ParsedEvent) => {
    setEventMap((prev) => {
      return { ...eventMap, ...prev };
    });
  };

  const next2MonthDate = new Date(
    value.renderingYear,
    value.renderingMonth + 2
  );
  const prev2MonthDate = new Date(
    value.renderingYear,
    value.renderingMonth - 2
  );
  const nextMonthDate = new Date(value.renderingYear, value.renderingMonth + 1);
  const prevMonthDate = new Date(value.renderingYear, value.renderingMonth - 1);

  const dateParams = [
    { year: value.renderingYear, month: value.renderingMonth },
    { year: prevMonthDate.getFullYear(), month: prevMonthDate.getMonth() },
    { year: nextMonthDate.getFullYear(), month: nextMonthDate.getMonth() },
  ];

  const preFetchDateParams = [
    { year: prev2MonthDate.getFullYear(), month: prev2MonthDate.getMonth() },
    { year: next2MonthDate.getFullYear(), month: next2MonthDate.getMonth() },
  ];

  useEvents(dateParams, handleChangeEvent, preFetchDateParams);

  return (
    <calenderContext.Provider value={{ ...value, eventMap, handleChangeEvent }}>
      {children}
    </calenderContext.Provider>
  );
};
