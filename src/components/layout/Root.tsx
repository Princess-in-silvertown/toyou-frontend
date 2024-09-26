import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { NavBar } from './NavBar';

const Root = () => {
  return (
    <>
      {/* <Header /> */}
      <Outlet />
      {/* <Footer />
      <NavBar /> */}
    </>
  );
};

export default Root;
