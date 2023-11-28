'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BsList } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';

import MobileHeaderLists from './MobileHeaderLists';
import { PATH_HOME, PATH_LOGIN } from '@/app/routes/router.path';
import { headerLinks } from '../../constants/header.constants';
import { User } from '@prisma/client';
import DropdownUser from './DropdownUser';
import { FaUser } from 'react-icons/fa';
import clsx from 'clsx';

const MobileHeader = ({ user }: { user: User }) => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [isNavFixed, setIsNavFixed] = useState<boolean>(false);

  const fixedNav = () => {
    let scrollTop = window.scrollY;
    if (scrollTop > 200) {
      setIsNavFixed(true);
    } else {
      setIsNavFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', fixedNav);

    return () => {
      window.removeEventListener('scroll', fixedNav);
    };
  }, []);

  return (
    <div
      className={clsx(
        `shadow-[0 2px 5px -2px rgba(0, 0, 0, 0.1)] z-30 w-full bg-yellowColor transition-all duration-500`,
        isNavFixed ? 'fixed' : 'relative'
      )}
    >
      <div className='container mx-auto px-4 lg:hidden'>
        <div className='flex items-center justify-between'>
          <Link
            href={PATH_HOME}
            className='text-2xl font-semibold text-white transition-all duration-300 hover:opacity-60'
          >
            Dreamhub
          </Link>
          <div className='flex items-center'>
            {user ? (
              <DropdownUser user={user!} />
            ) : (
              <Link href={PATH_LOGIN} className='px-2 text-white'>
                <FaUser size={24} />
              </Link>
            )}
            <button
              className='p-3 font-bold text-white transition-all duration-300 hover:opacity-60'
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              {isNavOpen ? <MdClose size={40} /> : <BsList size={40} />}
            </button>
          </div>
        </div>
      </div>
      {isNavOpen && (
        <nav className='w-full bg-white shadow-xl'>
          <div className='animate-slideIn'>
            {headerLinks.map((link) => (
              <MobileHeaderLists
                key={link.label}
                label={link.label}
                href={link.href}
              />
            ))}
          </div>
        </nav>
      )}
    </div>
  );
};

export default MobileHeader;
