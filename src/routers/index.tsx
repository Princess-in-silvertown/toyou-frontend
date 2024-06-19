import Root from '@components/layout/Root';
import { createBrowserRouter } from 'react-router-dom';
import { routerObject } from './routerObject';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: routerObject,
  },
]);
