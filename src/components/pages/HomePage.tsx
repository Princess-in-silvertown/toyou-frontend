import { MessageFormProvider } from '@/contexts/providers/MessageFormProvider';
import { modalDispatchContext } from '@/contexts/states/modalContext';
import FullContainer from '@components/common/Modal/FullContainer';
import CardSelect from '@components/specific/CardSelect/CardSelect';
import WritingPaperModal from '@components/specific/WritingPaperModal/WritingPaperModal';
import { KEYS } from '@constants/modal';
import { useViewport } from '@hooks/useViewport';
import { useContext, useState } from 'react';
import styled from 'styled-components';

const HomePage = () => {
  const { handleOpen, handleClose } = useContext(modalDispatchContext);

  const [isCardSelected, setIsCardSelected] = useState(false);
  const [isDraggable, setIsDraggable] = useState(true);

  const handleSelectCard = (themeId: number) => {
    if (!isDraggable) return;

    setIsDraggable(true);
    setIsCardSelected(true);

    setTimeout(() => {
      handleClickWritingButton(themeId);
    }, 200);
  };

  const handleCloseModal = () => {
    handleClose();
    setIsCardSelected(false);

    setTimeout(() => {
      setIsDraggable(true);
    }, 1000);
  };

  const handleClickWritingButton = (themeId: number) => {
    handleOpen(
      KEYS.WRITE_MESSAGE,
      <MessageFormProvider themeId={themeId}>
        <WritingPaperModal closeModal={handleCloseModal} />,
      </MessageFormProvider>,
      FullContainer
    );
  };

  const [, viewHeight] = useViewport();
  const marginTop = Math.max((viewHeight - 800) / 2, 0);

  return (
    <Container style={{ marginTop }}>
      <CardSelect
        isSelected={isCardSelected}
        onSelected={handleSelectCard}
        canDrag={isDraggable}
      />
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
`;
