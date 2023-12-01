'use client';

import { PATH_HOME } from '@/app/routes/router.path';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const ContactForm = () => {
  const regExpEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmitHandler: SubmitHandler<FieldValues> = async (data) => {
    try {
      await axios.post('https://formsubmit.co/hieuproxd123456@gmail.com', data);
      setValue('email', '');
      setValue('name', '');
      setValue('phone', '');
      setValue('message', '');
      setValue('website', '');
      toast.success('The form has been submitted!');
      router.push(PATH_HOME);
    } catch (error) {
      toast.error('Error: ' + error);
    }
  };

  return (
    <div className='bg-[#faf7f2] py-24'>
      <div className='container mx-auto'>
        <div className='flex flex-col rounded-[20px] bg-white px-14 py-10 shadow-[8px_9px_35px_0px_rgb(145_145_145_/_24%)]'>
          <h3 className='mb-10 text-center text-4xl font-bold'>Get In Touch</h3>
          <form onSubmit={handleSubmit(onSubmitHandler)} method='POST'>
            <div className='flex flex-col gap-y-6'>
              <div className='flex flex-col gap-x-4 gap-y-8 md:flex-row'>
                <div className='flex-1'>
                  <input
                    type='text'
                    placeholder='Your Name'
                    className='h-14 w-full rounded-3xl bg-[#f0f1f2] px-6 outline-none'
                    required
                    {...register('name')}
                  />
                </div>
                <div className='relative flex-1'>
                  <input
                    type='email'
                    placeholder='Your Email'
                    className='h-14 w-full rounded-3xl bg-[#f0f1f2] px-6 outline-none'
                    required
                    {...register('email', {
                      pattern: {
                        value: regExpEmail,
                        message: 'Email need to be correct',
                      },
                    })}
                  />
                  <span className='absolute bottom-0 left-6 mt-1 text-xs text-invalidColor'>
                    {errors['email']?.message as string}
                  </span>
                </div>
              </div>
              <div className='flex flex-col gap-x-4 gap-y-8 md:flex-row'>
                <div className='flex-1'>
                  <input
                    type='text'
                    placeholder='Phone Number'
                    className='h-14 w-full rounded-3xl bg-[#f0f1f2] px-6 py-2 outline-none'
                    required
                    {...register('phone')}
                  />
                </div>
                <div className='flex-1'>
                  <input
                    type='text'
                    placeholder='Website'
                    className='h-14 w-full rounded-3xl bg-[#f0f1f2] px-6 outline-none'
                    required
                    {...register('website')}
                  />
                </div>
              </div>
              <div className='w-full'>
                <textarea
                  placeholder='Your Message'
                  className='h-36 w-full rounded-3xl bg-[#f0f1f2] px-6 py-4 outline-none'
                  required
                  {...register('message')}
                />
              </div>
            </div>
            <div className='mt-6 text-center'>
              <button
                className='rounded-3xl border border-yellowColor bg-yellowColor px-9 py-4 uppercase text-black
                transition-all duration-500 hover:bg-transparent hover:text-yellowColor'
                type='submit'
              >
                Submit Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
