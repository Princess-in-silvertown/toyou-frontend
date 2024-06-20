import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/test', (info) => {
    return HttpResponse.json({ id: 'c7b3d8e0' }, { status: 222 });
  }),

  http.get('api/group/searched', (info) => {
    return HttpResponse.json(
      {
        data: [
          { id: 1, name: 'group_name1', value: 'group1', userCount: 12 },
          { id: 2, name: 'group_name2', value: 'group2', userCount: 0 },
          { id: 3, name: 'group_name3', value: 'group3', userCount: 3 },
        ],
        pageInfo: {},
      },
      { status: 200 }
    );
  }),
];
