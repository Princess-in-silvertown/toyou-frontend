import { useQuery } from '@tanstack/react-query';
import { requestGetEventToday } from '@apis/requests';
import ResponseError from '@apis/responseError';
import { ResData } from '@/types/api';
import { QUERY_KEY } from '@constants/query';
import { Day, Events } from '@/types/event';

export const useTodayEvent = () => {
  const query = useQuery<ResData<{ events: Events }>, ResponseError, Events>({
    queryKey: [QUERY_KEY.event, 'GET'],
    queryFn: () => requestGetEventToday(),
    select: (json) => json.data.events,
    staleTime: Infinity,
  });

  return query;
};
