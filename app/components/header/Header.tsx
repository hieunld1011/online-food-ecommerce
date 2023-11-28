import React, { useEffect } from 'react';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';
import { User } from '@prisma/client';

interface HeaderProps {
  children: React.ReactNode;
  user: User;
}

const Header = ({ user, children }: HeaderProps) => {
  return (
    <div className='min-h-screen'>
      <DesktopHeader user={user!} />
      <MobileHeader user={user!} />
      <main className='-z-10'>{children}</main>
    </div>
  );
};

export default Header;
