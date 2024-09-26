import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { PropsWithChildren, useEffect } from 'react';
import { useCustomNavigate } from '@/routers/useCustomNavigate';
import ErrorBoundary from './ErrorBoundary';
import ResponseError from '@apis/responseError';

interface Props extends PropsWithChildren {}

const WithAuth = ({ children }: Props) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} fallback={AuthErrorFallback}>
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default WithAuth;

interface FallbackProps {
  error: Error | ResponseError | null;
  resetErrorBoundary: () => void;
}

const AuthErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { goToLoginPage } = useCustomNavigate();

  useEffect(() => {
    resetErrorBoundary();

    goToLoginPage();
  }, []);

  return <></>;
};
