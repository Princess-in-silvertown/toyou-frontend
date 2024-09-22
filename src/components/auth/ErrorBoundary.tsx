import ResponseError from '@apis/responseError';
import React, { ComponentType, createElement, PropsWithChildren } from 'react';
import { isErrored } from 'stream';

interface Props extends PropsWithChildren {
  fallback: ComponentType<FallbackProps>;
  onReset: () => void;
}

interface FallbackProps {
  error: Error | ResponseError | null;
  resetErrorBoundary: () => void;
}

interface State {
  error: Error | ResponseError | null;
  isError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      error: null,
      isError: false,
    };

    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
  }

  resetErrorBoundary() {
    this.props.onReset();

    this.state = {
      isError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: ResponseError) {
    return {
      error,
      isError: true,
    };
  }

  render() {
    const { error, isError } = this.state;
    const { children, fallback } = this.props;

    const fallbackElement = createElement(fallback, {
      error,
      resetErrorBoundary: this.resetErrorBoundary,
    });

    if (isError) {
      return fallbackElement;
    }

    return children;
  }
}

export default ErrorBoundary;
