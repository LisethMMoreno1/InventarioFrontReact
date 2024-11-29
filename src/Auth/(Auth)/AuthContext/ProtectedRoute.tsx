import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuth();

  // Si el usuario no está autenticado, redirige a la página de inicio de sesión

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  // Si el usuario está autenticado, renderiza el elemento pasado como propiedad

  return element;
};

export default ProtectedRoute;
