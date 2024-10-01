import { delay, http, HttpResponse, passthrough } from 'msw';
import {
  API_URL,
  coverData,
  mockAugustEventList,
  mockIndexedGroupList,
  mockIndexedUserList,
  mockJulyEventList,
  mockMyGroupIDList,
  mockMyMessageList,
  mockOctoberEventList,
  mockSeptemberEventListData,
  mockStickerData,
  mockTodayEventList,
  myInfo,
  schools,
} from './data';

let coverApiResponseCount = 1;

export const handlers = [
  http.get(`${API_URL}test`, (info) => {
    return HttpResponse.json({ id: 'c7b3d8e0' }, { status: 222 });
  }),

  http.get(`${API_URL}assets/*`, (info) => {
    return passthrough();
  }),

  http.get(`${API_URL}toyou-frontend/assets/*`, (info) => {
    return passthrough();
  }),

  http.get(`/toyou-frontend/assets/*`, (info) => {
    return passthrough();
  }),

  http.get(`https://fonts.cdnfonts.com/*`, (info) => {
    return passthrough();
  }),

  http.get(`${API_URL}users`, ({ request }) => {
    const url = new URL(request.url);
    const groupId = Number(url.searchParams.get('groupId'));
    const search = url.searchParams.get('search');

    const inGroupList = groupId
      ? Object.values(mockIndexedUserList).filter((item) =>
          item.groupIds.includes(groupId)
        )
      : Object.values(mockIndexedUserList);

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

  http.get(`${API_URL}groups`, async () => {
    return HttpResponse.json(
      {
        data: {
          groups: mockMyGroupIDList.map((id) => mockIndexedGroupList[id]),
        },
        pageInfo: {},
      },
      { status: 200 }
    );
  }),

  http.post(`${API_URL}groups`, async ({ request }) => {
    const data = (await request.json()) as { groupId: number };
    const id = Number(data?.groupId);

    if (isNaN(id)) {
      return HttpResponse.json({ data: { message: 'fail' } }, { status: 403 });
    }

    mockMyGroupIDList.push(id);

    return HttpResponse.json({ data: { message: 'success' } }, { status: 201 });
  }),

  http.get(`${API_URL}users`, ({ request }) => {
    const url = new URL(request.url);
    const groupId = Number(url.searchParams.get('groupId'));

    if (isNaN(groupId)) {
      return HttpResponse.json({ data: { message: 'fail' } }, { status: 403 });
    }

    const userIds: number[] = mockIndexedGroupList[groupId]?.userIds ?? [];

    return HttpResponse.json(
      {
        data: userIds.map((id) => mockIndexedGroupList[id]),
        pageInfo: {},
      },
      { status: 200 }
    );
  }),

  http.get(`${API_URL}user`, ({ request }) => {
    const url = new URL(request.url);
    const userId = Number(url.searchParams.get('userId'));

    if (isNaN(userId)) {
      return HttpResponse.json({ data: { message: 'fail' } }, { status: 403 });
    }

    return HttpResponse.json(
      {
        data: mockIndexedUserList[userId],
        pageInfo: {},
      },
      { status: 200 }
    );
  }),

  http.post(`${API_URL}generate-keywords`, async ({ request }) => {
    return HttpResponse.json(
      {
        data: { keywords: ['반가움', '그리움'] },
        pageInfo: {},
      },
      { status: 200 }
    );
  }),

  http.get(`${API_URL}cover`, async ({ request }) => {
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
        data: coverData,
      },
      { status: 200 }
    );
  }),

  http.get(`${API_URL}generate-stickers`, async ({ request }) => {
    await delay(2000);
    return HttpResponse.json(
      {
        code: 'asdf',
      },
      { status: 500 }
    );

    return HttpResponse.json(
      {
        code: 'SUCCESS',
        data: mockStickerData,
      },
      { status: 200 }
    );
  }),

  http.post(`${API_URL}covers`, async ({ request }) => {
    return HttpResponse.json({}, { status: 200 });
  }),

  http.get(`${API_URL}events`, async ({ request }) => {
    const url = new URL(request.url);
    const yearmonth = url.searchParams.get('yearmonth');
    const date = url.searchParams.get('date');

    if (date) {
      return HttpResponse.json(
        {
          data: {
            days: [
              {
                events: mockTodayEventList,
              },
            ],
          },
        },
        { status: 200 }
      );
    }

    await delay(1000);

    let data;

    data = { days: [] };

    const [_, month, day] = yearmonth!.split('-').map((num) => Number(num));

    if (month === 7) {
      data = mockJulyEventList;
    }

    if (month === 8) {
      data = mockAugustEventList;
    }

    if (month === 9) {
      data = mockSeptemberEventListData;
    }

    if (month === 10) {
      data = mockOctoberEventList;
    }

    const today = new Date();
    const dateTime = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    data.days.push({
      date: dateTime,
      events: mockTodayEventList,
    });

    return HttpResponse.json(
      {
        data,
        pageInfo: {},
      },
      { status: 200 }
    );
  }),

  http.get(
    `${API_URL}rollingpapers`,

    async ({ request }) => {
      const url = new URL(request.url);
      const cursor = Number(url.searchParams.get('cursor')) ?? 0;

      await delay(1000);

      // cursorPageInfo: {
      //   nextCursorId: number;
      //   numberOfElements: number;
      //   hasNext: number;
      // }
      if (cursor == 3) {
        return HttpResponse.json(
          {
            data: {
              contents: mockMyMessageList.slice(4),
              cursorPageInfo: {
                numberOfElements: 32,
                hasNext: false,
              },
            },
          },
          { status: 200 }
        );
      }

      return HttpResponse.json(
        {
          data: {
            contents: mockMyMessageList,
            cursorPageInfo: {
              nextCursorId: cursor + 1,
              numberOfElements: 32,
              hasNext: true,
            },
          },
        },
        { status: 200 }
      );
    }
  ),

  http.post(`${API_URL}users/:userId/rollingpapers`, async ({ request }) => {
    await delay(2000);

    return HttpResponse.json({ data: '' }, { status: 200 });
  }),

  http.get(`${API_URL}me`, async ({ request }) => {
    return HttpResponse.json({ data: myInfo }, { status: 200 });
  }),

  http.put(`${API_URL}users`, async ({ request }) => {
    return HttpResponse.json({}, { status: 201 });
  }),

  http.post(`${API_URL}auth/login`, async ({ request }) => {
    return HttpResponse.json({ data: {} }, { status: 200 });
  }),

  http.get(`${API_URL}schools/search`, async ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search');

    const searchedList =
      search && search.length > 0
        ? schools.filter((item) => item.name.includes(search))
        : schools;

    return HttpResponse.json({ data: searchedList }, { status: 200 });
  }),
];
