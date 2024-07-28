import styled from 'styled-components';
import logo from '@assets/logo/header.svg';
import { useCustomNavigate } from '@/routers/useCustomNavigate';

const Header = () => {
  const { goToHomePage } = useCustomNavigate();

  return (
    <Container>
      <Logo src={logo} onClick={goToHomePage} />
    </Container>
  );
};

export default Header;

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  padding: 0 25px;

  height: 55px;
`;

const Logo = styled.img`
  color: lightgray;

  width: 64px;
  height: 26px;

  cursor: pointer;
`;
