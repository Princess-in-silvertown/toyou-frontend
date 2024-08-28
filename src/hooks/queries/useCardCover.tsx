import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { requestGetCover, requestPostCover } from '@apis/requests';
import ResponseError from '@apis/responseError';
import { ResData } from '@/types/api';
import { QUERY_KEY } from '@constants/query';
import { queryClient } from '@/contexts/providers/QueryClientProvider';
import { useContext, useEffect } from 'react';
import { messageFormDispatchContext } from '@/contexts/states/messageFormContext';

export const useGetCardCover = (groupId: number) => {
  const query = useSuspenseQuery<
    ResData<{ imgUrl: string }>,
    ResponseError,
    { imgUrl: string }
  >({
    queryKey: [QUERY_KEY.cover, 'GET'],
    queryFn: () => requestGetCover(groupId),
    select: (json) => json.data,
    retry: (failureCount, error) => {
      // 에러코드 검사 예정
      if (error && failureCount < 30) return true;

      return false;
    },
    retryDelay: 1000,
  });

  const { handleChangeCoverImgUrl } = useContext(messageFormDispatchContext);

  useEffect(() => {
    const url = query.data.imgUrl;

    handleChangeCoverImgUrl(url);
  }, [query]);

  return query;
};

export const usePostCardCover = (groupId: number) => {
  const mutation = useMutation({
    mutationFn: () => requestPostCover(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.cover, 'GET'],
      });
    },
  });

  return mutation;
};
