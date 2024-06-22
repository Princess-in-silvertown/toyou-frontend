import { useQuery } from '@tanstack/react-query';
import { requestGetUserList } from '@apis/requests';
import ResponseError from '@apis/responseError';
import { ResData } from '@/types/api';
import { QUERY_KEY } from '@constants/query';
import { UserList } from '@/types/user';

export const useUserList = (groupId?: number) => {
  const query = useQuery<ResData<UserList>, ResponseError, UserList>({
    queryKey: [QUERY_KEY.userList, 'GET', groupId],
    queryFn: () => requestGetUserList(groupId),
    select: (json) => json.data,
  });

  return query;
};
