import { useCustomNavigate } from '@/routers/useCustomNavigate';
import {
  HOME_PAGE,
  MY_CALENDER_PAGE,
  MY_MESSAGES_PAGE,
  NAVIGATE_INFO,
} from '@constants/page';
import { useState } from 'react';
import Message from '@assets/iconComponents/Message';
import Home from '@assets/iconComponents/Home';
import Calender from '@assets/iconComponents/Calender';

export const useNavigateBar = () => {
  const startPage = getCurrentPage();

  const [currentPage, setCurrentPage] = useState(startPage);
  const { goToHomePage, goToMyCalender, goToMyMessages } = useCustomNavigate();

  const handleClickHomePageButton = () => {
    setCurrentPage(HOME_PAGE.value);
    goToHomePage();
  };

  const handleClickMyMessagesButton = () => {
    setCurrentPage(MY_MESSAGES_PAGE.value);
    goToMyMessages();
  };

  const handleClickMyCalenderButton = () => {
    setCurrentPage(MY_CALENDER_PAGE.value);
    goToMyCalender();
  };

  const clickHandlers = {
    [HOME_PAGE.value]: handleClickHomePageButton,
    [MY_MESSAGES_PAGE.value]: handleClickMyMessagesButton,
    [MY_CALENDER_PAGE.value]: handleClickMyCalenderButton,
  };

  const icons = {
    [HOME_PAGE.value]: Home,
    [MY_MESSAGES_PAGE.value]: Message,
    [MY_CALENDER_PAGE.value]: Calender,
  };

  const navigationInfo = NAVIGATE_INFO.map((item) => ({
    ...item,
    svg: icons[item.value],
    handleClick: () => {
      clickHandlers[item.value]();
    },
  }));

  return { currentPage, navigationInfo };
};

export const getCurrentPage = () => {
  const path = window.location.pathname;
  if (path === '/') return '';

  const page = path.split('/')[1];
  const totalPage = NAVIGATE_INFO.map((page) => String(page.value));

  if (!totalPage.includes(page)) return;

  return page;
};
