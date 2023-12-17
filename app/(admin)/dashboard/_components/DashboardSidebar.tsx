'use client';

import Link from 'next/link';
import clsx from 'clsx';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import Logo from '../../../assets/home/logo.png';
import { dashboardLinks } from '@/app/constants/dashboard.constant';
import { PATH_HOME } from '@/app/routes/router.path';

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className='flex w-60 flex-col bg-neutral-900 p-3'>
      <div className='flex items-center gap-2 px-1 py-3'>
        <Link href={PATH_HOME}>
          <Image src={Logo} alt='Logo' priority={true} />
        </Link>
      </div>
      <div className='flex flex-1 flex-col gap-0.5 py-8'>
        {dashboardLinks.map((link) => (
          <Link
            href={link.path}
            className={clsx(
              `flex items-center gap-2 rounded-sm px-3 py-2 text-base font-light hover:bg-neutral-700 
          hover:no-underline active:bg-neutral-600`,
              pathname === link.path
                ? 'bg-neutral-700 text-white'
                : 'text-neutral-400'
            )}
            key={link.label}
          >
            {<link.icon size={20} />}
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
