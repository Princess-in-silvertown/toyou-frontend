import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { requestGetEvents } from '@apis/requests';
import ResponseError from '@apis/responseError';
import { ResData } from '@/types/api';
import { QUERY_KEY } from '@constants/query';
import { Day, EventData, ParsedEvent } from '@/types/event';
import { useContext, useEffect } from 'react';
import { calenderContext } from '@/contexts/states/calenderContext';

export const useEvent = (
  year: number,
  month: number,
  handleChangeEvent?: (event: ParsedEvent) => void
) => {
  const query = useQuery<ResData<EventData>, ResponseError, ParsedEvent>({
    queryKey: [QUERY_KEY.events, year, month, 'GET'],
    queryFn: () => requestGetEvents(year, month),
    select: (json) => parseEvents(json.data?.days),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (query.data) {
      handleChangeEvent?.(query.data);
    }
  }, [query.data]);

  return query;
};

const eventStore: ParsedEvent = {};

const parseEvents = (days: Day[]) => {
  days &&
    days.forEach((day) => {
      const key = day.date;

      if (!eventStore[key]) eventStore[key] = { count: 0, events: [] };

      eventStore[key].count += 1;
      eventStore[key].events = [...day.events];
    });

  return { ...eventStore };
};
