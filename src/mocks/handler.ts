import { delay, http, HttpResponse } from 'msw';
import sticker from '@assets/image/birthday_sticker.svg';
import cover from '@assets/image/happy_birthday.svg';

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

let coverApiResponseCount = 0;

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

  http.get('http://localhost:3000/api/keywords', async ({ request }) => {
    const url = new URL(request.url);
    const message = url.searchParams.get('message');

    if (!message) {
      return HttpResponse.json({ data: { message: 'fail' } }, { status: 403 });
    }

    await delay(3000);

    return HttpResponse.json(
      {
        data: ['피곤', '배고픔'],
        pageInfo: {},
      },
      { status: 200 }
    );
  }),

  http.get(
    'http://localhost:3000/api/groups/:groupId/cover',
    async ({ request }) => {
      coverApiResponseCount += 1;

      if (coverApiResponseCount <= 5) {
        return HttpResponse.json({}, { status: 400 });
      }

      return HttpResponse.json(
        {
          data: { imgUrl: cover },
        },
        { status: 200 }
      );
    }
  ),

  http.get(
    'http://localhost:3000/api/groups/:groupId/sticker',
    async ({ request }) => {
      coverApiResponseCount += 1;

      if (coverApiResponseCount <= 5) {
        return HttpResponse.json(
          {
            data: {},
          },
          { status: 400 }
        );
      }

      return HttpResponse.json(
        {
          data: [
            ...new Array(5).fill({ imgUrl: sticker }),
            {
              imgUrl:
                'https://media.tenor.com/ar6xI838JiEAAAAi/cat-meme-cat.gif',
            },
            {
              imgUrl:
                'https://i.namu.wiki/i/016r0DjGVQ3em4bhgYxGZJ7VI2y30qFt6KfItWLYFREHNxPl1KBaGY60tXGr9K5qFsgE-U3BHtw5UVbeaWTWwg.gif',
            },
            {
              imgUrl:
                'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1nT8l0.img?w=373&h=359&m=6',
            },
          ],
        },
        { status: 200 }
      );
    }
  ),

  http.post(
    'http://localhost:3000/api/groups/:groupId/cover',
    async ({ request }) => {
      return HttpResponse.json({}, { status: 200 });
    }
  ),

  http.get('http://localhost:3000/api/events', async ({ request }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get('date');

    await delay(1000);

    if (!date) {
      return HttpResponse.json({ data: { message: 'fail' } }, { status: 403 });
    }

    let data;

    data = { days: [] };

    const [year, month, day] = date.split('-').map((num) => Number(num));

    if (day) {
      return HttpResponse.json(
        {
          data: {
            events: [
              {
                memberId: 6,
                memberName: '이미지 깨짐',
                eventType: '',
                description: '깨짐.',
                profileImgUrl: 'error',
              },
            ],
          },
        },
        { status: 200 }
      );
    }

    if (month === 7) {
      data = {
        days: [
          {
            date: '2024-07-30',
            events: [
              {
                memberId: 6,
                memberName: '이미지 깨짐',
                eventType: '',
                description: '깨짐.',
                profileImgUrl: 'error',
              },
            ],
          },
        ],
      };
    }

    if (month === 8) {
      data = {
        days: [
          {
            date: '2024-08-11',
            events: [
              {
                memberId: 1,
                memberName: '시크효섭',
                eventType: '',
                description: '오늘 생일입니다.',
                profileImgUrl:
                  'https://mblogthumb-phinf.pstatic.net/MjAyMTA0MzBfMjMg/MDAxNjE5NzY2MDc3Njc1.QTn3NuadrIe8IarOOZAN61-7C06Ce_E1693wilcYrLMg.b4cO2kVaUx0wD9BGXQ5ux7DjT-e6qW8fXQT23Hjc6vQg.JPEG.paran-paran/%EC%9E%A5%EB%8F%99%EA%B1%B4_10.jpg?type=w800',
              },
              {
                memberId: 2,
                memberName: '댄디효섭',
                eventType: '',
                description: '오늘 생일입니다.',
                profileImgUrl:
                  'https://i.namu.wiki/i/bCmE_8XrnEYeEKlbme2ZS8rsG6dcB1vGD-UJtxvGncvXuYL9fiBqL8Fk_6cQ58EKJYTyyw9mA0LWK3yIaRYQow.webp',
              },
            ],
          },

          {
            date: '2024-08-24',
            events: [
              {
                memberId: 3,
                memberName: '간지효섭',
                eventType: '',
                description: '오늘 생일입니다.',
                profileImgUrl:
                  'https://i.namu.wiki/i/xifChGswbLh8qg2qQyJADGr-9IKZ4DES71zkmTs5sN-zMpZQq60trPR2XR9gr7kjMjsDX1y5zE6EAL0nWruGkg.webp',
              },
            ],
          },

          {
            date: '2024-08-05',
            events: [
              {
                memberId: 4,
                memberName: '최애의 효섭',
                eventType: '',
                description: '오늘 생일입니다.',
                profileImgUrl:
                  'https://i.namu.wiki/i/kDxN8Y1I3QnwN_7WmesRlM5L-p54NzRD1fCxyKAm5JB0NsE2Kg562c5gfGH6vKIB0LQIVrMaehxTxwlDVa91cA.webp',
              },
            ],
          },
        ],
      };
    }

    if (month === 9) {
      data = {
        days: [
          {
            date: '2024-09-01',
            events: [
              {
                memberId: 4,
                memberName: '최애의 효섭',
                eventType: '',
                description: '콘서트 당일입니다.',
                profileImgUrl:
                  'https://i.namu.wiki/i/kDxN8Y1I3QnwN_7WmesRlM5L-p54NzRD1fCxyKAm5JB0NsE2Kg562c5gfGH6vKIB0LQIVrMaehxTxwlDVa91cA.webp',
              },
            ],
          },
          {
            date: '2024-09-02',
            events: [
              {
                memberId: 6,
                memberName: '이미지 깨짐',
                eventType: '',
                description: '깨짐.',
                profileImgUrl: 'error',
              },
            ],
          },
        ],
      };
    }

    return HttpResponse.json(
      {
        data,
        pageInfo: {},
      },
      { status: 200 }
    );
  }),
];
