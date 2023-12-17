'use client';

import { Input } from '@/app/components/Input/InputHookForm';
import handleAxiosError from '@/app/utils/axiosError';
import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

interface RegisterFormProps {
  toggleVariant: 'LOGIN' | 'REGISTER';
  setToggleVariant: Dispatch<SetStateAction<'LOGIN' | 'REGISTER'>>;
}

const RegisterForm = ({
  toggleVariant,
  setToggleVariant,
}: RegisterFormProps) => {
  const regExpEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  const regExpNumber = new RegExp(
    /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g
  );

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleToggleBtn = () => {
    if (toggleVariant === 'LOGIN') setToggleVariant('REGISTER');
    else setToggleVariant('LOGIN');
  };

  const onSubmitHandler: SubmitHandler<FieldValues> = (data) => {
    axios
      .post('/api/register', data)
      .then((res) => {
        if (res.status === 200) {
          setToggleVariant('LOGIN');
          toast.success('Register successful, login to continue!');
        }
      })
      .catch((err) => handleAxiosError(err));
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <h3 className='mb-2 text-4xl font-semibold'>Register Account</h3>
      <p className='mb-5 text-sm'>
        Please fill all the information to continue
      </p>
      <div className='relative mb-3 flex flex-col'>
        <label htmlFor='email' className='mb-2'>
          Email
        </label>
        <Input
          type='text'
          id='email'
          required
          pattern={new RegExp(regExpEmail)}
          placeholder='Email Address'
          register={register}
          errors={errors}
        />
      </div>
      <div className='relative mb-3 flex flex-col'>
        <label htmlFor='name' className='mb-2'>
          Username
        </label>
        <Input
          type='text'
          id='name'
          required
          placeholder='Username'
          register={register}
          errors={errors}
        />
      </div>
      <div className='relative mb-3 flex flex-col'>
        <label htmlFor='phone' className='mb-2'>
          Phone
        </label>
        <Input
          type='text'
          id='phone'
          required
          pattern={new RegExp(regExpNumber)}
          placeholder='Phone number'
          register={register}
          errors={errors}
        />
      </div>
      <div className='relative mb-3 flex flex-col'>
        <label htmlFor='password' className='mb-2'>
          Password
        </label>
        <Input
          type='password'
          id='password'
          required
          minLength={6}
          placeholder='Password'
          register={register}
          errors={errors}
        />
      </div>
      <button
        className='hover: mt-4 w-full rounded border-yellowColor bg-yellowBg 
        px-4 py-3 text-sm font-semibold text-white transition-all duration-300
        hover:border-[#ff8306] hover:bg-[#ff8306]'
        type='submit'
      >
        Register
      </button>
      <p className='mt-4 text-center'>
        Already have an account?
        <span
          className='ml-1 cursor-pointer text-yellowColor transition-all 
        duration-200 hover:text-linkColor hover:underline'
          onClick={handleToggleBtn}
        >
          Login
        </span>
      </p>
    </form>
  );
};

export default RegisterForm;
