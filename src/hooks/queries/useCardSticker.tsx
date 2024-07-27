import { useSuspenseQuery } from '@tanstack/react-query';
import { requestGetSticker } from '@apis/requests';
import ResponseError from '@apis/responseError';
import { ResData } from '@/types/api';
import { QUERY_KEY } from '@constants/query';

export const useCardSticker = (groupId: number) => {
  const query = useSuspenseQuery<
    ResData<{ imgUrl: string }[]>,
    ResponseError,
    { imgUrl: string }[]
  >({
    queryKey: [QUERY_KEY.sticker, 'GET'],
    queryFn: () => requestGetSticker(groupId),
    select: (json) => json.data,
    retry: (failureCount, error) => {
      if (error && failureCount < 30) return true;

      return false;
    },
    retryDelay: 1000,
  });

  return query;
};
