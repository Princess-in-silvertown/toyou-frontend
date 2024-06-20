import HOME_SVG from '@assets/exclamation.svg';
import MY_SVG from '@assets/exclamation.svg';

export const HOME_PAGE = {
  path: '/',
  value: '',
  name: '홈',
  svg: HOME_SVG,
} as const;

export const MY_PAGE = {
  path: '/me',
  value: 'me',
  name: '마이',
  svg: MY_SVG,
} as const;

export const NAVIGATE_INFO = [HOME_PAGE, MY_PAGE] as const;
