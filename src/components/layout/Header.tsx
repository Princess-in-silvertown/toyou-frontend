import styled from 'styled-components';
import logo from '@assets/logo/small_logo.png';
import { useCustomNavigate } from '@/routers/useCustomNavigate';
import { useMyInfo } from '@hooks/queries/useMyInfo';
import { useEffect } from 'react';

const Header = () => {
  const { goToHomePage, goToEditMyInfo, goToMyPage } = useCustomNavigate();

  const { data, isRefetching } = useMyInfo();

  useEffect(() => {
    if (isRefetching) return;

    if (data && (!data.groups || data.groups?.length === 0)) {
      goToEditMyInfo();

      return;
    }
  }, [data, isRefetching]);

  return (
    <Container>
      <Logo src={logo} onClick={goToHomePage} />
      <Profile src={data?.imageUrl} onClick={goToMyPage} />
    </Container>
  );
};

export default Header;

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  box-sizing: border-box;
  padding: 0 25px;

  width: 100%;
  height: 55px;
`;

const Logo = styled.img`
  width: 43px;
  height: 18.78px;

  cursor: pointer;
`;

const Profile = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;

  cursor: pointer;
`;
