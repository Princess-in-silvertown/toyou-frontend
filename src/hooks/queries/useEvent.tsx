import { useQuery } from '@tanstack/react-query';
import { requestGetEvents } from '@apis/requests';
import ResponseError from '@apis/responseError';
import { ResData } from '@/types/api';
import { QUERY_KEY } from '@constants/query';
import { Day, EventData, ParsedEvent } from '@/types/event';

export const useEvent = (year: number, month: number) => {
  const query = useQuery<ResData<EventData>, ResponseError, ParsedEvent>({
    queryKey: [QUERY_KEY.events, year, month, 'GET'],
    queryFn: () => requestGetEvents(year, month),
    select: (json) => parseEvents(json.data?.days, month),
    staleTime: Infinity,
  });

  return query;
};

const parseEvents = (days: Day[], month: number) => {
  let parsed: ParsedEvent = { monthIndex: month };
  for (let i = 1; i <= 31; i++) {
    parsed = { [i]: { count: 0, events: [] }, ...parsed };
  }

  days &&
    days.forEach((day) => {
      const dayNumber = Number(day.date.split('-')[2]);

      if (dayNumber < 1 || dayNumber > 31) {
        throw new Error('invalid day number');
      }

      parsed[dayNumber].count += 1;
      parsed[dayNumber].events = [...parsed[dayNumber].events, ...day.events];
    });

  return parsed;
};
