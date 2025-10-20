"use client";

import { AlertCircle } from "lucide-react";
import { Component, ReactNode } from "react";

import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Универсальный Error Boundary компонент
 * Используется для изоляции ошибок в компонентах
 * Поддерживает кастомный fallback UI и обработчик ошибок
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
            <div className="flex-1 space-y-3">
              <h3 className="font-semibold text-destructive">
                Ошибка при отображении компонента
              </h3>
              <p className="text-sm text-muted-foreground">
                {this.state.error?.message || "Произошла непредвиденная ошибка"}
              </p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => this.setState({ hasError: false })}
              >
                Попробовать снова
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
