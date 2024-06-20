import { useCustomNavigate } from '@/routers/useCustomNavigate';
import { HOME_PAGE, MY_PAGE, NAVIGATE_INFO } from '@constants/page';
import { useState } from 'react';

export const useNavigateBar = () => {
  const startPage = getCurrentPage();

  const [currentPage, setCurrentPage] = useState(startPage);
  const { goToHomePage, goToMyPage } = useCustomNavigate();

  const handleClickHomePageButton = () => {
    setCurrentPage(HOME_PAGE.value);
    goToHomePage();
  };

  const handleClickMyPageButton = () => {
    setCurrentPage(MY_PAGE.value);
    goToMyPage();
  };

  const clickHandlers = {
    [HOME_PAGE.value]: handleClickHomePageButton,
    [MY_PAGE.value]: handleClickMyPageButton,
  };

  const navigationInfoWithHandlers = NAVIGATE_INFO.map((item) => ({
    ...item,
    handleClick: () => {
      clickHandlers[item.value]();
    },
  }));

  return { currentPage, navigationInfoWithHandlers };
};

export const getCurrentPage = () => {
  const path = window.location.pathname;
  if (path === '/') return '';

  const page = path.split('/')[1];
  const totalPage = NAVIGATE_INFO.map((page) => String(page.value));

  if (!totalPage.includes(page)) return;

  return page;
};
