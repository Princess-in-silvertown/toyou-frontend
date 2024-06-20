import HomePage from '@pages/HomePage';
import MyPage from '@pages/MyPage';
import { RouteObject } from 'react-router-dom';

export const routeObject: RouteObject[] = [
  {
    path: 'home',
    element: <HomePage />,
  },
  {
    path: 'me',
    element: <MyPage />,
  },
];
