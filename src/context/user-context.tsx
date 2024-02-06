import { createContext, useContext, useState, ReactNode } from 'react';
import { loginUser, IAuthResponse, IUser } from "../services/user-service";

interface IUserContext {
  user: IUser | null;
  login: (user: IUser) => Promise<void>;
  logout: () => void;
}

const defaultUserContextVal = undefined
const UserContext = createContext<IUserContext | undefined>(defaultUserContextVal);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const login = async (user: IUser) => {
    const response: IAuthResponse = await loginUser(user);
    console.log(response)
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    setUser(user); 
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
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
