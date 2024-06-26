import { http, HttpResponse } from 'msw';

const indexedGroupList: Record<number, any> = {
  1: {
    id: 1,
    name: 'group_name1',
    value: 'group1',
    userCount: 5,
    userIds: [1, 2, 3, 4, 5],
  },
  2: {
    id: 2,
    name: 'group_name2',
    value: 'group2',
    userCount: 2,
    userIds: [2, 3],
  },
  3: { id: 3, name: 'group_name3', value: 'group3', userCount: 0, userIds: [] },
};

const indexedUserList: Record<number, any> = {
  1: { id: 1, name: '효섭' },
  2: { id: 2, name: '효효섭' },
  3: { id: 3, name: '효효효효섭' },
  4: { id: 4, name: '효섭(시크함)' },
  5: { id: 5, name: '효섭(댄디함)' },
};

var myGroupIDList: number[] = [];

export const handlers = [
  http.get('/test', (info) => {
    return HttpResponse.json({ id: 'c7b3d8e0' }, { status: 222 });
  }),

  http.get('api/group/searched', (info) => {
    return HttpResponse.json(
      {
        data: Object.values(indexedGroupList),
        pageInfo: {},
      },
      { status: 200 }
    );
  }),

  http.get('api/group/me', () => {
    return HttpResponse.json(
      {
        data: myGroupIDList.map((id) => indexedGroupList[id]),
        pageInfo: {},
      },
      { status: 200 }
    );
  }),

  http.post('api/group/me', async ({ request }) => {
    const data = (await request.json()) as { groupId: number };
    const id = Number(data?.groupId);

    if (isNaN(id)) {
      return HttpResponse.json({ data: { message: 'fail' } }, { status: 403 });
    }

    myGroupIDList.push(id);

    return HttpResponse.json({ data: { message: 'success' } }, { status: 201 });
  }),

  http.get('http://localhost:3000/api/users', ({ request }) => {
    const url = new URL(request.url);
    const groupId = Number(url.searchParams.get('groupId'));

    if (isNaN(groupId)) {
      return HttpResponse.json({ data: { message: 'fail' } }, { status: 403 });
    }

    const userIds: number[] = indexedGroupList[groupId]?.userIds ?? [];

    return HttpResponse.json(
      {
        data: userIds.map((id) => indexedUserList[id]),
        pageInfo: {},
      },
      { status: 200 }
    );
  }),

  http.get('http://localhost:3000/api/user', ({ request }) => {
    const url = new URL(request.url);
    const userId = Number(url.searchParams.get('userId'));

    if (isNaN(userId)) {
      return HttpResponse.json({ data: { message: 'fail' } }, { status: 403 });
    }

    return HttpResponse.json(
      {
        data: indexedUserList[userId],
        pageInfo: {},
      },
      { status: 200 }
    );
  }),
];
