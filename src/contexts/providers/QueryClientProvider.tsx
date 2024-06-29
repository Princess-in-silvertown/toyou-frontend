import {
  QueryClient,
  QueryClientProvider as Provider,
} from '@tanstack/react-query';

interface Props extends React.PropsWithChildren {}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 1,
    },
    mutations: {
      retry: 1,
    },
  },
});

export const QueryClientProvider = ({ children }: Props) => {
  return <Provider client={queryClient}>{children}</Provider>;
};
