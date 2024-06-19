import { useNavigate } from 'react-router-dom';

export const useCustomNavigate = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate('/');
  };

  return { goToHomePage };
};
