import styled from 'styled-components';
import NavBarItem from './NavBarItem';
import { useNavigateBar } from '@hooks/useNavigateBar';

const NavBarList = () => {
  const { currentPage, navigationInfoWithHandlers } = useNavigateBar();

  return (
    <Nav>
      <Container>
        {navigationInfoWithHandlers.map((page) => {
          const { value, name, svg, handleClick } = page;
          const isSelected = currentPage == page.value;

          return (
            <NavBarItem
              key={value}
              name={name}
              svgSrc={svg}
              isSelected={isSelected}
              handleClick={handleClick}
            />
          );
        })}
      </Container>
    </Nav>
  );
};

export default NavBarList;

const Nav = styled.nav`
  position: absolute;
  left: 50%;
  bottom: 5vh;
  transform: translate(-50%, -50%);
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;

  width: 180px;
  height: 70px;
  padding: 0 15px;
  border-radius: 35px;
  background-color: lightgray;
`;
