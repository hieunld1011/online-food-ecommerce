'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { IoCart } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';

import Logo from '@/app/assets/home/logo.png';
import { PATH_HOME, PATH_LOGIN } from '@/app/routes/router.path';
import { headerLinks } from '@/app/constants/header.constants';
import { User } from '@prisma/client';
import clsx from 'clsx';

import { useAppSelector } from '@/app/stores/store';
import { totalCartItemSelector } from '@/app/stores/cartSlices';
import Sidebar from './Sidebar';
import DropdownUser from './DropdownUser';
import { useSidebarContext } from '@/app/context/BarContext';

const DesktopHeader = ({ user }: { user: User }) => {
  const [isNavFixed, setIsNavFixed] = useState<boolean>(false);
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext();
  const quantity = useAppSelector((state) => totalCartItemSelector(state));

  const pathname = usePathname();

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
        `shadow-[0 2px 5px -2px rgba(0, 0, 0, 0.1)] z-30 w-full bg-headerBg transition-all duration-500`,
        isNavFixed ? 'fixed' : 'relative'
      )}
    >
      <div className='container mx-auto hidden px-4 lg:block'>
        <div className='-mx-4 flex items-center'>
          <div className='flex-[0_0_25%] px-4'>
            <Link href={PATH_HOME}>
              <Image src={Logo} alt='logo' priority={true} />
            </Link>
          </div>
          <div className='flex flex-[0_0_75%] items-center px-4 text-right'>
            <div className='mr-7 flex'>
              {headerLinks.map((link) => (
                <div className='ml-8 py-9' key={link.label}>
                  <Link
                    href={link.href}
                    className={clsx(
                      `uppercasetransition-all py-9 text-sm font-medium duration-500 hover:text-yellowColor lg:text-xl`,
                      pathname === link.href ? 'text-yellowColor' : 'text-white'
                    )}
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
            <div className='flex flex-1 items-center justify-center'>
              <div className='ml-6 px-2'>
                <span
                  className='relative cursor-pointer px-2 text-white'
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  <IoCart size={24} />
                  <span
                    className='absolute -right-2 top-[10px] flex h-[20px] w-[20px]
                  items-center justify-center rounded-full bg-yellowColor text-[10px] text-black'
                  >
                    {quantity}
                  </span>
                </span>
              </div>
              <div className='ml-6 px-2'>
                {user ? (
                  <DropdownUser user={user!} />
                ) : (
                  <Link href={PATH_LOGIN} className='px-2 text-white'>
                    <FaUser size={24} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <Sidebar />
      </div>
    </div>
  );
};

export default DesktopHeader;
