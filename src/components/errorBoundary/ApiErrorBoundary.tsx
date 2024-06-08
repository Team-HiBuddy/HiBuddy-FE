import { Button } from "@mui/material";
import { AxiosError } from "axios";
import React from "react";

interface Props {
  children: React.ReactNode;
  onReset: () => void;
}

interface State {
  hasError: boolean;
  error: Error | AxiosError | null;
}

class ApiErrorBoundary extends React.Component<Props, State> {
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
    const { hasError } = this.state;

    return hasError ? (
      <section className="flex flex-col items-center gap-y-4 p-2 border rounded border">
        <h2 className="text-lg font-bold">Please try again later.</h2>
        <p>Failed to process your request.</p>
        <Button variant="contained" onClick={this.resetErrorBoundary}>
          Retry
        </Button>
      </section>
    ) : (
      this.props.children
    );
  }
}

export default ApiErrorBoundary;
