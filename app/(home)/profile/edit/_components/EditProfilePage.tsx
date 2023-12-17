'use client';

import { PATH_PROFILE } from '@/app/routes/router.path';
import handleAxiosError from '@/app/utils/axiosError';
import { User } from '@prisma/client';
import axios from 'axios';
import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const EditProfilePage = ({ user }: { user: User }) => {
  const [oldPassword, setOldPassword] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>(
    user?.image || '/images/placeholder.jpg'
  );
  const regExpNumber = new RegExp(
    /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g
  );
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmitHandler: SubmitHandler<FieldValues> = (data) => {
    axios
      .post('/api/profile', {
        ...data,
        oldPassword: oldPassword,
      })
      .then((res) => {
        if (res.status === 200) {
          router.push(PATH_PROFILE);
          toast.success(res.data?.msg || 'Profile updated successfully');
        }
      })
      .catch((err) => handleAxiosError(err));
  };

  return (
    <div className='container mx-auto my-6 flex items-center justify-center'>
      <form
        className='w-1/2 px-12 py-10 shadow-[0_1rem_3rem_rgba(0,0,0,0.175)]'
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <h1 className='mb-12 mt-2 text-4xl font-semibold'>Update Profile</h1>
        <div className='mb-6 flex flex-col'>
          <label htmlFor='username' className='font-semibold'>
            Name
          </label>
          <input
            type='text'
            id='username'
            {...register('username', { required: true })}
            defaultValue={user?.name || ''}
            className='rounded-md border px-3 py-2 outline-none'
          />
        </div>
        <div className='mb-6 flex flex-col'>
          <label htmlFor='email' className='font-semibold'>
            Email
          </label>
          <input
            type='email'
            id='email'
            {...register('email', { required: true })}
            defaultValue={user?.email || ''}
            className='rounded-md border px-3 py-2 outline-none'
            readOnly
          />
        </div>
        <div className='mb-6 flex flex-col'>
          <label htmlFor='phone' className='font-semibold'>
            Phone Number
          </label>
          <input
            type='text'
            id='phone'
            {...register('phone', {
              pattern: {
                value: regExpNumber,
                message: 'You have to put correct phone number',
              },
              minLength: {
                value: 9,
                message: 'Phone must be greater than 9 characters',
              },
              maxLength: {
                value: 11,
                message: 'Phone must be less than 11 characters',
              },
            })}
            defaultValue={user?.phone || ''}
            className='rounded-md border px-3 py-2 outline-none'
          />
          <span className='text-xs text-redColor'>
            {errors['phone']?.message as string}
          </span>
        </div>
        <div className='mb-6 flex flex-col'>
          <label className='mb-1 font-semibold'>Image</label>
          <CldUploadButton
            options={{ maxFiles: 1, folder: '/food_ecommerce' }}
            onUpload={(result: any) => {
              setValue('image', result?.info?.secure_url);
              setImageUrl(result?.info?.secure_url);
            }}
            {...register('image')}
            uploadPreset='foodEcommerce'
            className='w-fit'
          >
            <Image
              src={imageUrl || '/images/placeholder.jpg'}
              className='rounded-full'
              alt='image'
              height={70}
              width={70}
            />
          </CldUploadButton>
        </div>
        <div className='mb-6 flex flex-col'>
          <label htmlFor='oldPassword' className='font-semibold'>
            Old Password
          </label>
          <input
            type='password'
            id='oldPassword'
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className='rounded-md border px-3 py-2 outline-none'
            required
          />
        </div>
        <div className='mb-6 flex flex-col'>
          <label htmlFor='password' className='font-semibold'>
            New Password
          </label>
          <input
            type='password'
            id='password'
            {...register('password', {
              required: {
                value: true,
                message: 'Password is required',
              },
              minLength: {
                value: 6,
                message: 'Password must be at least 6 character',
              },
            })}
            defaultValue={''}
            className='rounded-md border px-3 py-2 outline-none'
            required
          />
          <span className='text-xs text-redColor'>
            {errors['password']?.message as string}
          </span>
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
