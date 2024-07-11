import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { requestGetKeywords } from '@apis/requests';
import ResponseError from '@apis/responseError';
import { ResData } from '@/types/api';
import { QUERY_KEY } from '@constants/query';
import { useEffect } from 'react';

export const useExtractedKeywords = (
  message: string,
  isLoaded: boolean,
  onChangeKeywords: (keywords: string[]) => void
) => {
  if (isLoaded) return;

  const query = useSuspenseQuery<ResData<string[]>, ResponseError, string[]>({
    queryKey: [QUERY_KEY.extractedKeywords, 'GET'],
    queryFn: () => requestGetKeywords(message),
    select: (json) => json.data ?? [],
    staleTime: Infinity,
  });

  useEffect(() => {
    if (query.error) {
      onChangeKeywords([]);
    } else {
      onChangeKeywords(query.data);
    }
  }, [query.data, query.error]);

  return query;
};
