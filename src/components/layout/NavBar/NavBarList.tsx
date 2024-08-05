import styled from 'styled-components';
import NavBarItem from './NavBarItem';
import { useNavigateBar } from '@hooks/useNavigateBar';

import home from '@assets/icons/home.svg';

const NavBarList = () => {
  const { currentPage, navigationInfo } = useNavigateBar();

  return (
    <Container>
      {navigationInfo.map((page) => {
        const { value, name, svg, handleClick } = page;
        const isSelected = currentPage == page.value;

        return (
          <NavBarItem
            key={value}
            name={name}
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
  padding: 0 40px;
  border-radius: 20px 20px 0 0;
  box-sizing: border-box;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.11);

  background-color: #fcfcfc;
`;

const test = styled(home)``;
