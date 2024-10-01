import { CardTheme } from '@/types/card';
import flower from '@assets/image/cover/flower.svg';
import ddabong from '@assets/image/cover/ddabong.svg';
import hello from '@assets/image/cover/hello.svg';
import hug from '@assets/image/cover/hug.svg';
import birthday from '@assets/image/cover/birthday.svg';

import birthday_bigheart from '@assets/image/cover/happy_birthday_bigheart.png';
import birthday_cake from '@assets/image/cover/happy_birthday_cake.png';
import birthday_flower from '@assets/image/cover/happy_birthday_flower.png';
import birthday_heart from '@assets/image/cover/happy_birthday_heart.png';
import birthday_letter from '@assets/image/cover/happy_birthday_letter.png';
import birthday_present from '@assets/image/cover/happy_birthday_present.png';

import youcan_bigheart from '@assets/image/cover/youcan_bigeheart.png';
import youcan_fighting from '@assets/image/cover/youcan_fighting.png';
import youcan_heart from '@assets/image/cover/youcan_heart.png';
import youcan_letter from '@assets/image/cover/youcan_letter.png';
import youcan_ddabong from '@assets/image/cover/youcan_ddabong.png';

import thanks_bigheart from '@assets/image/cover/thanks_bigheart.png';
import thanks_flower from '@assets/image/cover/thanks_flower.png';
import thanks_heart from '@assets/image/cover/thanks_heart.png';
import thanks_letter from '@assets/image/cover/thanks_letter.png';
import thanks_ddabong from '@assets/image/cover/thanks_ddabong.png';

import cheer_bigheart from '@assets/image/cover/cheer_bigheart.png';
import cheer_fighting from '@assets/image/cover/cheer_fighting.png';
import cheer_flower from '@assets/image/cover/cheer_flower.png';
import cheer_heart from '@assets/image/cover/cheer_heart.png';
import cheer_letter from '@assets/image/cover/cheer_letter.png';
import cheer_ddabong from '@assets/image/cover/cheer_ddabong.png';
import cheer_normal from '@assets/image/cover/cheer_normal.png';

export const COLORS = [
  { name: 'yellow', R: 255, G: 234, B: 76, A: 1, code: '#FFEA4C' },
  { name: 'red', R: 242, G: 36, B: 22, A: 0.9, code: '#F22416' },
  { name: 'blue', R: 85, G: 0, B: 255, A: 0.8, code: '#5500FF' },
  { name: 'green', R: 47, G: 223, B: 156, A: 0.8, code: '#2FDF9C' },
] as const;

export const SUB_COLORS = [
  { name: 'red', R: 242, G: 36, B: 22, A: 0.7 },
  { name: 'purple', R: 169, G: 22, B: 242, A: 0.7 },
  { name: 'deepPurple', R: 62, G: 15, B: 120, A: 0.7 },
  { name: 'green', R: 77, G: 242, B: 22, A: 0.7 },
] as const;

export const MESSAGES = [
  '생일 축하해',
  '정말 고마워',
  '너를 응원해',
  '힘내, 할수있어',
] as const;

export const YELLOW_COVER_IMAGES = [
  { name: '생일 축하해', url: birthday_heart },
  { name: '마음이 전해지길', url: birthday_bigheart },
  { name: '태어나 줘서 고마워', url: birthday_cake },
  { name: '꽃처럼 빛나는 날', url: birthday_flower },
  { name: '선물은 바로 너야', url: birthday_present },
  { name: '내 마음을 너에게', url: birthday_letter },
] as const;

export const RED_COVER_IMAGES = [
  { name: '항상 고마워', url: thanks_heart },
  { name: '언제나 고마운 너에게', url: thanks_bigheart },
  { name: '함께해 줘서 고마워', url: thanks_ddabong },
  { name: '네 소중함을 잊지 않을게', url: thanks_flower },
  { name: '내 마음을 너에게', url: thanks_letter },
] as const;

export const BLUE_COVER_IMAGES = [
  { name: '너를 응원해', url: cheer_normal },
  { name: '네 곁에 있을게', url: cheer_bigheart },
  { name: '넌 충분히 괜찮아', url: cheer_ddabong },
  { name: '포기하지마', url: cheer_fighting },
  { name: '좋은 날이 올 거야', url: cheer_flower },
  { name: '너의 가능성을 믿어', url: cheer_heart },
  { name: '내 마음을 너에게', url: cheer_letter },
] as const;

export const GREEN_COVER_IMAGES = [
  { name: '힘내, 할수있어', url: youcan_fighting },
  { name: '포기하지마', url: youcan_heart },
  { name: '너의 가능성을 믿어', url: youcan_bigheart },
  { name: '나는 너를 믿어', url: youcan_ddabong },
  { name: '내 마음을 너에게', url: youcan_letter },
] as const;

export const CARD_THEME: CardTheme[] = [
  {
    themeId: 0,
    color: COLORS[0],
    subColor: SUB_COLORS[0],
    message: MESSAGES[0],
    coverImageUrl: YELLOW_COVER_IMAGES,
  },

  {
    themeId: 1,
    color: COLORS[1],
    subColor: SUB_COLORS[1],
    message: MESSAGES[1],
    coverImageUrl: RED_COVER_IMAGES,
  },

  {
    themeId: 2,
    color: COLORS[2],
    subColor: SUB_COLORS[2],
    message: MESSAGES[2],
    coverImageUrl: BLUE_COVER_IMAGES,
  },

  {
    themeId: 3,
    color: COLORS[3],
    subColor: SUB_COLORS[3],
    message: MESSAGES[3],
    coverImageUrl: GREEN_COVER_IMAGES,
  },
];
