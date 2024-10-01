import { useGetCardSticker } from '@hooks/queries/useCardSticker';
import { useViewportHeight } from '@hooks/useViewportHeight';
import { useEffect, useRef, useState } from 'react';
import styled, { CSSProperties, keyframes } from 'styled-components';

interface Props {
  color: string;
  keywords: string[];
  cardSide: 'BACK' | 'FRONT';
  closeModal: () => void;
  onAddSticker: (imgUrl: string, side: 'BACK' | 'FRONT') => void;
}

interface GifProps {
  src: string;
  style: CSSProperties;
}

const LazyGif = ({ src, style }: GifProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLImageElement>(null!);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    });
    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref}>
      {!isVisible ? (
        <div style={style} />
      ) : (
        <img style={style} src={src} alt="gif" />
      )}
    </div>
  );
};

const StickerSelectList = ({
  color,
  keywords,
  cardSide,
  closeModal,
  onAddSticker,
}: Props) => {
  const { data, isError, isLoading, isFetched } = useGetCardSticker(
    keywords,
    color
  );

  const viewportHeight = useViewportHeight() ?? 0;

  const selectSticker = (imgUrl: string) => {
    onAddSticker(imgUrl, cardSide);

    closeModal();
  };

  return (
    <Container>
      <StickerList
        style={{ height: `${Math.max(viewportHeight - 340, 350)}px` }}
      >
        {isLoading && (
          <StatusContainer>
            <Spinner />
          </StatusContainer>
        )}
        {isError && (
          <StatusContainer>
            <ErrorText>스티커를 생성하지 못했어요</ErrorText>
          </StatusContainer>
        )}
        {data?.map((sticker, index) => (
          <StickerItem key={index} onClick={() => selectSticker(sticker)}>
            <LazyGif
              style={{
                width: '200px',
                height: 'fit-contents',
                margin: '0 auto',
              }}
              src={sticker}
            />
          </StickerItem>
        ))}
      </StickerList>
    </Container>
  );

  //   width: 200px;
  // height: fit-content;
  // margin: 0 auto;
};

export default StickerSelectList;

const Container = styled.div`
  position: relative;

  height: fit-content;
`;

const StickerList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
  gap: 20px;

  width: 100%;
  padding-bottom: 30px;
  box-sizing: border-box;

  overflow-y: auto;
`;

const StickerItem = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;

  width: 213px;
  height: 106px;
  border-radius: 9px;

  background-color: white;
  margin: 0 auto;

  overflow-y: hidden;
`;

const StickerImage = styled.img`
  width: 200px;
  height: fit-content;
  margin: 0 auto;
`;

const StatusContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-shrink: 0;
  flex-grow: 0;

  height: 80px;
  width: 100%;
`;
const ErrorText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;

  color: white;
`;

const spin = keyframes`
  from {
    transform: rotate(0deg); 
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 21px;
  height: 21px;
  border: 2px solid ${({ theme }) => theme.color.red500};
  border-top: 2px solid ${({ theme }) => theme.color.gray300};
  border-radius: 50%;

  animation: ${spin} 1s linear infinite;
`;
