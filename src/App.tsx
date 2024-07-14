import { RouterProvider } from 'react-router-dom';
import { router } from './routers';
import { AppProvider } from './contexts/providers/AppProvider';
import GlobalStyle from './style/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import theme from './style/theme';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <AppProvider>
          <RouterProvider router={router} />
        </AppProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
