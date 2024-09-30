import styled from 'styled-components';
import Message from '@assets/iconComponents/Message';
import Home from '@assets/iconComponents/Home';
import Calender from '@assets/iconComponents/Calender';
import {
  HOME_PAGE,
  MY_CALENDER_PAGE,
  MY_MESSAGES_PAGE,
  NAVIGATE_INFO,
} from '@constants/page';
import { useTodayEvent } from '@hooks/queries/useTodayEvent';
import NavBarItem from './NavBarItem';
import { KEYS } from '@constants/modal';

interface Props {
  closeModal: (key?: string, time?: number) => void;
  goToHomePage: () => void;
  goToCalenderPage: () => void;
}

const NavBarList = ({ closeModal, goToCalenderPage, goToHomePage }: Props) => {
  const { data } = useTodayEvent();

  const handleClickHomePageButton = () => {
    closeModal(KEYS.PAPER_DETAIL, 0);

    setTimeout(() => goToHomePage(), 0);
  };

  const handleClickMyMessagesButton = () => {
    closeModal();
  };

  const handleClickMyCalenderButton = () => {
    closeModal(KEYS.PAPER_DETAIL, 0);

    setTimeout(() => goToCalenderPage(), 0);
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

  return (
    <Container>
      {navigationInfo.map((page) => {
        const { value, name, eventCount, svg, handleClick } = page;
        const isSelected = MY_MESSAGES_PAGE.value === value;

        return (
          <NavBarItem
            key={value}
            name={name}
            eventCount={eventCount}
            svg={svg}
            isSelected={isSelected}
            handleClick={handleClick}
          />
        );
      })}
    </Container>
  );
};

export default NavBarList;

const Container = styled.nav`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;

  width: 100%;
  height: 86px;
  max-width: 500px;
  padding: 0 40px;
  border-radius: 20px 20px 0 0;
  box-sizing: border-box;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.11);

  background-color: #fcfcfc;
`;
