import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { signOut } from 'next-auth/react';
import { User } from '@prisma/client';
import {
  PATH_DASHBOARD_PRODUCTS,
  PATH_PROFILE,
} from '@/app/routes/router.path';
import Image from 'next/image';

const DropdownUser = ({ user }: { user: User }) => {
  return (
    <Menu as={'div'}>
      <div className='cursor-pointer' aria-expanded='true' aria-haspopup='true'>
        <Menu.Button className={'flex items-center'}>
          <Image
            src={user.image || '/images/placeholder.jpg'}
            alt={user.name!}
            className='h-[30px] w-[30px] rounded-full'
            width={30}
            height={30}
          />
        </Menu.Button>
      </div>
      <Transition
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className=' flex flex-col py-1'>
            {user.role === 'admin' && (
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={PATH_DASHBOARD_PRODUCTS}
                    className={`${
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    } block px-4 py-2 text-left`}
                  >
                    Dashboard
                  </Link>
                )}
              </Menu.Item>
            )}
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={PATH_PROFILE}
                  className={`${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } block px-4 py-2 text-left`}
                >
                  Profile
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  type='submit'
                  className={`${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } block px-4 py-2 text-left`}
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropdownUser;
