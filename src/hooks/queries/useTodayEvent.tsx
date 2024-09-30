import { useQuery } from '@tanstack/react-query';
import { requestGetEventToday } from '@apis/requests';
import ResponseError from '@apis/responseError';
import { ResData } from '@/types/api';
import { QUERY_KEY } from '@constants/query';
import { EventData, Events } from '@/types/event';

export const useTodayEvent = () => {
  const query = useQuery<ResData<EventData>, ResponseError, Events>({
    queryKey: [QUERY_KEY.event, 'GET'],
    queryFn: () => requestGetEventToday(),
    select: (json) => json.data.days[0].events,
    staleTime: Infinity,
    throwOnError: true,
  });

  return query;
};
