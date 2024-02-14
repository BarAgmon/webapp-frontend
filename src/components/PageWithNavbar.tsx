import { ReactNode } from 'react';
import Navbar from './MainNavbar';

const PageWithNavbar = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
export default PageWithNavbar;
