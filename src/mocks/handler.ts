import { delay, http, HttpResponse, passthrough } from 'msw';
import sticker from '@assets/image/birthday_sticker.svg';
import cover from '@assets/image/happy_birthday.svg';
import yellowCover from '@assets/image/birthday_small_yellow.svg';
import redCover from '@assets/image/birthday_small_red.svg';
import blueCover from '@assets/image/birthday_small_blue.svg';
import greenCover from '@assets/image/birthday_small_green.svg';

import H from '@assets/image/H.jpeg';
import { RollingPapers } from '@/types/paper';
import { ResData } from '@/types/api';

const indexedGroupList: Record<number, any> = {
  1: {
    id: 1,
    name: '경희대학교',
  },

  2: {
    id: 2,
    name: '경희고고고등학교',
  },

  3: {
    id: 3,
    name: '테스트용약간긴긴이름',
  },
};

const indexedUserList: Record<number, any> = {
  1: {
    id: 1,
    name: '효섭',
    groupIds: [1, 2],
    introduction: '디폴트효섭',
    imageUrl: H,
  },

  2: {
    id: 2,
    name: '효효섭',
    groupIds: [1],
    introduction: '효효섭이다',
    imageUrl: H,
  },

  3: {
    id: 3,
    name: '효효효효섭',
    groupIds: [2],
    introduction: '효효효섭이다',
    imageUrl: 'error',
  },

  4: {
    id: 4,
    name: '효섭(시크함)',
    groupIds: [1, 2, 3],
    introduction: '시크한 효섭이다',
    imageUrl: '',
  },

  5: {
    id: 5,
    name: '효섭(댄디함)',
    groupIds: [],
    introduction: '댄디한 효섭이다',
    imageUrl: H,
  },
};

var myGroupIDList: number[] = [1, 2, 3];

let coverApiResponseCount = 0;

