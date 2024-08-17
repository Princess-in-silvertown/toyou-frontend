import { useQuery } from '@tanstack/react-query';
import { requestGetMemberList } from '@apis/requests';
import ResponseError from '@apis/responseError';
import { ResData } from '@/types/api';
import { QUERY_KEY } from '@constants/query';
import { MemberList } from '@/types/member';

export const useMemberList = (keyword: string, groupId?: number) => {
  const query = useQuery<ResData<MemberList>, ResponseError, MemberList>({
    queryKey: [QUERY_KEY.userList, 'GET', keyword, groupId],
    queryFn: () => requestGetMemberList(keyword, groupId),
    select: (json) => json?.data,
  });

  return query;
};
