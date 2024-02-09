import { createContext, useContext, useState, ReactNode } from 'react';
import { loginUser, IUser, googleSignin } from "../services/user-service";
import { CredentialResponse } from '@react-oauth/google';

interface IUserContext {
  user: IUser | null;
  login: (user: IUser) => Promise<void>;
  logout: () => void;
  signinViaGoogle: (credentialResponse: CredentialResponse) => Promise<void>;
}

const defaultUserContextVal = undefined
const UserContext = createContext<IUserContext | undefined>(defaultUserContextVal);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const login = async (user: IUser) => {
    const response: IUser = await loginUser(user);
    console.log("login via app - " , response)
    localStorage.setItem('accessToken', response.accessToken!);
    localStorage.setItem('refreshToken', response.refreshToken!);
    setUser(response); 
  };

  const signinViaGoogle = async (credentialResponse: CredentialResponse) => {
    const response: IUser = await googleSignin(credentialResponse);
    console.log("login via google - " , response)
    localStorage.setItem('accessToken', response.accessToken!);
    localStorage.setItem('refreshToken', response.refreshToken!);
    setUser(response); 
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, signinViaGoogle}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
