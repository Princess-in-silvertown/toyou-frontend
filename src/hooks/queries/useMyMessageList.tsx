import { useInfiniteQuery } from '@tanstack/react-query';
import { requestGetMessageList } from '@apis/requests';
import ResponseError from '@apis/responseError';
import { ResData } from '@/types/api';
import { Letter, Letters } from '@/types/letter';

export const useMyMessageList = () => {
  const query = useInfiniteQuery<
    ResData<Letters>,
    ResponseError,
    Letter[],
    string[],
    number
  >({
    queryKey: ['messageList', 'GET'],

    queryFn: ({ pageParam }) => requestGetMessageList(pageParam),

    initialPageParam: 0,

    getNextPageParam: (nextPage) => {
      if (nextPage) return nextPage.pageInfo?.nextCursor;

      return undefined;
    },

    select: ({ pages }) =>
      pages.reduce<Letter[]>((acc, { data }) => acc.concat(data.letters), []),
  });

  return query;
};
