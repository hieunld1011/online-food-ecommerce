'use client';

import { PATH_PROFILE } from '@/app/routes/router.path';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const EditProfilePage = ({ user }: { user: User }) => {
  const [oldPassword, setOldPassword] = useState<string>('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmitHandler: SubmitHandler<FieldValues> = (data) => {
    axios.post('/api/profile', {
      ...data,
      oldPassword: oldPassword,
    });
    router.push(PATH_PROFILE);
  };

  return (
    <div className='container mx-auto my-20 flex items-center justify-center'>
      <form
        className='w-1/2 px-12 py-10 shadow-[0_1rem_3rem_rgba(0,0,0,0.175)]'
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <h1 className='mb-12 mt-2 text-4xl font-semibold'>Update Profile</h1>
        <div className='mb-4 flex flex-col'>
          <label htmlFor='username' className='font-semibold'>
            Name
          </label>
          <input
            type='text'
            id='username'
            {...register('username', { required: true })}
            defaultValue={user.name || ''}
            className='rounded-md border px-3 py-2 outline-none'
          />
        </div>
        <div className='mb-4 flex flex-col'>
          <label htmlFor='email' className='font-semibold'>
            Email
          </label>
          <input
            type='email'
            id='email'
            {...register('email', { required: true })}
            defaultValue={user.email || ''}
            className='rounded-md border px-3 py-2 outline-none'
            readOnly
          />
        </div>
        <div className='mb-4 flex flex-col'>
          <label htmlFor='phone' className='font-semibold'>
            Phone Number
          </label>
          <input
            type='text'
            id='phone'
            {...register('phone', { required: true })}
            defaultValue={user.phone || ''}
            className='rounded-md border px-3 py-2 outline-none'
          />
        </div>
        <div className='mb-4 flex flex-col'>
          <label htmlFor='oldPassword' className='font-semibold'>
            Old Password
          </label>
          <input
            type='password'
            id='oldPassword'
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className='rounded-md border px-3 py-2 outline-none'
          />
        </div>
        <div className='mb-4 flex flex-col'>
          <label htmlFor='password' className='font-semibold'>
            New Password
          </label>
          <input
            type='password'
            id='password'
            {...register('password', { required: true })}
            defaultValue={''}
            className='rounded-md border px-3 py-2 outline-none'
          />
        </div>
        <button
          type='submit'
          className='mb-4 mt-6 w-full rounded-lg border border-yellowColor bg-yellowColor px-3 py-2 text-lg text-white
          transition-all duration-300 hover:opacity-70'
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditProfilePage;
