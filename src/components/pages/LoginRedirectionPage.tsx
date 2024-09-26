import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCustomNavigate } from '@/routers/useCustomNavigate';
import { requestLogin } from '@apis/auth';

const LoginRedirectionPage = () => {
  const location = useLocation();

  const { goToHomePage, goToLoginPage } = useCustomNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      alert('failed login');

      goToLoginPage();
    }

    if (code) {
      requestLogin(code)
        .then(() => {
          goToHomePage();
          const defaultInfo = JSON.stringify({});
          localStorage.setItem('INFO', defaultInfo);
        })
        .catch(() => {
          alert('failed login');
          goToLoginPage();
        });
    }
  }, [location]);

  return <></>;
};

export default LoginRedirectionPage;
