import { CardTheme } from '@/types/card';

export const COLORS = [
  { name: 'yellow', R: 255, G: 234, B: 76, A: 1 },
  { name: 'red', R: 242, G: 36, B: 22, A: 0.9 },
  { name: 'blue', R: 85, G: 0, B: 255, A: 0.8 },
  { name: 'green', R: 47, G: 223, B: 156, A: 0.8 },
] as const;

export const SUB_COLORS = [
  { name: 'red', R: 242, G: 36, B: 22, A: 0.7 },
  { name: 'purple', R: 169, G: 22, B: 242, A: 0.7 },
  { name: 'deepPurple', R: 62, G: 15, B: 120, A: 0.7 },
  { name: 'green', R: 77, G: 242, B: 22, A: 0.7 },
] as const;

export const MESSAGES = [
  '생일 축하해 카드',
  '정말 고마워 카드',
  '너를 응원해 카드',
  '힘내, 할수있어 카드',
] as const;

export const CARD_THEME: CardTheme[] = [
  {
    themeId: 0,
    color: COLORS[0],
    subColor: SUB_COLORS[0],
    message: MESSAGES[0],
  },

  {
    themeId: 1,
    color: COLORS[1],
    subColor: SUB_COLORS[1],
    message: MESSAGES[1],
  },

  {
    themeId: 2,
    color: COLORS[2],
    subColor: SUB_COLORS[2],
    message: MESSAGES[2],
  },

  {
    themeId: 3,
    color: COLORS[3],
    subColor: SUB_COLORS[3],
    message: MESSAGES[3],
  },
];