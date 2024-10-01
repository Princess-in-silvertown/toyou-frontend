import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { requestPostSticker } from '@apis/requests';
import ResponseError from '@apis/responseError';
import { ResData } from '@/types/api';
import { QUERY_KEY } from '@constants/query';
import { mockStickerData } from '@mocks/data';

export const useGetCardSticker = (keywords: string[], color: string) => {
  const prompt = keywords.join(', ');

  const query = useQuery<
    ResData<{ stickers: string[] }>,
    ResponseError,
    string[]
  >({
    queryKey: [QUERY_KEY.sticker, prompt, 'POST'],
    queryFn: () => requestPostSticker(prompt, color),
    select: (json) => json.data.stickers,
    staleTime: Infinity,
    retryDelay: 1000,
  });

  // 테스트용 코드
  return {
    ...query,
    data: [...(query.data ?? []), ...mockStickerData.stickers],
  };
};
