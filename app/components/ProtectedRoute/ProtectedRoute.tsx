import React, {useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {useAuth} from '~/hooks/Authorization/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
  const {isLoggedIn} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const authRoutes = ['/sign-in', '/sign-up'];

    if (isLoggedIn && authRoutes.includes(location.pathname)) {
      navigate('/');
    } else if (!isLoggedIn && !authRoutes.includes(location.pathname)) {
      navigate('/sign-in');
    }
  }, [isLoggedIn, navigate, location]);

  if (!isLoggedIn && !['/sign-in', '/sign-up'].includes(location.pathname)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
