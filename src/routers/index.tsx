import Root from '@components/layout/Root';
import { createBrowserRouter } from 'react-router-dom';
import { routeObject } from './routeObject';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: routeObject,
  },
]);
