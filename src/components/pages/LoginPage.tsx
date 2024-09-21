import kakaoIcon from '@assets/image/kakao.png';
import logo from '@assets/logo/big_logo.png';
import { useCustomNavigate } from '@/routers/useCustomNavigate';
import styled from 'styled-components';

const LoginPage = () => {
  const { goToHomePage } = useCustomNavigate();

  const handleClickLoginButton = () => {
    window.location.href =
      process.env.NODE_ENV === 'development'
        ? '/oauth/kakao/redirection?code=test'
        : '/server...';
  };

  return (
    <LoginContainer>
      <Logo src={logo} />
      <LoginButton onClick={handleClickLoginButton}>
        <LoginButtonIcon src={kakaoIcon} />
        <LoginButtonText>카카오로 시작하기</LoginButtonText>
      </LoginButton>
    </LoginContainer>
  );
};

export default LoginPage;

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 50px;

  height: calc(100vh - 150px);
  padding: 0 25px;

  overflow-y: hidden;
`;

const Logo = styled.img`
  width: 195px;
  height: 85px;

  cursor: pointer;
`;

const LoginBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  width: 100%;
  height: 60px;
  border-radius: 7px;

  background: #fee500;

  cursor: pointer;
`;

const LoginButtonIcon = styled.img`
  width: 30px;
  height: 30px;
`;

const LoginButtonText = styled.div`
  font-size: 18px;
`;
