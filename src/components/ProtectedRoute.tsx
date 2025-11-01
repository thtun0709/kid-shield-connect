import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const kidToken = localStorage.getItem('kidToken');

  if (!kidToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
