import styled from 'styled-components';
import Sticker from './Sticker';
import { useContext, useState } from 'react';
import {
  messageFormContext,
  messageFormDispatchContext,
} from '@/contexts/states/messageFormContext';
import { modalDispatchContext } from '@/contexts/states/modalContext';
import StickerSelectModalContents from './StickerSelectModal/StickerSelectModalContents';
import { KEYS } from '@constants/modal';
import ModalContainer from './StickerSelectModal/ModalContainer';
import addIcon from '@assets/icons/add-sticker.svg';
import stickerIcon from '@assets/icons/sticker.svg';

interface Props {
  side: 'back' | 'front';
}

const StickerList = ({ side }: Props) => {
  const { stickers } = useContext(messageFormContext);
  const { handleDeleteSticker, handleChangeSticker, handleAddSticker } =
    useContext(messageFormDispatchContext);

  const { handleOpen, handleClose } = useContext(modalDispatchContext);

  const [isStickerButtonEnable, setIsStickerButtonEnable] = useState(true);

  const showStickerButton = () => {
    setIsStickerButtonEnable(true);
  };

  const hiddenStickerButton = () => {
    setIsStickerButtonEnable(false);
  };

  const handleClickStickerEditButton = () => {
    handleOpen(
      KEYS.STICKER_EDIT,
      <StickerSelectModalContents
        cardSide={side}
        closeModal={handleClose}
        onAddSticker={handleAddSticker}
      />,
      ModalContainer
    );
  };

  return (
    <Container>
      {[...stickers.values()].map((sticker) => {
        const { key, x, y, imgUrl, rotate, scale } = sticker;

        if (!side || side == sticker.side) {
          return (
            <Sticker
              key={key}
              id={key}
              imgUrl={imgUrl}
              defaultX={x}
              defaultY={y}
              defaultRotate={rotate}
              defaultScale={scale}
              onDelete={handleDeleteSticker}
              onUpdate={handleChangeSticker}
              onDragStart={hiddenStickerButton}
              onDragEnd={showStickerButton}
            />
          );
        }
      })}
      {isStickerButtonEnable && (
        <AddStickerButton onClick={handleClickStickerEditButton}>
          <StickerIcon src={stickerIcon} />
          <AddIcon src={addIcon} />
        </AddStickerButton>
      )}
    </Container>
  );
};

export default StickerList;

const Container = styled.div``;

const AddStickerButton = styled.div`
  position: fixed;
  bottom: 22px;
  left: 50%;

  display: flex;
  flex-direction: center;
  align-items: center;

  width: 53px;
  height: 53px;
  background: #fcfcfc;
  border-radius: 50%;
  box-shadow: 10px 10px 60px 0px #21212126;

  transform: translate(-50%, 0);

  z-index: 2;
`;

const StickerIcon = styled.img`
  position: absolute;
  top: 16px;
  left: 16px;

  width: 22px;
  height: 22px;

  user-select: none;
  pointer-events: none;
`;

const AddIcon = styled.img`
  position: absolute;
  top: 4px;
  left: 36px;

  width: 17px;
  height: 17px;

  user-select: none;
  pointer-events: none;
`;
