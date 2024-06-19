import { useGroupList } from '@/hooks/queries/useGroupList';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Root = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Root;
