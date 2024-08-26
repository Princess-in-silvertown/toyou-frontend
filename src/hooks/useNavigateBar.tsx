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
  const startPath = getCurrentPath();
  const [currentPath, setCurrentPath] = useState(startPath);

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
    setCurrentPath(getCurrentPath());
  }, [location]);

  return { currentPath, navigationInfo };
};

export const getCurrentPath = () => {
  const path = window.location.pathname;
  const publicPath = process.env.PUBLIC_PATH ?? '/';
  const publicPathDepth = publicPath.split('/').length - 1;

  if (path === publicPath) return '';

  const page = path.split('/')[publicPathDepth];
  const totalPage = NAVIGATE_INFO.map((page) => String(page.value));

  if (!totalPage.includes(page)) return;

  return page;
};
