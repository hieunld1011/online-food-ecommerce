'use client';

import { Fragment } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { Menu, Popover, Transition } from '@headlessui/react';
import { HiOutlineBell, HiOutlineSearch } from 'react-icons/hi';
import { PATH_HOME, PATH_PROFILE } from '@/app/routes/router.path';
import { signOut } from 'next-auth/react';
import { User } from '@prisma/client';

export default function DashboardHeader({ user }: { user: User }) {
  const navigate = useRouter().push;

  return (
    <div className='flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4'>
      <div className='relative'>
        <HiOutlineSearch
          fontSize={20}
          className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
        />
        <input
          type='text'
          placeholder='Search...'
          className='h-10 rounded-sm border border-gray-300 pl-11 pr-4 text-sm focus:outline-none active:outline-none lg:w-[24rem]'
        />
      </div>
      <div className='mr-2 flex items-center gap-2'>
        <Popover className='relative'>
          {({ open }) => (
            <>
              <Popover.Button
                className={clsx(
                  `active:bg-gray-100' group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none`,
                  open && 'bg-gray-100'
                )}
              >
                <HiOutlineBell fontSize={24} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-200'
                enterFrom='opacity-0 translate-y-1'
                enterTo='opacity-100 translate-y-0'
                leave='transition ease-in duration-150'
                leaveFrom='opacity-100 translate-y-0'
                leaveTo='opacity-0 translate-y-1'
              >
                <Popover.Panel className='absolute right-0 z-10 mt-2.5 w-80 transform'>
                  <div className='rounded-sm bg-white px-2 py-2.5 shadow-md ring-1 ring-black ring-opacity-5'>
                    <strong className='font-medium text-gray-700'>
                      Notifications
                    </strong>
                    <div className='mt-2 py-1 text-sm'>
                      This is notification panel.
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <Menu as='div' className='relative'>
          <div>
            <Menu.Button className='ml-2 flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400'>
              <span className='sr-only'>Open user menu</span>
              <div
                className='h-10 w-10 rounded-full bg-cover bg-center bg-no-repeat'
                style={{
                  backgroundImage: `url("${
                    user?.image || '/images/placeholder.jpg'
                  }")`,
                }}
              >
                <span className='sr-only'>{user?.name}</span>
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-sm bg-white p-1 shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => navigate(PATH_HOME)}
                    className={clsx(
                      active && 'bg-gray-100',
                      'cursor-pointer rounded-sm px-4 py-2 text-gray-700 focus:bg-gray-200 active:bg-gray-200'
                    )}
                  >
                    Home
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => navigate(PATH_PROFILE)}
                    className={clsx(
                      `cursor-pointer rounded-sm px-4 py-2 text-gray-700 focus:bg-gray-200 active:bg-gray-200`,
                      active && 'bg-gray-100'
                    )}
                  >
                    Profile
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={clsx(
                      `cursor-pointer rounded-sm px-4 py-2 text-gray-700 focus:bg-gray-200 active:bg-gray-200`,
                      active && 'bg-gray-100'
                    )}
                    onClick={() => signOut()}
                  >
                    Sign out
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
