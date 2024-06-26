import { AxiosError } from "axios";
import React from "react";
import NotFoundPage from "@pages/NotFoundPage";

interface Props {
  children: React.ReactNode;
  onReset: () => void;
}

interface State {
  hasError: boolean;
  error: Error | AxiosError | null;
}

class GlobalErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };

    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
  }

  resetErrorBoundary() {
    this.props.onReset();

    this.setState({ hasError: false, error: null });
  }

  static getDerivedStateFromError(error: Error | AxiosError) {
    return { hasError: true, error: error };
  }

  render() {
    const { hasError, error } = this.state;

    return hasError ? (
      <NotFoundPage reset={this.resetErrorBoundary} error={error} />
    ) : (
      this.props.children
    );
  }
}

export default GlobalErrorBoundary;
