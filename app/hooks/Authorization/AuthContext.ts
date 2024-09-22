import {UserCredential} from 'firebase/auth';
import {createContext} from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserCredential | null;
  login: (user: UserCredential) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
