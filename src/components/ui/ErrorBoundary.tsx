'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorMessage, Button } from './';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary React pour capturer les erreurs
 * Note: Doit être une class component
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Logger l'erreur (dans un vrai projet, envoyer à un service de logging)
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  handleRefresh = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-md w-full">
            <ErrorMessage
              message="Une erreur est survenue"
              onRetry={this.handleReset}
            />
            <div className="flex flex-col gap-2 mt-4">
              <Button
                variant="primary"
                onClick={this.handleRefresh}
                className="w-full"
              >
                Rafraîchir la page
              </Button>
              <Button
                variant="outline"
                onClick={this.handleGoHome}
                className="w-full"
              >
                Retour à l'accueil
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
