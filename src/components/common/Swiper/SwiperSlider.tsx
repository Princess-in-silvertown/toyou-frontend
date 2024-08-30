import styled from 'styled-components';

interface Props extends React.PropsWithChildren {
  $width?: number;
  $gap?: number;
}

const SwiperSlider = ({ $width, $gap, children }: Props) => {
  return (
    <Container $width={$width ? `${$width}px` : '100%'}>{children}</Container>
  );
};

export default SwiperSlider;

const Container = styled.li<{ $width: string }>`
  flex: 0 0 ${({ $width }) => $width};

  width: ${({ $width }) => $width};
`;
