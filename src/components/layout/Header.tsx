import styled from 'styled-components';
import logo from '@assets/logo/header.svg';
import { useCustomNavigate } from '@/routers/useCustomNavigate';

const Header = () => {
  const { goToHomePage } = useCustomNavigate();

  return (
    <Container>
      <Logo onClick={goToHomePage}>Toyou</Logo>
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

const Logo = styled.div`
  font-size: 14px;
  line-height: 16.71px;
  letter-spacing: -0.02em;

  cursor: pointer;
`;
