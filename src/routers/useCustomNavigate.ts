import {
  HOME_PAGE,
  MY_CALENDER_PAGE,
  MY_MESSAGES_PAGE,
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
    navigate(`${HOME_PAGE.path}`);
  };

  const goToMyMessages = () => {
    navigate(`/${MY_MESSAGES_PAGE.path}`);
  };

  const goToMyCalender = () => {
    navigate(`/${MY_CALENDER_PAGE.path}`);
  };

  const goToMyPage = () => {
    navigate(`/${MY_PAGE.path}`);
  };

  const goToSearchingUserPage = (groupId: number) => {
    navigate(`/${SEARCHING_USER_PAGE.path}/${groupId}`);
  };

  const goToUserProfilePage = (userId: number) => {
    navigate(`/${USER_PROFILE_PAGE.path}/${userId}`);
  };

  return {
    goToBack,
    goToHomePage,
    goToMyPage,
    goToMyMessages,
    goToMyCalender,
    goToSearchingUserPage,
    goToUserProfilePage,
  };
};
