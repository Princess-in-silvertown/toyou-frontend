import {
  HOME_PAGE,
  MY_CALENDER_PAGE,
  MY_MESSAGES_PAGE,
  MY_PAGE,
  SEARCHING_USER_PAGE,
  USER_PROFILE_PAGE,
} from '@constants/page';
import HomePage from '@components/pages/HomePage';
import MyPage from '@components/pages/MyPage';
import SearchingUserPage from '@components/pages/SearchingUserPage';
import UserProfilePage from '@components/pages/UserProfilePage';
import { RouteObject } from 'react-router-dom';
import MyMessagesPages from '@components/pages/MyMessagesPages';
import MyCalender from '@components/pages/MyCalender';

export const routeObject: RouteObject[] = [
  {
    path: HOME_PAGE.path,
    element: <HomePage />,
  },
  {
    path: MY_PAGE.path,
    element: <MyPage />,
  },
  {
    path: MY_CALENDER_PAGE.path,
    element: <MyCalender />,
  },
  {
    path: MY_MESSAGES_PAGE.path,
    element: <MyMessagesPages />,
  },
  {
    path: SEARCHING_USER_PAGE.path,
    element: <SearchingUserPage />,
  },
  {
    path: USER_PROFILE_PAGE.path,
    element: <UserProfilePage />,
  },
];
