'use client';

import { Dispatch, SetStateAction } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

import { Input } from '@/app/components/Input/InputHookForm';
import AuthSocialButton from './AuthSocialButton';
import { PATH_HOME } from '@/app/routes/router.path';

interface AuthFormProps {
  toggleVariant: 'LOGIN' | 'REGISTER';
  setToggleVariant: Dispatch<SetStateAction<'LOGIN' | 'REGISTER'>>;
}

const AuthForm = ({ toggleVariant, setToggleVariant }: AuthFormProps) => {
  const regExpEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  const router = useRouter();

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
    try {
      signIn('credentials', {
        ...data,
        redirect: false,
      }).then((callback) => {
        if (callback?.error) {
          toast.error('Invalid Credentials! Please try again.');
        }

        if (callback?.ok && !callback.error) {
          router.refresh();
          toast.success('Logged In!');
          router.push(PATH_HOME);
        }
      });
    } catch (error) {
      toast.error('Login: ' + error);
    }
  };

  const socialAction = (action: string) => {
    signIn(action, { redirect: false }).then((callback) => {
      if (callback?.error) {
        toast.error('Invalid Credentials');
      }

      if (callback?.ok && !callback?.error) {
        toast.success('Logged in!');
        router.push('/');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <h3 className='mb-2 text-4xl font-semibold'>Login to Account</h3>
      <p className='mb-5 text-sm'>Login using social account</p>
      <div className='mt-6 flex gap-2'>
        <AuthSocialButton
          icon={BsGithub}
          onClick={() => socialAction('github')}
        />
        <AuthSocialButton
          icon={BsGoogle}
          onClick={() => socialAction('google')}
        />
      </div>
      <div className='my-6'>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300' />
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='text-gray-5000 bg-gray-100 px-2'>
              Or continue with
            </span>
          </div>
        </div>
      </div>
      <p className='mb-5 text-sm'>Login with website account</p>
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
        Sign In
      </button>
      <p className='mt-4 text-center'>
        Don&#39;t have an account?
        <span
          className='ml-1 cursor-pointer text-yellowColor transition-all 
        duration-200 hover:text-linkColor hover:underline'
          onClick={handleToggleBtn}
        >
          Create Account
        </span>
      </p>
    </form>
  );
};

export default AuthForm;
