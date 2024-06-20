import styled from 'styled-components';

const Header = () => {
  return (
    <Container>
      <Logo>header</Logo>
    </Container>
  );
};

export default Header;

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  padding: 0 25px;

  height: 55px;
  border-bottom: 0.5px solid lightgray;
`;

const Logo = styled.div`
  color: lightgray;
  font-size: 18px;
  font-weight: 700;

  cursor: pointer;
`;
