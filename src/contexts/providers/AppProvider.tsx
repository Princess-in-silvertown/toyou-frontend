import ModalProvider from './ModalContextProvider';
import { QueryClientProvider } from './QueryClientProvider';

interface Props extends React.PropsWithChildren {}

export const AppProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider>
      <ModalProvider>{children}</ModalProvider>
    </QueryClientProvider>
  );
};
