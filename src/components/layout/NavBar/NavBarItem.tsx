import styled from 'styled-components';

interface Props {
  isSelected: boolean;
  name: string;
  svgSrc: any;
  handleClick: () => void;
}

const NavBarItem = ({ isSelected, name, svgSrc, handleClick }: Props) => {
  console.log(handleClick);
  return (
    <Container onClick={handleClick}>
      <Icon src={svgSrc} />
      <Text $isSelected={isSelected}>{name}</Text>
    </Container>
  );
};

export default NavBarItem;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 50px;
  height: 50px;
  border-radius: 25px;

  background-color: none;
`;

const Icon = styled.img`
  width: 0;
  height: 0;
`;

const Text = styled.div<{ $isSelected: boolean }>`
  color: ${({ $isSelected }) => ($isSelected ? 'black' : 'gray')};
`;
