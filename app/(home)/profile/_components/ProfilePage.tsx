import { PATH_CART, PATH_PROFILE_EDIT } from '@/app/routes/router.path';
import { User } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

const Profile = ({ user }: { user: User }) => {
  return (
    <div className='mx-auto max-w-screen-md md:max-w-screen-lg'>
      <h2 className='ml-12 mt-6 text-4xl font-semibold'>My Profile</h2>
      <div className='mx-3 my-9 flex flex-col justify-around md:-mx-3 md:flex-row'>
        <div className='md:w-3/12'>
          <figure className='avatar avatar-profile'>
            <Image
              className='img-fluid rounded-full'
              src={user?.image || '/images/placeholder.jpg'}
              alt={user?.name || 'Undefined Name'}
              width={256}
              height={256}
            />
          </figure>
          <Link
            href={PATH_PROFILE_EDIT}
            className='my-12 block rounded-lg border-yellowColor bg-yellowColor px-10 py-2 text-center text-white transition-all duration-300 hover:opacity-70'
          >
            Edit Profile
          </Link>
        </div>

        <div className='md:w-5/12'>
          <h3 className='mt-7 text-2xl font-bold text-gray-400'>Full Name</h3>
          <p>{user?.name || ''}</p>

          <h3 className='mt-7 text-2xl font-bold text-gray-400'>
            Email Address
          </h3>
          <p>{user?.email || ''}</p>

          <h3 className='mt-7 text-2xl font-bold text-gray-400'>
            Phone Number
          </h3>
          <p>{user?.phone || ''}</p>

          <h3 className='mt-7 text-2xl font-bold text-gray-400'>Role</h3>
          <p>{user?.role || ''}</p>

          <h3 className='mt-7 text-2xl font-bold text-gray-400'>Joined On</h3>
          <p>{String(user?.created_at.toUTCString() || '').substring(0, 16)}</p>

          <Link
            href={PATH_CART}
            className='mt-10 block rounded-lg bg-[#0d6efd] px-10 py-2 text-center text-white transition-all duration-300 hover:opacity-70'
          >
            My Current Orders
          </Link>

          {/* <Link href='#' className="block mt-3">
                                Change Password
                            </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
