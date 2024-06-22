import { useMutation, useQuery } from '@tanstack/react-query';
import {
  requestGetGroupList,
  requestGetMyGroupList,
  requestPostMyGroupList,
} from '@apis/requests';
import ResponseError from '@apis/responseError';
import { ResData } from '@/types/api';
import { GroupList } from '@/types/group';
import { QUERY_KEY } from '@constants/query';
import { queryClient } from '@/queryClient';

export const useMyGroupList = () => {
  const query = useQuery<ResData<GroupList>, ResponseError, GroupList>({
    queryKey: [QUERY_KEY.myGroupList, 'GET'],
    queryFn: requestGetMyGroupList,
    select: (json) => json.data,
  });

  const mutation = useMutation({
    mutationFn: (groupId: number) => requestPostMyGroupList(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myGroupList, 'GET'],
      });
    },
  });

  return { query, mutation };
};
