import { useCustomNavigate } from '@/routers/useCustomNavigate';
import {
  HOME_PAGE,
  MY_CALENDER_PAGE,
  MY_MESSAGES_PAGE,
  NAVIGATE_INFO,
} from '@constants/page';
import { useEffect, useState } from 'react';
import Message from '@assets/iconComponents/Message';
import Home from '@assets/iconComponents/Home';
import Calender from '@assets/iconComponents/Calender';
import { useTodayEvent } from './queries/useTodayEvent';
import { useLocation } from 'react-router-dom';

export const useNavigateBar = () => {
  const location = useLocation();
  const startPage = getCurrentPage();
  const [currentPage, setCurrentPage] = useState(startPage);

  const { goToHomePage, goToMyCalender, goToMyMessages } = useCustomNavigate();

  const { data } = useTodayEvent();

  const handleClickHomePageButton = () => {
    goToHomePage();
  };

  const handleClickMyMessagesButton = () => {
    goToMyMessages();
  };

  const handleClickMyCalenderButton = () => {
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

  const eventCount = {
    [HOME_PAGE.value]: 0,
    [MY_MESSAGES_PAGE.value]: 0,
    [MY_CALENDER_PAGE.value]: data?.length ?? 0,
  };

  const navigationInfo = NAVIGATE_INFO.map((item) => ({
    ...item,
    eventCount: eventCount[item.value],
    svg: icons[item.value],
    handleClick: () => {
      clickHandlers[item.value]();
    },
  }));

  useEffect(() => {
    setCurrentPage(getCurrentPage());
  }, [location]);

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
