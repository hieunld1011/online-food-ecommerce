'use client';

import { useState } from 'react';
import AuthForm from './AuthForm';
import RegisterForm from './RegisterForm';

type VARIANT = 'LOGIN' | 'REGISTER';

const LoginForm = () => {
  const [toggleVariant, setToggleVariant] = useState<VARIANT>('LOGIN');

  return (
    <div className='flex h-full flex-col md:flex-row'>
      <div className='hidden w-1/3 md:block lg:h-[calc(100vh_-_100px)]'>
        <div className='h-full w-full bg-[url("/images/login.jpg")] bg-cover bg-center bg-no-repeat' />
      </div>
      <div className='flex-1 bg-gray-100 lg:w-2/3'>
        <div className='flex h-full items-center justify-center px-4 py-12'>
          {toggleVariant === 'LOGIN' ? (
            <AuthForm
              toggleVariant={toggleVariant}
              setToggleVariant={setToggleVariant}
            />
          ) : (
            <RegisterForm
              toggleVariant={toggleVariant}
              setToggleVariant={setToggleVariant}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