export const handlers = [
  http.get('http://localhost:3000/test', (info) => {
    return HttpResponse.json({ id: 'c7b3d8e0' }, { status: 222 });
  }),

  http.get('http://localhost:3000/assets/*', (info) => {
    return passthrough();
  }),

  http.get('https://fonts.cdnfonts.com/*', (info) => {
    return passthrough();
  }),

  http.get('http://localhost:3000/api/members', ({ request }) => {
    const url = new URL(request.url);
    const groupId = Number(url.searchParams.get('groupId'));
    const search = url.searchParams.get('search');

    const inGroupList = groupId
      ? Object.values(indexedUserList).filter((item) =>
          item.groupIds.includes(groupId)
        )
      : Object.values(indexedUserList);

    const searchedList = search
      ? inGroupList.filter((item) => item.name.includes(search))
      : inGroupList;

    const data = searchedList.map((item) => {
      return { groupId, ...item };
    });

    return HttpResponse.json(
      {
        data: data,
        pageInfo: {},
      },
      { status: 200 }
    );
  }),

  http.get('http://localhost:3000/api/groups', async () => {
    return HttpResponse.json(
      {
        data: { groups: myGroupIDList.map((id) => indexedGroupList[id]) },
        pageInfo: {},
      },
      { status: 200 }
    );
  }),

  http.post('http://localhost:3000/api/group/me', async ({ request }) => {
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
        data: ['반가움', '그리움'],
        pageInfo: {},
      },
      { status: 200 }
    );
  }),

  http.get(
    'http://localhost:3000/api/groups/:groupId/cover',
    async ({ request }) => {
      coverApiResponseCount += 1;

      if (coverApiResponseCount <= 4) {
        return HttpResponse.json(
          {
            data: {},
            code: '',
          },
          { status: 202 }
        );
      }

      return HttpResponse.json(
        {
          code: 'SUCCESS',
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

      if (coverApiResponseCount <= 1) {
        return HttpResponse.json(
          {
            code: '',
            data: {},
          },
          { status: 202 }
        );
      }

      return HttpResponse.json(
        {
          code: 'SUCCESS',
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
                memberName: '이미지 에러 테스트',
                eventType: '',
                description: '깨짐.',
                profileImgUrl: 'error',
              },
              {
                memberId: 2,
                memberName: '이미지 깨짐',
                eventType: '',
                description: '깨짐.',
                profileImgUrl: sticker,
              },
            ],
          },
          {
            date: '2024-07-04',
            events: [
              {
                memberId: 6,
                memberName: '테스트 효섭',
                eventType: '',
                description: '테스트.',
                profileImgUrl: H,
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
            date: '2024-08-30',
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

    if (month === 9) {
      data = {
        days: [
          {
            date: '2024-09-11',
            events: [
              {
                memberId: 22,
                memberName: '트루효섭',
                eventType: '',
                description: '오늘 생일입니다.',
                profileImgUrl: H,
              },
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
              {
                memberId: 12,
                memberName: '앙칼진효섭',
                eventType: '',
                description: '오늘 생일입니다.',
                profileImgUrl:
                  'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg',
              },
              {
                memberId: 142,
                memberName: '앙칼진효섭',
                eventType: '',
                description: '오늘 생일입니다.',
                profileImgUrl:
                  'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg',
              },
              {
                memberId: 122,
                memberName: '앙칼진효섭',
                eventType: '',
                description: '오늘 생일입니다.',
                profileImgUrl:
                  'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg',
              },
              {
                memberId: 1222,
                memberName: '앙칼진효섭',
                eventType: '',
                description: '오늘 생일입니다.',
                profileImgUrl:
                  'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg',
              },
            ],
          },

          {
            date: '2024-09-24',
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
            date: '2024-09-05',
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

    if (month === 10) {
      data = {
        days: [
          {
            date: '2024-10-02',
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

  http.get(
    'http://localhost:3000/api/rollingpapers',

    async ({ request }) => {
      const url = new URL(request.url);
      const cursor = Number(url.searchParams.get('cursor')) ?? 0;

      await delay(1000);

      const data: RollingPapers = {
        letters: [
          {
            themeId: 1,
            profileImageUrl: H,
            name: '송효섭',
            coverImageUrl: redCover,
            content: '안녕 효섭아',
            stickers: [
              {
                key: 1,
                x: 0,
                y: 100,
                scale: 2,
                rotate: 1,
                side: 'front',
                imgUrl: sticker,
              },
              {
                key: 4,
                x: 100,
                y: 100,
                scale: 2,
                rotate: 21,
                side: 'front',
                imgUrl: sticker,
              },
              {
                key: 2,
                x: 100,
                y: 340,
                scale: 1.54,
                rotate: -90,
                side: 'front',
                imgUrl: sticker,
              },
            ],
          },

          {
            themeId: 3,
            profileImageUrl: H,
            name: '효섭',
            coverImageUrl: greenCover,
            content:
              '매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용매우긴내용',
            stickers: [
              {
                key: 2,
                x: 250,
                y: 350,
                scale: 1.54,
                rotate: -40,
                side: 'back',
                imgUrl: sticker,
              },
            ],
          },

          {
            themeId: 2,
            profileImageUrl: H,
            name: '송효섭',
            coverImageUrl: blueCover,
            content: '안녕 송효효섭아',
            stickers: [
              {
                key: 1,
                x: 20,
                y: 100,
                scale: 1.4,
                rotate: 123,
                side: 'front',
                imgUrl: sticker,
              },
            ],
          },

          {
            themeId: 0,
            profileImageUrl: H,
            name: '송효섭',
            coverImageUrl: yellowCover,
            content: '안녕 효섭아',
            stickers: [
              {
                key: 1,
                x: 200,
                y: 200,
                scale: 0.3,
                rotate: 304,
                side: 'back',
                imgUrl: sticker,
              },
            ],
          },

          {
            themeId: 2,
            profileImageUrl: H,
            name: '송효섭',
            coverImageUrl: blueCover,
            content: '안녕 효섭아아아',
            stickers: [
              {
                key: 1,
                x: 120,
                y: 100,
                scale: 2,
                rotate: 41,
                side: 'back',
                imgUrl: sticker,
              },
            ],
          },

          {
            themeId: 2,
            profileImageUrl: H,
            name: '송효섭',
            coverImageUrl: blueCover,
            content: '안녕 효섭아 반가워',
            stickers: [],
          },

          {
            themeId: 0,
            profileImageUrl: H,
            name: '송효섭',
            coverImageUrl: yellowCover,
            content: '테스트',
            stickers: [],
          },

          {
            themeId: 3,
            profileImageUrl: H,
            name: '송효섭',
            coverImageUrl: greenCover,
            content: '안녕',
            stickers: [
              {
                key: 1,
                x: 400,
                y: 300,
                scale: 1.5,
                rotate: 1,
                side: 'back',
                imgUrl: sticker,
              },
            ],
          },

          {
            themeId: 0,
            profileImageUrl: H,
            name: '송효섭',
            coverImageUrl: yellowCover,
            content: '안녕',
            stickers: [],
          },
        ],
      };

      if (cursor == 3) {
        return HttpResponse.json(
          {
            data: { letters: data.letters.slice(4) },
            pageInfo: {
              totalCount: 36,
            },
          },
          { status: 200 }
        );
      }

      return HttpResponse.json(
        {
          data,
          pageInfo: {
            nextCursor: cursor + 1,
            totalCount: 36,
          },
        },
        { status: 200 }
      );
    }
  ),

  http.post(
    'http://localhost:3000/api/groups/members/:memberId/rollingpapers',
    async ({ request }) => {
      await delay(2000);

      return HttpResponse.json({ data: '' }, { status: 200 });
    }
  ),
];
