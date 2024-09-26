import {
  HOME_PAGE,
  LOGIN_PAGE,
  LOGIN_REDIRECTION_PAGE,
  MY_CALENDER_PAGE,
  MY_INFO_EDIT_PAGE,
  MY_MESSAGES_PAGE,
  MY_PAGE,
  ONBOARDING_PAGE,
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
import OnBoardingPage from '@components/pages/OnBoardingPage';
import { NavBar } from '@components/layout/NavBar';
import EditMyInfoPage from '@components/pages/EditMyInfoPage';
import LoginRedirectionPage from '@components/pages/LoginRedirectionPage';
import LoginPage from '@components/pages/LoginPage';
import WithAuth from '@components/auth/WithAuth';
import Root from '@components/layout/Root';
import Header from '@components/layout/Header';
import { Suspense } from 'react';

export const routeObject: RouteObject[] = [
  {
    path: HOME_PAGE.path,
    element: (
      <>
        <WithAuth>
          <Header />
          <HomePage />
          <NavBar />
        </WithAuth>
      </>
    ),
  },
  {
    path: MY_PAGE.path,
    element: <MyPage />,
  },
  {
    path: MY_CALENDER_PAGE.path,
    element: (
      <WithAuth>
        <Header />
        <MyCalender />
        <NavBar />
      </WithAuth>
    ),
  },
  {
    path: MY_MESSAGES_PAGE.path,
    element: (
      <WithAuth>
        <Header />
        <MyMessagesPages />
        <NavBar />
      </WithAuth>
    ),
  },
  {
    path: SEARCHING_USER_PAGE.path,
    element: <SearchingUserPage />,
  },
  {
    path: USER_PROFILE_PAGE.path,
    element: <UserProfilePage />,
  },
  {
    path: ONBOARDING_PAGE.path,
    element: <OnBoardingPage />,
  },
  {
    path: MY_INFO_EDIT_PAGE.path,
    element: (
      <Suspense>
        <EditMyInfoPage />
      </Suspense>
    ),
  },
  {
    path: LOGIN_REDIRECTION_PAGE.path,
    element: <LoginRedirectionPage />,
  },
  {
    path: LOGIN_PAGE.path,
    element: <LoginPage />,
  },
];
