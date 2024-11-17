import { requestGetEvents } from '@apis/requests';
import { QUERY_KEY } from '@constants/query';
import { Day, ParsedEvent } from '@/types/event';
import { useEffect } from 'react';
import { QueryClient, useQueries, useQueryClient } from '@tanstack/react-query';
import { queryClient as client } from '@/contexts/providers/QueryClientProvider';

export const prefetchEvents = async (
  dateParams: { year: number; month: number },
  queryClient: QueryClient
) => {
  const { year, month } = dateParams;

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.events, year, month, 'GET'],
    queryFn: () => requestGetEvents(year, month),
    staleTime: Infinity,
  });
};

export const useEvents = (
  dateParams: { year: number; month: number }[],
  handleChangeEvent?: (events: ParsedEvent) => void,
  prefetchDateParams?: { year: number; month: number }[]
) => {
  const queries = useQueries({
    queries: dateParams.map(({ year, month }) => ({
      queryKey: [QUERY_KEY.events, year, month, 'GET'],
      queryFn: () => requestGetEvents(year, month),
      select: (json: { data: { days: Day[] } }) => parseEvents(json.data?.days),
      staleTime: Infinity,
    })),
  });

  const queryClient = useQueryClient(client);
  for (let date of prefetchDateParams ?? []) {
    prefetchEvents({ year: date.year, month: date.month }, queryClient);
  }

  const mergedEvents: ParsedEvent = {};
  queries.forEach((query) => {
    if (query.data) {
      Object.entries(query.data).forEach(([date, event]) => {
        if (!mergedEvents[date]) {
          mergedEvents[date] = { count: 0, events: [] };
        }
        mergedEvents[date].count += event.count;
        mergedEvents[date].events.push(...event.events);
      });
    }
  });

  useEffect(() => {
    if (Object.keys(mergedEvents).length > 0) {
      handleChangeEvent?.(mergedEvents);
    }
  }, [mergedEvents]);

  return queries;
};

const parseEvents = (days: Day[]) => {
  const eventStore: ParsedEvent = {};

  days?.forEach((day) => {
    const key = day.date;

    if (!eventStore[key]) eventStore[key] = { count: 0, events: [] };

    eventStore[key].count += 1;
    eventStore[key].events = [...day.events];
  });

  return { ...eventStore };
};
