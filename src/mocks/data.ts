import sticker from '@assets/image/birthday_sticker.svg';
import cover from '@assets/image/happy_birthday.svg';
import yellowCover from '@assets/image/birthday_small_yellow.svg';
import redCover from '@assets/image/birthday_small_red.svg';
import blueCover from '@assets/image/birthday_small_blue.svg';
import greenCover from '@assets/image/birthday_small_green.svg';
import H from '@assets/image/H.jpeg';
import { Event } from '@/types/event';
import { RollingPapers } from '@/types/paper';

export const API_URL = process.env.API_URL;

export const mockIndexedGroupList: Record<number, any> = {
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

export const mockIndexedUserList: Record<number, any> = {
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

export var mockMyGroupIDList: number[] = [1, 2, 3];

export var mockStickerData = [
  ...new Array(5).fill({ imgUrl: sticker }),
  {
    imgUrl: 'https://media.tenor.com/ar6xI838JiEAAAAi/cat-meme-cat.gif',
  },
  {
    imgUrl:
      'https://i.namu.wiki/i/016r0DjGVQ3em4bhgYxGZJ7VI2y30qFt6KfItWLYFREHNxPl1KBaGY60tXGr9K5qFsgE-U3BHtw5UVbeaWTWwg.gif',
  },
  {
    imgUrl:
      'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1nT8l0.img?w=373&h=359&m=6',
  },
];

export var mockTodayEventList: Event[] = [
  {
    id: 6,
    name: '오늘',
    eventType: '',
    description: '오늘의 이벤트입니다.',
    profileImageUrl: H,
  },
  {
    id: 3,
    name: '송효섭',
    eventType: '',
    description: '오늘 생일입니다.',
    profileImageUrl: sticker,
  },
];

export const mockMyMessageList: RollingPapers = {
  letters: [
    {
      themeId: 1,
      title: '효섭',
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
      title: '귀여운효섭',
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
      title: '시크한 효섭',
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
      title: '새침한 효섭에게',
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
      title: '반가운 효섭에게',
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
      title: '남자다운 효섭에게',
      name: '송효섭',
      coverImageUrl: blueCover,
      content: '안녕 효섭아 반가워',
      stickers: [],
    },

    {
      themeId: 0,
      profileImageUrl: H,
      title: '분홍빛 효섭에게',
      name: '송효섭',
      coverImageUrl: yellowCover,
      content: '테스트',
      stickers: [],
    },

    {
      themeId: 3,
      profileImageUrl: H,
      title: '시크한 효섭에게',
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
      title: '시크한 효섭에게',
      name: '송효섭',
      coverImageUrl: yellowCover,
      content: '안녕',
      stickers: [],
    },
  ],
};

export const mockJulyEventList = {
  days: [
    {
      date: '2024-07-30',
      events: [
        {
          id: 6,
          name: '이미지 에러 테스트',
          eventType: '',
          description: '깨짐.',
          profileImageUrl: 'error',
        },
        {
          id: 2,
          name: '이미지 깨짐',
          eventType: '',
          description: '깨짐.',
          profileImageUrl: sticker,
        },
      ],
    },
    {
      date: '2024-07-04',
      events: [
        {
          id: 6,
          name: '테스트 효섭',
          eventType: '',
          description: '테스트.',
          profileImageUrl: H,
        },
      ],
    },
  ],
};

export const mockAugustEventList = {
  days: [
    {
      date: '2024-08-30',
      events: [
        {
          id: 6,
          name: '이미지 깨짐',
          eventType: '',
          description: '깨짐.',
          profileImageUrl: 'error',
        },
      ],
    },
  ],
};

export const mockSeptemberEventListData = {
  days: [
    {
      date: '2024-09-11',
      events: [
        {
          id: 22,
          name: '트루효섭',
          eventType: '',
          description: '오늘 생일입니다.',
          profileImageUrl: H,
        },
        {
          id: 1,
          name: '시크효섭',
          eventType: '',
          description: '오늘 생일입니다.',
          profileImageUrl:
            'https://mblogthumb-phinf.pstatic.net/MjAyMTA0MzBfMjMg/MDAxNjE5NzY2MDc3Njc1.QTn3NuadrIe8IarOOZAN61-7C06Ce_E1693wilcYrLMg.b4cO2kVaUx0wD9BGXQ5ux7DjT-e6qW8fXQT23Hjc6vQg.JPEG.paran-paran/%EC%9E%A5%EB%8F%99%EA%B1%B4_10.jpg?type=w800',
        },
        {
          id: 2,
          name: '댄디효섭',
          eventType: '',
          description: '오늘 생일입니다.',
          profileImageUrl:
            'https://i.namu.wiki/i/bCmE_8XrnEYeEKlbme2ZS8rsG6dcB1vGD-UJtxvGncvXuYL9fiBqL8Fk_6cQ58EKJYTyyw9mA0LWK3yIaRYQow.webp',
        },
        {
          id: 12,
          name: '앙칼진효섭',
          eventType: '',
          description: '오늘 생일입니다.',
          profileImageUrl:
            'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg',
        },
        {
          id: 142,
          name: '앙칼진효섭',
          eventType: '',
          description: '오늘 생일입니다.',
          profileImageUrl:
            'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg',
        },
        {
          id: 122,
          name: '앙칼진효섭',
          eventType: '',
          description: '오늘 생일입니다.',
          profileImageUrl:
            'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg',
        },
        {
          id: 1222,
          name: '앙칼진효섭',
          eventType: '',
          description: '오늘 생일입니다.',
          profileImageUrl:
            'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg',
        },
      ],
    },

    {
      date: '2024-09-24',
      events: [
        {
          id: 3,
          name: '간지효섭',
          eventType: '',
          description: '오늘 생일입니다.',
          profileImageUrl:
            'https://i.namu.wiki/i/xifChGswbLh8qg2qQyJADGr-9IKZ4DES71zkmTs5sN-zMpZQq60trPR2XR9gr7kjMjsDX1y5zE6EAL0nWruGkg.webp',
        },
      ],
    },

    {
      date: '2024-09-05',
      events: [
        {
          id: 4,
          name: '최애의 효섭',
          eventType: '',
          description: '오늘 생일입니다.',
          profileImageUrl:
            'https://i.namu.wiki/i/kDxN8Y1I3QnwN_7WmesRlM5L-p54NzRD1fCxyKAm5JB0NsE2Kg562c5gfGH6vKIB0LQIVrMaehxTxwlDVa91cA.webp',
        },
      ],
    },
  ],
};

export const mockOctoberEventList = {
  days: [
    {
      date: '2024-10-02',
      events: [
        {
          id: 4,
          name: '최애의 효섭',
          eventType: '',
          description: '콘서트 당일입니다.',
          profileImageUrl:
            'https://i.namu.wiki/i/kDxN8Y1I3QnwN_7WmesRlM5L-p54NzRD1fCxyKAm5JB0NsE2Kg562c5gfGH6vKIB0LQIVrMaehxTxwlDVa91cA.webp',
        },
      ],
    },
  ],
};

export const coverData = { imgUrl: cover };

export const schools = {
  schools: [
    {
      id: 1,
      name: '경희대학교',
      address: '',
      homepageUrl: '',
    },
    {
      id: 2,
      name: '경희고등학교',
      address: '',
      homepageUrl: '',
    },
    {
      id: 3,
      name: '경희중학교',
      address: '',
      homepageUrl: '',
    },
    {
      id: 4,
      name: '경희초등학교',
      address: '',
      homepageUrl: '',
    },
    {
      id: 5,
      name: '효섭이와함께춤을',
      address: '',
      homepageUrl: '',
    },
  ],
};

export const myInfo = {
  id: 1,
  name: '효섭',
  imageUrl: H,
  groups: [
    { id: 1, name: '경희대학교' },
    { id: 2, name: '경희고등학교' },
  ],
};
