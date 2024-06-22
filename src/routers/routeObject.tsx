import {
  HOME_PAGE,
  MY_PAGE,
  SEARCHING_USER_PAGE,
  USER_PROFILE_PAGE,
} from '@constants/page';
import HomePage from '@pages/HomePage';
import MyPage from '@pages/MyPage';
import SearchingUserPage from '@pages/SearchingUserPage';
import UserProfilePage from '@pages/UserProfilePage';
import { RouteObject } from 'react-router-dom';

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
    path: SEARCHING_USER_PAGE.path,
    element: <SearchingUserPage />,
  },
  {
    path: USER_PROFILE_PAGE.path,
    element: <UserProfilePage />,
  },
];
