import styled from 'styled-components';
import PaperListDetail from './PaperListDetail';
import back from '@assets/icons/back_white.svg';
import { KEYS } from '@constants/modal';

interface Props {
  clickedItemIndex: number;
  closeModal: (key?: string, time?: number) => void;
}

const PaperDetailModalContents = ({ clickedItemIndex, closeModal }: Props) => {
  const handleClickBackButton = () => {
    closeModal(KEYS.PAPER_DETAIL, 0);
  };

  return (
    <Container>
      <PaperListDetail index={clickedItemIndex} />
      <BackButton
        alt="back-button"
        src={back}
        onClick={handleClickBackButton}
      />
    </Container>
  );
};

export default PaperDetailModalContents;

const Container = styled.div`
  position: relative;

  width: 100%;
`;

const BackButton = styled.img`
  position: absolute;

  top: 20px;
  left: 25px;

  cursor: pointer;
`;
