import {
  HOME_PAGE,
  MY_PAGE,
  SEARCHING_USER_PAGE,
  USER_PROFILE_PAGE,
} from '@constants/page';
import { useNavigate } from 'react-router-dom';

export const useCustomNavigate = () => {
  const navigate = useNavigate();

  const goToBack = () => {
    navigate(-1);
  };

  const goToHomePage = () => {
    navigate(`/${HOME_PAGE.value}`);
  };

  const goToMyPage = () => {
    navigate(`/${MY_PAGE.value}`);
  };

  const goToSearchingUserPage = (groupId: number) => {
    navigate(`/${SEARCHING_USER_PAGE.value}/${groupId}`);
  };

  const goToUserProfilePage = (userId: number) => {
    navigate(`/${USER_PROFILE_PAGE.value}/${userId}`);
  };

  return {
    goToBack,
    goToHomePage,
    goToMyPage,
    goToSearchingUserPage,
    goToUserProfilePage,
  };
};
