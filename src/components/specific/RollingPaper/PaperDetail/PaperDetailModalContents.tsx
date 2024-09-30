import styled from 'styled-components';
import PaperListDetail from './PaperListDetail';
import back from '@assets/icons/back.svg';
import { KEYS } from '@constants/modal';
import NavBarList from './NavBarList';

interface Props {
  clickedItemIndex: number;
  closeModal: (key?: string, time?: number) => void;
  goToHomePage: () => void;
  goToCalenderPage: () => void;
}

const PaperDetailModalContents = ({
  clickedItemIndex,
  closeModal,
  goToCalenderPage,
  goToHomePage,
}: Props) => {
  const handleClickBackButton = () => {
    closeModal(KEYS.PAPER_DETAIL, 0);
  };

  return (
    <>
      <Container>
        <PaperListDetail index={clickedItemIndex} />
        <BackButton alt="뒤로가기" src={back} onClick={handleClickBackButton} />
      </Container>
      <NavBarList
        closeModal={closeModal}
        goToHomePage={goToHomePage}
        goToCalenderPage={goToCalenderPage}
      />
    </>
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
