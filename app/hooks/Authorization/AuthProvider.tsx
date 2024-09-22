import {useEffect, useState} from 'react';
import {AuthContext} from './AuthContext';
import {UserCredential} from 'firebase/auth';
import {useNavigate} from '@remix-run/react';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserCredential | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.user.stsTokenManager.expirationTime <= Date.now()) {
        navigate('/');
        logout();
      } else {
        setUser(parsedUser);
        setIsLoggedIn(true);
      }
    }
  }, []);

  const login = (userCredential: UserCredential) => {
    localStorage.setItem('user', JSON.stringify(userCredential));
    setUser(userCredential);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
  };

  return <AuthContext.Provider value={{isLoggedIn, user, login, logout}}>{children}</AuthContext.Provider>;
};
