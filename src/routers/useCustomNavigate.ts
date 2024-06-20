import { useNavigate } from 'react-router-dom';

export const useCustomNavigate = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate('/');
  };

  const goToMyPage = () => {
    navigate('/me');
  };

  return { goToHomePage, goToMyPage };
};
