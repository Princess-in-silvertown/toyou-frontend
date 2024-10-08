export const HOME_PAGE = {
  path: '',
  value: '',
  name: '홈',
} as const;

export const MY_PAGE = {
  path: 'me',
  value: 'me',
  name: '마이',
} as const;

export const MY_MESSAGES_PAGE = {
  path: 'messages/me',
  value: 'messages',
  name: '메시지함',
} as const;

export const MY_CALENDER_PAGE = {
  path: 'calender/me',
  value: 'calender',
  name: '달력',
} as const;

export const SEARCHING_USER_PAGE = {
  path: 'users/:groupId',
  value: 'users',
  name: '찾기/사용자',
} as const;

export const ONBOARDING_PAGE = {
  path: 'onboarding',
  value: 'onboarding',
  name: '온보딩',
} as const;

export const LOGIN_PAGE = {
  path: 'login',
  value: 'login',
  name: '로그인',
} as const;

export const LOGIN_REDIRECTION_PAGE = {
  path: 'oauth/kakao/redirection',
  value: 'redirection',
  name: '리다이렉션',
} as const;

export const MY_INFO_EDIT_PAGE = {
  path: 'my-info/edit',
  value: 'edit-my-info',
  name: '내정보수정',
} as const;

export const USER_PROFILE_PAGE = {
  path: 'user/:userId',
  value: 'user',
  name: '사용자프로필',
} as const;

export const NAVIGATE_INFO = [
  HOME_PAGE,
  MY_CALENDER_PAGE,
  MY_MESSAGES_PAGE,
] as const;
