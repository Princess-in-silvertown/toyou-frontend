import styled from 'styled-components';

interface Props extends React.PropsWithChildren {}

const SwiperSlider = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

export default SwiperSlider;

const Container = styled.div`
  flex: 0 0 100%;

  width: 100%;

  background-color: #f1f1f1;
  text-align: center;
  line-height: 330px;
  font-size: 24px;
`;
